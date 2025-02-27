//
// Copyright 2023 The Project Oak Authors
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

//! Integration tests for the Oak Functions Launcher.

use oak_functions_client::OakFunctionsClient;
use std::time::Duration;
use xtask::{launcher::MOCK_LOOKUP_DATA_PATH, workspace_path};

// Allow enough worker threads to collect output from background tasks.
#[tokio::test(flavor = "multi_thread", worker_threads = 3)]
async fn test_launcher_key_value_lookup() {
    if xtask::testing::skip_test() {
        log::info!("skipping test");
        return;
    }

    let wasm_path = oak_functions_test_utils::build_rust_crate_wasm("key_value_lookup")
        .expect("Failed to build Wasm module");

    let (mut _background, port) = xtask::containers::run_oak_functions_example_in_background(
        &wasm_path,
        MOCK_LOOKUP_DATA_PATH.to_str().unwrap(),
    )
    .await;

    // Wait for the server to start up.
    tokio::time::sleep(Duration::from_secs(60)).await;

    let mut client = OakFunctionsClient::new(&format!("http://localhost:{port}"))
        .await
        .expect("failed to create client");

    let response = client.invoke(b"test_key").await.expect("failed to invoke");
    assert_eq!(response, b"test_value");
}

// Allow enough worker threads to collect output from background tasks.
#[tokio::test(flavor = "multi_thread", worker_threads = 3)]
async fn test_launcher_echo() {
    if xtask::testing::skip_test() {
        log::info!("skipping test");
        return;
    }

    let wasm_path = oak_functions_test_utils::build_rust_crate_wasm("echo")
        .expect("Failed to build Wasm module");

    let (_background, port) = xtask::containers::run_oak_functions_example_in_background(
        &wasm_path,
        MOCK_LOOKUP_DATA_PATH.to_str().unwrap(),
    )
    .await;

    // Wait for the server to start up.
    tokio::time::sleep(Duration::from_secs(60)).await;

    let mut client = OakFunctionsClient::new(&format!("http://localhost:{port}"))
        .await
        .expect("failed to create client");

    let response = client.invoke(b"xxxyyyzzz").await.expect("failed to invoke");
    assert_eq!(std::str::from_utf8(&response).unwrap(), "xxxyyyzzz");
}

// Allow enough worker threads to collect output from background tasks.
#[tokio::test(flavor = "multi_thread", worker_threads = 3)]
async fn test_launcher_weather_lookup() {
    if xtask::testing::skip_test() {
        log::info!("skipping test");
        return;
    }

    let wasm_path = oak_functions_test_utils::build_rust_crate_wasm("weather_lookup")
        .expect("Failed to build Wasm module");

    let (_background, port) = xtask::containers::run_oak_functions_example_in_background(
        &wasm_path,
        workspace_path(&[
            "oak_functions",
            "examples",
            "weather_lookup",
            "testdata",
            "lookup_data_weather_sparse_s2",
        ])
        .to_str()
        .unwrap(),
    )
    .await;

    // Wait for the server to start up.
    tokio::time::sleep(Duration::from_secs(120)).await;

    let mut client = OakFunctionsClient::new(&format!("http://localhost:{port}"))
        .await
        .expect("failed to create client");

    let response = client
        .invoke(br#"{"lat":0,"lng":0}"#)
        .await
        .expect("failed to invoke");
    assert_eq!(
        std::str::from_utf8(&response).unwrap(),
        r#"{"temperature_degrees_celsius":29}"#
    );

    // TODO(#4177): Check response in the integration test.
    // Run Java client via Bazel.
    let status = tokio::process::Command::new("bazel")
        .arg("run")
        .arg("//java/src/main/java/com/google/oak/client/weather_lookup_client")
        .arg("--")
        .arg(format!("http://localhost:{port}"))
        .current_dir(workspace_path(&[]))
        .spawn()
        .expect("failed to spawn bazel")
        .wait()
        .await
        .expect("failed to wait for bazel");
    eprintln!("bazel status: {:?}", status);
    assert!(status.success());

    // TODO(#4177): Check response in the integration test.
    // Run C++ client via Bazel.
    let status = tokio::process::Command::new("bazel")
        .arg("run")
        .arg("//cc/client:cli")
        .arg("--")
        .arg(format!("--address=localhost:{port}"))
        .arg("--request={\"lat\":0,\"lng\":0}")
        .current_dir(workspace_path(&[]))
        .spawn()
        .expect("failed to spawn bazel")
        .wait()
        .await
        .expect("failed to wait for bazel");
    eprintln!("bazel status: {:?}", status);
    assert!(status.success());
}
