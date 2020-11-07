const test = require("ava")
const pEvent = require("p-event")
const electronMessages = require(".")

test("main", async t => {
	const electronInstance = await electronMessages(async ipc => {
		ipc.emit("unicorn", {
			hello: "world"
		})
	})

	t.deepEqual(await pEvent(electronInstance, "unicorn"), {
		hello: "world"
	})

	electronInstance.close()
})
