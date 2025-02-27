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

fn main() -> Result<(), Box<dyn std::error::Error>> {
    micro_rpc_build::compile(
        &[
            &format!(
                "{}oak_remote_attestation/proto/v1/messages.proto",
                env!("WORKSPACE_ROOT")
            ),
            &format!("{}proto/attestation/dice.proto", env!("WORKSPACE_ROOT")),
            &format!("{}proto/attestation/evidence.proto", env!("WORKSPACE_ROOT")),
            &format!(
                "{}proto/attestation/endorsement.proto",
                env!("WORKSPACE_ROOT")
            ),
        ],
        &[env!("WORKSPACE_ROOT")],
        Default::default(),
    );

    Ok(())
}
