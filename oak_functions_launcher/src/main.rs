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

#![feature(never_type)]
#![feature(result_flattening)]
#![feature(array_chunks)]

use clap::Parser;
use oak_functions_launcher::LookupDataConfig;
use std::net::{Ipv6Addr, SocketAddr};
use tokio::signal;
use ubyte::ByteUnit;

#[derive(Parser, Debug)]
pub struct Args {
    /// launcher params.
    #[clap(flatten)]
    launcher_params: oak_launcher_utils::launcher::Params,

    #[clap(flatten)]
    functions_params: oak_functions_launcher::Args,
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Args::parse();
    env_logger::init();
    log::info!("Oak Functions Launcher args: {:?}", cli);

    let lookup_data_config = LookupDataConfig {
        lookup_data_path: cli.functions_params.lookup_data,
        // Hard-coded because we are not sure whether we want to configure the update interval.
        update_interval: Some(std::time::Duration::from_millis(1000 * 60 * 10)),
        // Fix the maximum size of a chunk to the proto limit size of 2 GiB.
        max_chunk_size: ByteUnit::Gibibyte(2),
    };

    let (mut launched_instance, connector_handle, initialize_response) =
        oak_functions_launcher::create(
            cli.launcher_params,
            lookup_data_config,
            cli.functions_params.wasm,
            cli.functions_params.constant_response_size,
        )
        .await?;

    #[allow(deprecated)]
    let public_key_info = initialize_response
        .public_key_info
        .expect("no public key info returned");
    log::info!(
        "obtained public key ({} bytes)",
        public_key_info.public_key.len()
    );

    let server_future = oak_functions_launcher::server::new(
        SocketAddr::from((Ipv6Addr::UNSPECIFIED, cli.functions_params.port)),
        connector_handle,
        public_key_info.public_key,
        public_key_info.attestation,
    );

    // Wait until something dies or we get a signal to terminate.
    tokio::select! {
        _ = signal::ctrl_c() => {
            log::info!("Ctrl-C received, terminating VMM");
            launched_instance.kill().await?;
        },
        _ = server_future => {
            log::info!("server terminated, terminating VMM");
            launched_instance.kill().await?;
        },
        val = launched_instance.wait() => {
            log::error!("Unexpected VMM exit, status: {:?}", val);
        },
    }

    Ok(())
}
