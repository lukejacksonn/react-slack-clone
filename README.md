# React Slack Clone

[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
[![Build Status][travis-badge]][travis]

> Slack clone powered by [Chatkit](https://pusher.com/chatkit). See it in action here https://pusher.github.io/react-slack-clone

![demo](https://user-images.githubusercontent.com/1457604/35891289-687ad6ec-0b9b-11e8-99cc-ffbad31a017e.gif)

This is a static, single page web app bootstrapped with [create-react-app](https://github.com/facebookincubator/create-react-app) for ease of setup, distribution and development. It is a thin UI wrapper around the [pusher-chatkit-client](https://github.com/pusher/chatkit-client-js) library to demonstrate how different features can work together to form a compelling real-time chat client with various potential product applications.

## Features

The Chatkit SDK allows you to implement features you would expect from a chat client. These include:

* 📝 Public and private chat rooms
* 📡 Realtime sending and receiving of messages
* 📦 Rich media attachments (drag and drop)
* 💬 Typing and presence indicators
* 📚 Read message cursors

Want to get involved? We have a bunch of [beginner-friendly GitHub issues](https://github.com/pusher/react-slack-clone/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## Components

The demo attempts to be feature complete according to documentation [here](https://docs.pusher.com/chatkit/reference/javascript). Feature requests should be made via issues or pull requests to this repository.

* CreateMessageForm - to send a message with a textual body and trigger typing indicators.
* CreateRoomForm - to create a new room and join it upon creation.
* FileInput - to send a message with a rich media attachment.
* Message - to render out a message that potentially includes an attachment.
* MessageList - to render a list of messages from a key value store.
* RoomHeader - to display useful information about a given room.
* RoomList - to render a list of rooms which can be subscribed to by the current user.
* TypingIndicator - to signify to the user that another user is typing in a given room.
* UserHeader - to display useful information about a given user.

## Usage

To run the application locally; clone the repo, install dependencies and run the app.

```
$ git clone https://github.com/pusher/react-slack-clone
$ cd react-slack-clone
$ yarn && yarn start
```

The app starts in development mode and opens a browser window on `http://localhost:3000`. The project rebuilds and the browser reloads automatically when source files are changed. Any build or runtime errors are propagated and displayed in the browser.

The app depends on GitHub authentication and a user creation endpoint that is hosted at https://chatkit-demo-server.herokuapp.com. The endpoints are `/auth` and `/token`.

[github-star-badge]: https://img.shields.io/github/stars/pusher/react-slack-clone.svg?style=social
[github-star]: https://github.com/pusher/react-slack-clone/stargazers
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/kentcdodds/react-testing-library.svg?style=social
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20this%20Slack%20clone%20using%20@pusher%20Chatkit%20%F0%9F%91%89https://github.com/pusher/react-slack-clone
[travis-badge]: https://travis-ci.org/pusher/react-slack-clone.svg?branch=master
[travis]: https://travis-ci.org/pusher/react-slack-clone
