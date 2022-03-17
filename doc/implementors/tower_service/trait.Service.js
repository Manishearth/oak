(function() {var implementors = {};
implementors["grpc_streaming_attestation"] = [{"text":"impl&lt;T, B&gt; <a class=\"trait\" href=\"https://docs.rs/tower-service/0.3.1/tower_service/trait.Service.html\" title=\"trait tower_service::Service\">Service</a>&lt;<a class=\"struct\" href=\"https://docs.rs/http/0.2.6/http/request/struct.Request.html\" title=\"struct http::request::Request\">Request</a>&lt;B&gt;&gt; for <a class=\"struct\" href=\"grpc_streaming_attestation/proto/streaming_session_server/struct.StreamingSessionServer.html\" title=\"struct grpc_streaming_attestation::proto::streaming_session_server::StreamingSessionServer\">StreamingSessionServer</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"grpc_streaming_attestation/proto/streaming_session_server/trait.StreamingSession.html\" title=\"trait grpc_streaming_attestation::proto::streaming_session_server::StreamingSession\">StreamingSession</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;B: <a class=\"trait\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html\" title=\"trait http_body::Body\">Body</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,<br>&nbsp;&nbsp;&nbsp;&nbsp;B::<a class=\"associatedtype\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html#associatedtype.Error\" title=\"type http_body::Body::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StdError&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,&nbsp;</span>","synthetic":false,"types":["grpc_streaming_attestation::proto::streaming_session_server::StreamingSessionServer"]}];
implementors["grpc_unary_attestation"] = [{"text":"impl&lt;T, B&gt; <a class=\"trait\" href=\"https://docs.rs/tower-service/0.3.1/tower_service/trait.Service.html\" title=\"trait tower_service::Service\">Service</a>&lt;<a class=\"struct\" href=\"https://docs.rs/http/0.2.6/http/request/struct.Request.html\" title=\"struct http::request::Request\">Request</a>&lt;B&gt;&gt; for <a class=\"struct\" href=\"grpc_unary_attestation/proto/unary_session_server/struct.UnarySessionServer.html\" title=\"struct grpc_unary_attestation::proto::unary_session_server::UnarySessionServer\">UnarySessionServer</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"grpc_unary_attestation/proto/unary_session_server/trait.UnarySession.html\" title=\"trait grpc_unary_attestation::proto::unary_session_server::UnarySession\">UnarySession</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;B: <a class=\"trait\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html\" title=\"trait http_body::Body\">Body</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,<br>&nbsp;&nbsp;&nbsp;&nbsp;B::<a class=\"associatedtype\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html#associatedtype.Error\" title=\"type http_body::Body::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StdError&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,&nbsp;</span>","synthetic":false,"types":["grpc_unary_attestation::proto::unary_session_server::UnarySessionServer"]}];
implementors["oak_proxy_attestation"] = [{"text":"impl&lt;T, B&gt; <a class=\"trait\" href=\"https://docs.rs/tower-service/0.3.1/tower_service/trait.Service.html\" title=\"trait tower_service::Service\">Service</a>&lt;<a class=\"struct\" href=\"https://docs.rs/http/0.2.6/http/request/struct.Request.html\" title=\"struct http::request::Request\">Request</a>&lt;B&gt;&gt; for <a class=\"struct\" href=\"oak_proxy_attestation/proto/proxy_attestation_server/struct.ProxyAttestationServer.html\" title=\"struct oak_proxy_attestation::proto::proxy_attestation_server::ProxyAttestationServer\">ProxyAttestationServer</a>&lt;T&gt; <span class=\"where fmt-newline\">where<br>&nbsp;&nbsp;&nbsp;&nbsp;T: <a class=\"trait\" href=\"oak_proxy_attestation/proto/proxy_attestation_server/trait.ProxyAttestation.html\" title=\"trait oak_proxy_attestation::proto::proxy_attestation_server::ProxyAttestation\">ProxyAttestation</a>,<br>&nbsp;&nbsp;&nbsp;&nbsp;B: <a class=\"trait\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html\" title=\"trait http_body::Body\">Body</a> + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,<br>&nbsp;&nbsp;&nbsp;&nbsp;B::<a class=\"associatedtype\" href=\"https://docs.rs/http-body/0.4.4/http_body/trait.Body.html#associatedtype.Error\" title=\"type http_body::Body::Error\">Error</a>: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/convert/trait.Into.html\" title=\"trait core::convert::Into\">Into</a>&lt;StdError&gt; + <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/marker/trait.Send.html\" title=\"trait core::marker::Send\">Send</a> + 'static,&nbsp;</span>","synthetic":false,"types":["oak_proxy_attestation::proto::proxy_attestation_server::ProxyAttestationServer"]}];
implementors["trusted_shuffler_server"] = [{"text":"impl <a class=\"trait\" href=\"https://docs.rs/tower-service/0.3.1/tower_service/trait.Service.html\" title=\"trait tower_service::Service\">Service</a>&lt;<a class=\"struct\" href=\"https://docs.rs/http/0.2.6/http/request/struct.Request.html\" title=\"struct http::request::Request\">Request</a>&lt;Body&gt;&gt; for <a class=\"struct\" href=\"trusted_shuffler_server/http/struct.Service.html\" title=\"struct trusted_shuffler_server::http::Service\">Service</a>","synthetic":false,"types":["trusted_shuffler_server::http::Service"]},{"text":"impl&lt;T&gt; <a class=\"trait\" href=\"https://docs.rs/tower-service/0.3.1/tower_service/trait.Service.html\" title=\"trait tower_service::Service\">Service</a>&lt;T&gt; for <a class=\"struct\" href=\"trusted_shuffler_server/http/struct.ServiceBuilder.html\" title=\"struct trusted_shuffler_server::http::ServiceBuilder\">ServiceBuilder</a>","synthetic":false,"types":["trusted_shuffler_server::http::ServiceBuilder"]}];
if (window.register_implementors) {window.register_implementors(implementors);} else {window.pending_implementors = implementors;}})()