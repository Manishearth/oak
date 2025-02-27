//
// Copyright 2022 The Project Oak Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

use crate::proto::oak::functions::oak_functions_server::{OakFunctions, OakFunctionsServer};
use anyhow::Context;
use oak_crypto::encryptor::AsyncRecipientContextGenerator;
use oak_functions_service::{
    instance::OakFunctionsInstance,
    proto::oak::functions::{
        AbortNextLookupDataResponse, Empty, ExtendNextLookupDataRequest,
        ExtendNextLookupDataResponse, FinishNextLookupDataRequest, FinishNextLookupDataResponse,
        InitializeRequest, InitializeResponse, InvokeRequest, InvokeResponse, LookupDataChunk,
        ReserveRequest, ReserveResponse,
    },
    Observer,
};
use oak_remote_attestation::handler::AsyncEncryptionHandler;
use opentelemetry_api::{
    metrics::{Histogram, Meter, MeterProvider, Unit},
    KeyValue,
};
use prost::Message;
use std::{
    future::Future,
    pin::Pin,
    sync::{Arc, OnceLock},
    time::Instant,
};
use tokio::net::TcpListener;
use tokio_stream::{wrappers::TcpListenerStream, StreamExt};
use tracing::Span;

pub mod proto {
    pub mod oak {
        pub mod functions {
            #![allow(clippy::return_self_not_must_use)]
            tonic::include_proto!("oak.functions");
        }
        pub mod containers {
            #![allow(clippy::return_self_not_must_use)]
            tonic::include_proto!("oak.containers");
        }
        pub use oak_crypto::proto::oak::crypto;
        pub use oak_remote_attestation::proto::oak::{attestation, session};
    }
}

pub mod orchestrator_client;

// Instance of the OakFunctions service for Oak Containers.
pub struct OakFunctionsContainersService<G: AsyncRecipientContextGenerator + Send + Sync> {
    instance: OnceLock<OakFunctionsInstance>,
    encryption_context: Arc<G>,
    observer: Option<Arc<dyn Observer + Send + Sync>>,
}

impl<G: AsyncRecipientContextGenerator + Send + Sync> OakFunctionsContainersService<G> {
    pub fn new(
        encryption_context: Arc<G>,
        observer: Option<Arc<dyn Observer + Send + Sync>>,
    ) -> Self {
        Self {
            instance: OnceLock::new(),
            encryption_context,
            observer,
        }
    }

    fn get_instance(&self) -> tonic::Result<&OakFunctionsInstance> {
        self.instance
            .get()
            .ok_or_else(|| tonic::Status::failed_precondition("not initialized"))
    }
}

fn map_status(status: micro_rpc::Status) -> tonic::Status {
    let code = match status.code {
        micro_rpc::StatusCode::Ok => tonic::Code::Ok,
        micro_rpc::StatusCode::Cancelled => tonic::Code::Cancelled,
        micro_rpc::StatusCode::Unknown => tonic::Code::Unknown,
        micro_rpc::StatusCode::InvalidArgument => tonic::Code::InvalidArgument,
        micro_rpc::StatusCode::DeadlineExceeded => tonic::Code::DeadlineExceeded,
        micro_rpc::StatusCode::NotFound => tonic::Code::NotFound,
        micro_rpc::StatusCode::AlreadyExists => tonic::Code::AlreadyExists,
        micro_rpc::StatusCode::PermissionDenied => tonic::Code::PermissionDenied,
        micro_rpc::StatusCode::ResourceExhausted => tonic::Code::ResourceExhausted,
        micro_rpc::StatusCode::FailedPrecondition => tonic::Code::FailedPrecondition,
        micro_rpc::StatusCode::Aborted => tonic::Code::Aborted,
        micro_rpc::StatusCode::OutOfRange => tonic::Code::OutOfRange,
        micro_rpc::StatusCode::Unimplemented => tonic::Code::Unimplemented,
        micro_rpc::StatusCode::Internal => tonic::Code::Internal,
        micro_rpc::StatusCode::Unavailable => tonic::Code::Unavailable,
        micro_rpc::StatusCode::DataLoss => tonic::Code::DataLoss,
        micro_rpc::StatusCode::Unauthenticated => tonic::Code::Unauthenticated,
    };
    tonic::Status::new(code, status.message)
}

