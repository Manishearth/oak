var N = null;var sourcesIndex = {};
sourcesIndex["benchmark"] = {"name":"","files":["lib.rs"]};
sourcesIndex["echo"] = {"name":"","files":["lib.rs"]};
sourcesIndex["grpc_unary_attestation"] = {"name":"","files":["client.rs","lib.rs","server.rs"]};
sourcesIndex["key_value_lookup"] = {"name":"","files":["lib.rs"]};
sourcesIndex["location_utils"] = {"name":"","files":["lib.rs"]};
sourcesIndex["lookup_data_checker"] = {"name":"","files":["main.rs"]};
sourcesIndex["lookup_data_generator"] = {"name":"","files":["data.rs","lib.rs"]};
sourcesIndex["metrics"] = {"name":"","files":["lib.rs"]};
sourcesIndex["metrics_client"] = {"name":"","files":["main.rs"]};
sourcesIndex["mobilenet"] = {"name":"","files":["lib.rs"]};
sourcesIndex["mobilenet_client"] = {"name":"","files":["main.rs"]};
sourcesIndex["oak_attestation_common"] = {"name":"","files":["certificate.rs","keying_material.rs","lib.rs","report.rs"]};
sourcesIndex["oak_baremetal_communication_channel"] = {"name":"","files":["client.rs","frame.rs","lib.rs","message.rs","server.rs"]};
sourcesIndex["oak_baremetal_kernel"] = {"name":"","files":["args.rs","avx.rs","boot.rs","i8042.rs","interrupts.rs","lib.rs","libm.rs","logging.rs","memory.rs","virtio.rs"]};
sourcesIndex["oak_baremetal_loader"] = {"name":"","files":["crosvm.rs","main.rs","qemu.rs","server.rs","vmm.rs"]};
sourcesIndex["oak_baremetal_runtime"] = {"name":"","dirs":[{"name":"wasm","files":["mod.rs"]}],"files":["framing.rs","lib.rs","logger.rs","remote_attestation.rs"]};
sourcesIndex["oak_baremetal_simple_io"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_abi"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_client"] = {"name":"","files":["lib.rs","rekor.rs"]};
sourcesIndex["oak_functions_extension"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_load_test"] = {"name":"","files":["main.rs"]};
sourcesIndex["oak_functions_loader"] = {"name":"","files":["grpc.rs","lib.rs","logger.rs","lookup_data.rs","server.rs"]};
sourcesIndex["oak_functions_loader_base"] = {"name":"","files":["main.rs"]};
sourcesIndex["oak_functions_loader_unsafe"] = {"name":"","files":["main.rs"]};
sourcesIndex["oak_functions_lookup"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_metrics"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_sdk_abi_test_get_storage_item"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_sdk_abi_test_invoke_testing"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_sdk_abi_test_report_metric"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_sdk_abi_test_tf_model_infer"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_testing_extension"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_tf_inference"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_util"] = {"name":"","files":["lib.rs","sync.rs"]};
sourcesIndex["oak_functions_wasm"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_functions_web_client"] = {"name":"","files":["grpc_web.rs","lib.rs"]};
sourcesIndex["oak_functions_workload_logging"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_https_attestation"] = {"name":"","files":["main.rs","server.rs"]};
sourcesIndex["oak_idl"] = {"name":"","files":["lib.rs","utils.rs"]};
sourcesIndex["oak_idl_gen_services"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_idl_gen_structs"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_logger"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_proxy_attestation"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_proxy_attestation_bin"] = {"name":"","files":["main.rs"]};
sourcesIndex["oak_remote_attestation"] = {"name":"","dirs":[{"name":"crypto","files":["mod.rs","ring_crypto.rs"]}],"files":["handshaker.rs","lib.rs","message.rs"]};
sourcesIndex["oak_remote_attestation_amd"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_remote_attestation_sessions"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_remote_attestation_sessions_client"] = {"name":"","files":["lib.rs"]};
sourcesIndex["oak_tls_attestation"] = {"name":"","files":["main.rs","server.rs"]};
sourcesIndex["oak_utils"] = {"name":"","files":["lib.rs"]};
sourcesIndex["offline_attestation_client"] = {"name":"","files":["main.rs"]};
sourcesIndex["offline_attestation_server"] = {"name":"","files":["main.rs"]};
sourcesIndex["offline_attestation_shared"] = {"name":"","files":["lib.rs"]};
sourcesIndex["sev_guest"] = {"name":"","files":["cpuid.rs","ghcb.rs","instructions.rs","lib.rs","msr.rs","secrets.rs"]};
sourcesIndex["tensorflow_client"] = {"name":"","files":["data.rs","main.rs"]};
sourcesIndex["tensorflow_proxy"] = {"name":"","files":["grpc.rs","main.rs"]};
sourcesIndex["test_utils"] = {"name":"","files":["lib.rs"]};
sourcesIndex["trusted_shuffler"] = {"name":"","files":["lib.rs"]};
sourcesIndex["trusted_shuffler_backend"] = {"name":"","files":["main.rs"]};
sourcesIndex["trusted_shuffler_client"] = {"name":"","files":["main.rs"]};
sourcesIndex["trusted_shuffler_common"] = {"name":"","files":["lib.rs"]};
sourcesIndex["trusted_shuffler_server"] = {"name":"","files":["http.rs","main.rs"]};
sourcesIndex["virtio"] = {"name":"","dirs":[{"name":"console","files":["mod.rs"]},{"name":"queue","files":["mod.rs","virtq.rs"]},{"name":"vsock","dirs":[{"name":"socket","files":["mod.rs"]}],"files":["mod.rs","packet.rs"]}],"files":["lib.rs"]};
sourcesIndex["vsock_echo"] = {"name":"","files":["main.rs"]};
sourcesIndex["weather_lookup"] = {"name":"","files":["lib.rs"]};
sourcesIndex["xtask"] = {"name":"","files":["check_build_licenses.rs","check_license.rs","check_todo.rs","diffs.rs","examples.rs","files.rs","internal.rs","main.rs","vm.rs"]};
createSourceSidebar();
