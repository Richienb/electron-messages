import NodeIPC from "node-ipc"
import Nightmare from "nightmare" // eslint-disable-line @typescript-eslint/no-unused-vars, import/no-extraneous-dependencies, node/no-extraneous-import

type ValueOf<ObjectType> = ObjectType[keyof ObjectType]

/**
Evaluate some code in an Electron context with inter-process messaging.
@param function_ The function to evaluate in the Electron context. The first argument will be an ipc controller that allows you to `.emit` events and listen for them with `.on`. The other arguments are set to the value of `arguments_`.
@param arguments_ An array of arguments to include as arguments when calling `function_`.
@param options Options to pass to [`new BrowserWindow()`](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions).
@example
```
const electronMessages = require("electron-messages")

const electronInstance = await electronMessages(async ipc => {
	// You can use Electron APIs here
	ipc.emit("unicorn", {
		hello: "world"
	})
})

// Logs `{ hello: "world" }`
electronInstance.on("unicorn", data => {
	console.log(data)
})
```
*/
declare function electronMessages<ArgumentType>(function_: (...arguments_: [ValueOf<typeof NodeIPC.of>, ...ArgumentType[]]) => unknown, arguments_: readonly ArgumentType[], options?: Nightmare.IConstructorOptions): Promise<typeof NodeIPC.server & {
	/**
	Close the created instance of Electron.
	*/
	close: () => void
}>

export = electronMessages
