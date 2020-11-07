const electronMessages = require(".")

module.exports = (async () => {
	const electronInstance = await electronMessages(async ipc => {
		ipc.emit("unicorn", {
			hello: "world"
		})
	})

	// Logs `{ hello: "world" }`
	electronInstance.on("unicorn", data => {
		console.log(data)
	})
})()
