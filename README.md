# chatkit-demo

> An app to demonstrate the capabilities and features of the Chatkit JavaScript SDK

![demo](https://user-images.githubusercontent.com/1457604/35891289-687ad6ec-0b9b-11e8-99cc-ffbad31a017e.gif)

This is a static, single page web app bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app) for ease of setup, distribution and development. It is a thin UI wrapper around the [pusher-chatkit-client](https://github.com/pusher/chatkit-client-js) library to demonstrate how different features can work together to form a compelling real-time chat client with various potential product applications.

You can view a deploy of this application at https://pusher.github.io/chatkit-demo

## Usage

To get started you will need to clone the repo, install dependencies and run the app.

```
$ git clone https://github.com/pusher/chatkit-demo
$ cd chatkit-demo
$ yarn && yarn start
```

The app will start in development mode and open a browser window on `http://localhost:3000`. The project will rebuild and the browser will reload automatically when source files are changed. Any build or runtime errors are also propagated to and displayed in the browser.

The project depends on a anonymous user creation endpoint that is hosted here https://chatkit-demo-server.herokuapp.com.

## Features

The Chatkit SDK allows you to implement features you would expect from a chat client. these include:

- 📝 Public and private chat rooms
- 📡 Realtime sending and receiving of messages
- 📦 Rich media attachments (drag and drop)
- 💬 Typing and presence indicators
- 📚 Read message cursors

## Components

The demo attempts to be feature complete according to documentation [here](https://docs.pusher.com/chatkit/reference/javascript). Feature requests should be made via issues or pull requests to this repository.

- CreateMessageForm - to send a message with a textual body and trigger typing indicators.
- CreateRoomForm - to create a new room and join it upon creation.
- FileInput - to send a message with a rich media attachment.
- Message - to render out a message that potentially includes an attachment.
- MessageList - to render a list of messages from a key value store.
- RoomHeader - to display useful information about a given room.
- RoomList - to render a list of rooms which can be subscribed to by the current user.
- TypingIndicator - to signify to the user that another user is typing in a given room.
- UserHeader - to display useful information about a given user.
