var sourcesIndex = JSON.parse('{\
"benchmark":["",[],["lib.rs"]],\
"echo":["",[],["lib.rs"]],\
"key_value_lookup":["",[],["lib.rs"]],\
"location_utils":["",[],["lib.rs"]],\
"lookup_data_checker":["",[],["main.rs"]],\
"lookup_data_generator":["",[],["data.rs","lib.rs"]],\
"micro_rpc":["",[],["lib.rs","status.rs"]],\
"micro_rpc_build":["",[],["lib.rs"]],\
"oak_channel":["",[],["client.rs","frame.rs","lib.rs","message.rs","server.rs"]],\
"oak_client":["",[],["lib.rs","transport.rs","verifier.rs"]],\
"oak_containers_hello_world_trusted_app":["",[],["app_service.rs","lib.rs","orchestrator_client.rs"]],\
"oak_containers_hello_world_untrusted_app":["",[],["app_client.rs","lib.rs"]],\
"oak_containers_launcher":["",[],["lib.rs","qemu.rs","server.rs"]],\
"oak_containers_orchestrator":["",[],["container_runtime.rs","ipc_server.rs","lib.rs","logging.rs"]],\
"oak_containers_orchestrator_client":["",[],["lib.rs"]],\
"oak_containers_stage1":["",[],["client.rs","image.rs","main.rs"]],\
"oak_core":["",[],["lib.rs","samplestore.rs","sync.rs","timer.rs"]],\
"oak_crypto":["",[["hpke",[],["aead.rs","mod.rs"]]],["encryptor.rs","lib.rs","signer.rs","util.rs"]],\
"oak_docker_linux_init":["",[],["init.rs","main.rs"]],\
"oak_echo_linux_init":["",[],["init.rs","main.rs"]],\
"oak_echo_service":["",[],["lib.rs"]],\
"oak_enclave_runtime_support":["",[],["heap.rs","lib.rs","libm.rs"]],\
"oak_functions_abi":["",[],["lib.rs"]],\
"oak_functions_client":["",[],["lib.rs"]],\
"oak_functions_launcher":["",[],["lib.rs","lookup.rs","server.rs"]],\
"oak_functions_linux_fd_bin":["",[],["main.rs"]],\
"oak_functions_load_test":["",[],["main.rs"]],\
"oak_functions_sdk":["",[],["lib.rs"]],\
"oak_functions_sdk_abi_test_get_storage_item":["",[],["lib.rs"]],\
"oak_functions_sdk_abi_test_invoke_testing":["",[],["lib.rs"]],\
"oak_functions_service":["",[["wasm",[],["api.rs","mod.rs"]]],["lib.rs","logger.rs","lookup.rs"]],\
"oak_functions_test_utils":["",[],["lib.rs"]],\
"oak_grpc_utils":["",[],["lib.rs"]],\
"oak_hello_world_linux_init":["",[],["init.rs","main.rs"]],\
"oak_iree_service":["",[],["iree.rs","lib.rs"]],\
"oak_launcher_utils":["",[["launcher",[],["native.rs","virtualized.rs"]]],["channel.rs","launcher.rs","lib.rs"]],\
"oak_linux_boot_params":["",[],["lib.rs"]],\
"oak_remote_attestation":["",[],["attester.rs","handler.rs","lib.rs"]],\
"oak_remote_attestation_verification":["",[],["lib.rs","rekor.rs","verifier.rs"]],\
"oak_restricted_kernel":["",[["boot",[],["mod.rs"]],["mm",[],["bitmap_frame_allocator.rs","encrypted_mapper.rs","frame_allocator.rs","mod.rs","page_tables.rs","virtual_address_allocator.rs"]],["syscall",[],["channel.rs","fd.rs","mmap.rs","mod.rs","process.rs","stdio.rs"]]],["acpi.rs","args.rs","attestation.rs","avx.rs","descriptors.rs","elf.rs","ghcb.rs","interrupts.rs","lib.rs","libm.rs","logging.rs","memory.rs","payload.rs","shutdown.rs","snp.rs","virtio.rs"]],\
"oak_restricted_kernel_api":["",[],["channel.rs","lib.rs","logging.rs","raw_syscall.rs","syscall.rs"]],\
"oak_restricted_kernel_interface":["",[],["errno.rs","lib.rs","syscalls.rs"]],\
"oak_sev_guest":["",[],["cpuid.rs","crypto.rs","ghcb.rs","guest.rs","instructions.rs","interrupts.rs","io.rs","lib.rs","msr.rs","secrets.rs","vmsa.rs"]],\
"oak_simple_io":["",[],["lib.rs"]],\
"oak_stage0":["",[],["acpi.rs","alloc.rs","cmos.rs","fw_cfg.rs","initramfs.rs","kernel.rs","lib.rs","logging.rs","paging.rs","sev.rs","zero_page.rs"]],\
"oak_tdx_guest":["",[],["lib.rs","tdcall.rs","vmcall.rs"]],\
"oak_tensorflow_service":["",[],["lib.rs","tflite.rs"]],\
"oak_transparency_claims":["",[],["claims.rs","intoto.rs","lib.rs"]],\
"oak_virtio":["",[["console",[],["mod.rs"]],["queue",[],["mod.rs","virtq.rs"]],["vsock",[["socket",[],["mod.rs"]]],["mod.rs","packet.rs"]]],["lib.rs"]],\
"quirk_echo_launcher":["",[],["lib.rs"]],\
"quirk_echo_service":["",[],["lib.rs"]],\
"sev_serial":["",[],["lib.rs"]],\
"snp_measurement":["",[],["elf.rs","main.rs","page.rs","stage0.rs","vmsa.rs"]],\
"weather_lookup":["",[],["lib.rs"]],\
"xtask":["",[],["check_build_licenses.rs","check_license.rs","check_todo.rs","diffs.rs","examples.rs","files.rs","internal.rs","launcher.rs","lib.rs","testing.rs"]]\
}');
createSourceSidebar();
