initSidebarItems({"enum":[["ChannelReadStatus","Single byte values used to indicate the read status of a channel on the `oak.wait_on_channels` host function."],["OakError","Generic Oak error."],["OakStatus","Status values exchanged as i32 values across the Node Wasm interface."]],"fn":[["app_config_map","Retrieve the Application's `ConfigMap` from the read handle for the start-of-day initial channel."],["channel_close","Close the specified channel [`Handle`]."],["channel_create","Similar to [`channel_create_with_label`], but with a fixed label corresponding to \"public untrusted\"."],["channel_create_with_label","Create a new unidirectional channel."],["channel_label_read","Get the [`Label`] for the channel associated with the `handle`."],["channel_read","Read a message from a channel without blocking."],["channel_write","Write a message to a channel."],["node_create","Similar to [`node_create_with_label`], but with a fixed label corresponding to \"public untrusted\"."],["node_create_with_label","Creates a new Node running the configuration identified by `config_name`, running the entrypoint identified by `entrypoint_name` (for a Web Assembly Node; this parameter is ignored when creating a pseudo-Node), with the provided `label`, and passing it the given handle."],["node_label_read","Get the [`Label`] for the current node."],["node_privilege_read","Get the downgrade privilege for the current node represented as a [`Label`]."],["random_get","Fill a buffer with random data."],["result_from_status","Convert a status returned from a host function call to a `Result`."],["run_event_loop","Run an event loop on the provided `node`:"],["set_panic_hook","Install a panic hook that logs [panic information]."],["wait_on_channels","Wait for one or more of the provided handles to become ready for reading from.  On success, the returned vector of [`ChannelReadStatus`] values will be in 1-1 correspondence with the passed-in vector of [`Handle`]s."]],"macro":[["entrypoint","Register a new Node entrypoint."]],"mod":[["grpc","Functionality to help Oak Nodes interact with gRPC."],["handle","Utilities for visiting, extract and injecting handles."],["http","Functionality to help Oak Nodes create HTTP server pseudo-Nodes."],["io","Wrappers for Oak SDK types to allow their use with [`std::io`]."],["logger","A logger that sends output to an Oak logging channel, for use with the [log facade]."],["node_config","Helper methods for creating common [`NodeConfiguration`] instances."],["proto","Auto-generated code derived from protocol buffer definitions."],["rand","Functionality to allow use of the rand crate in Oak."],["roughtime","Helper library for accessing the Oak Roughtime service."],["storage","Helper library for accessing Oak storage services."]],"struct":[["Label","Label represents information flowing through a Node or channel."],["ReadHandle","Wrapper for a handle to the read half of a channel."],["WriteHandle","Wrapper for a handle to the send half of a channel."]],"trait":[["Node","Trait implemented by Oak Nodes that operate on commands."]],"type":[["Handle","Handle used to identify read or write channel halves."]]});