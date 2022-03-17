"use strict"
const electronEvaluate = require("electron-evaluate")
const uniqueString = require("unique-string")
const ipc = require("node-ipc")
const v8 = require("v8")

const startIpcServer = ipc => new Promise(resolve => {
	ipc.serve(resolve)
	ipc.server.start()
})

module.exports = async (function_, arguments_ = [], options = {}) => {
	ipc.config.id = uniqueString()
	ipc.config.silent = true

	await startIpcServer(ipc)

	const { cancel } = electronEvaluate(async (requirePaths, socketId, function_, arguments_) => {
		const ipc = require(requirePaths["node-ipc"])
		const uniqueString = require(requirePaths["unique-string"])
		const v8 = require("v8")

		ipc.config.id = uniqueString()
		ipc.config.retry = 1500
		ipc.config.silent = true

		await new Promise(resolve => {
			ipc.connectTo(socketId, resolve)
		})

		await eval(function_)(ipc.of[socketId], ...v8.deserialize(Buffer.from(arguments_, "hex"))) // eslint-disable-line no-eval
	}, [{
		"node-ipc": require.resolve("node-ipc"),
		"unique-string": require.resolve("unique-string")
	}, ipc.config.id, function_.toString(), v8.serialize(arguments_).toString("hex")], options)

	return {
		...ipc.server,
		close: cancel
	}
}