#[tonic::async_trait]
impl<G: AsyncRecipientContextGenerator + Send + Sync + 'static> OakFunctions
    for OakFunctionsContainersService<G>
{
    async fn initialize(
        &self,
        request: tonic::Request<InitializeRequest>,
    ) -> tonic::Result<tonic::Response<InitializeResponse>> {
        let request = request.into_inner();
        match self.instance.get() {
            Some(_) => Err(tonic::Status::failed_precondition("already initialized")),
            None => {
                let instance = OakFunctionsInstance::new(&request, self.observer.clone())
                    .map_err(map_status)?;
                if self.instance.set(instance).is_err() {
                    return Err(tonic::Status::failed_precondition("already initialized"));
                }
                Ok(tonic::Response::new(InitializeResponse::default()))
            }
        }
    }

    async fn handle_user_request(
        &self,
        request: tonic::Request<InvokeRequest>,
    ) -> tonic::Result<tonic::Response<InvokeResponse>> {
        let encryption_key_provider = self.encryption_context.clone();
        let instance = self.get_instance()?;

        let encrypted_request = request.into_inner().encrypted_request.ok_or_else(|| {
            tonic::Status::invalid_argument(
                "InvokeRequest doesn't contain an encrypted request".to_string(),
            )
        })?;

        AsyncEncryptionHandler::create(encryption_key_provider, |r| async {
            // Wrap the invocation result (which may be an Error) into a micro RPC Response
            // wrapper protobuf, and encode that as bytes.
            let response_result: Result<Vec<u8>, micro_rpc::Status> =
                instance.handle_user_request(r);
            let response: micro_rpc::ResponseWrapper = response_result.into();
            response.encode_to_vec()
        })
        .invoke(&encrypted_request)
        .await
        .map(
            #[allow(clippy::needless_update)]
            |encrypted_response| {
                tonic::Response::new(InvokeResponse {
                    encrypted_response: Some(encrypted_response),
                    ..Default::default()
                })
            },
        )
        .map_err(|err| {
            tonic::Status::internal(format!(
                "couldn't call handle_user_request handler: {:?}",
                err
            ))
        })
    }

    async fn extend_next_lookup_data(
        &self,
        request: tonic::Request<ExtendNextLookupDataRequest>,
    ) -> tonic::Result<tonic::Response<ExtendNextLookupDataResponse>> {
        self.get_instance()?
            .extend_next_lookup_data(request.into_inner())
            .map(tonic::Response::new)
            .map_err(map_status)
    }

    async fn finish_next_lookup_data(
        &self,
        request: tonic::Request<FinishNextLookupDataRequest>,
    ) -> tonic::Result<tonic::Response<FinishNextLookupDataResponse>> {
        self.get_instance()?
            .finish_next_lookup_data(request.into_inner())
            .map(tonic::Response::new)
            .map_err(map_status)
    }

    async fn abort_next_lookup_data(
        &self,
        request: tonic::Request<Empty>,
    ) -> tonic::Result<tonic::Response<AbortNextLookupDataResponse>> {
        self.get_instance()?
            .abort_next_lookup_data(request.into_inner())
            .map(tonic::Response::new)
            .map_err(map_status)
    }

    async fn stream_lookup_data(
        &self,
        request: tonic::Request<tonic::Streaming<LookupDataChunk>>,
    ) -> tonic::Result<tonic::Response<FinishNextLookupDataResponse>> {
        let mut request = request.into_inner();

        let instance = self.get_instance()?;
        while let Some(chunk) = request.next().await {
            instance.extend_lookup_data_chunk(chunk?);
        }
        instance
            .finish_next_lookup_data(FinishNextLookupDataRequest {})
            .map(tonic::Response::new)
            .map_err(map_status)
    }

    async fn reserve(
        &self,
        request: tonic::Request<ReserveRequest>,
    ) -> tonic::Result<tonic::Response<ReserveResponse>> {
        let request = request.into_inner();
        self.get_instance()?
            .reserve(request)
            .map(tonic::Response::new)
            .map_err(map_status)
    }
}

#[derive(Clone)]
struct MonitoringLayer {
    meter: Meter,
}

impl MonitoringLayer {
    fn new(meter: Meter) -> Self {
        Self { meter }
    }
}

impl<S> tower::Layer<S> for MonitoringLayer {
    type Service = MonitoringService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        MonitoringService {
            inner,
            latencies: self
                .meter
                .u64_histogram("rpc/server/server_latency")
                .with_unit(Unit::new("milliseconds"))
                .with_description("Distribution of server-side RPC latency")
                .init(),
        }
    }
}

#[derive(Clone)]
struct MonitoringService<S> {
    inner: S,
    latencies: Histogram<u64>,
}

