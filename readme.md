# electron-messages [![Travis CI Build Status](https://img.shields.io/travis/com/Richienb/electron-messages/master.svg?style=for-the-badge)](https://travis-ci.com/Richienb/electron-messages)

Evaluate some code in an Electron context with inter-process messaging.

[![NPM Badge](https://nodei.co/npm/electron-messages.png)](https://npmjs.com/package/electron-messages)

## Install

```sh
npm install electron-messages
```

## Usage

```js
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

## API

### electronMessages(function_, arguments_, options?)

#### function_

Type: `(ipc, ...arguments_) => any | Promise<any>`

The function to evaluate in the Electron context. The first argument will be an ipc controller that allows you to `.emit` events and listen for them with `.on`. The other arguments are set to the value of `arguments_`.

#### arguments_

An array of arguments to include as arguments when calling `function_`.

#### options

Type: `object`

Options to pass to [`new BrowserWindow()`](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#new-browserwindowoptions).