impl<S, T> tower::Service<http::Request<T>> for MonitoringService<S>
where
    S: tower::Service<http::Request<T>> + Clone + Send + 'static,
    <S as tower::Service<http::Request<T>>>::Future: Send,
    T: Send + 'static,
{
    type Response = S::Response;
    type Error = S::Error;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>> + Send>>;

    fn poll_ready(
        &mut self,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.inner.poll_ready(cx)
    }

    fn call(&mut self, req: http::Request<T>) -> Self::Future {
        // `[...]/Service/Method`, but we count from right, so method is last
        let mut attributes = Vec::new();
        let mut parts = req.uri().path().rsplitn(3, '/');
        if let Some(method) = parts.next() {
            attributes.push(KeyValue::new("method", method.to_string()));
        }
        if let Some(service) = parts.next() {
            attributes.push(KeyValue::new("service", service.to_string()));
        }

        // copied from the example in `tower::Service` to guarantee that `poll_ready` has been
        // called on the proper instance (and not the clone!)
        let clone = self.inner.clone();
        let mut inner = std::mem::replace(&mut self.inner, clone);

        let latencies = self.latencies.clone();

        Box::pin(async move {
            let now = Instant::now();
            let resp = inner.call(req).await;
            latencies.record(
                now.elapsed().as_micros().try_into().unwrap_or(u64::MAX),
                &attributes,
            );
            resp
        })
    }
}

/// Creates a `trace::Span` for the currently active gRPC request.
///
/// The fields of the Span are filled out according to the OpenTelemetry specifications, if
/// possible.
fn create_trace<Body>(request: &http::Request<Body>) -> Span {
    let uri = request.uri();
    // The general format of a gRPC URI is `http://[::1]:1234/Foo/Bar``, where `Foo` is the service, and `Bar` is the method.
    let mut parts = uri.path().rsplitn(3, '/');
    let method = parts.next();
    let service = parts.next();

    // See https://opentelemetry.io/docs/specs/semconv/rpc/rpc-spans/ and
    // https://opentelemetry.io/docs/specs/semconv/rpc/grpc/ for specifications on what OpenTelemetry
    // expects the traces to look like. Unfortunately the OTel conventions say that the span name
    // must be the full RPC method name, but Rust tracing wants the name to be static, so we'll
    // need to figure something out in the future.
    tracing::info_span!(
        "request",
        rpc.method = method,
        rpc.service = service,
        rpc.system = "grpc",
        rpc.grpc.status_code = tracing::field::Empty,
        server.address = uri.host(),
        server.port = uri.port_u16()
    )
}

struct OtelObserver {
    wasm_initialization: Histogram<u64>,
    wasm_invocation: Histogram<u64>,
}

impl OtelObserver {
    pub fn new(meter: Meter) -> Self {
        Self {
            wasm_initialization: meter
                .u64_histogram("wasm_initialization")
                .with_unit(Unit::new("milliseconds"))
                .with_description("Time spent setting up wasm sandbox for invocation")
                .init(),
            wasm_invocation: meter
                .u64_histogram("wasm_invocation")
                .with_unit(Unit::new("milliseconds"))
                .with_description("Time spent on calling `main` in wasm sandbox")
                .init(),
        }
    }
}
impl Observer for OtelObserver {
    fn wasm_initialization(&self, duration: core::time::Duration) {
        self.wasm_initialization
            .record(duration.as_millis().try_into().unwrap_or(u64::MAX), &[])
    }

    fn wasm_invocation(&self, duration: core::time::Duration) {
        self.wasm_invocation
            .record(duration.as_millis().try_into().unwrap_or(u64::MAX), &[])
    }
}

// Equivalent to `tonic::Code::Ok`.
static GRPC_SUCCESS: http::header::HeaderValue = http::header::HeaderValue::from_static("0");

// Equivalent to `tonic::status::GRPC_STATUS_HEADER_CODE`.
const GRPC_STATUS_HEADER_CODE: &str = "grpc-status";

// Starts up and serves an OakFunctionsContainersService instance from the provided TCP listener.
pub async fn serve<G: AsyncRecipientContextGenerator + Send + Sync + 'static, P: MeterProvider>(
    listener: TcpListener,
    encryption_context: Arc<G>,
    provider: P,
) -> anyhow::Result<()> {
    let meter = provider.meter("oak_functions_containers_app");
    tonic::transport::Server::builder()
        .layer(
            tower_http::trace::TraceLayer::new_for_grpc()
                .make_span_with(create_trace)
                .on_response(|response: &http::Response<_>, _latency, span: &Span| {
                    // If the request is successful, there's no `grpc-status` header, thus we assume
                    // the request was successful.
                    let code = response
                        .headers()
                        .get(GRPC_STATUS_HEADER_CODE)
                        .unwrap_or(&GRPC_SUCCESS)
                        .to_str()
                        .ok();
                    span.record("rpc.grpc.status_code", code);
                }),
        )
        .layer(tower::load_shed::LoadShedLayer::new())
        .layer(MonitoringLayer::new(meter.clone()))
        .add_service(OakFunctionsServer::new(OakFunctionsContainersService::new(
            encryption_context,
            Some(Arc::new(OtelObserver::new(meter))),
        )))
        .serve_with_incoming(TcpListenerStream::new(listener))
        .await
        .context("failed to start up the service")
}
