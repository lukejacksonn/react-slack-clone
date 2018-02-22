import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

import { UserHeader } from './components/UserHeader'
import { MessageList } from './components/MessageList'
import { TypingIndicator } from './components/TypingIndicator'
import { CreateMessageForm } from './components/CreateMessageForm'
import { RoomList } from './components/RoomList'
import { RoomHeader } from './components/RoomHeader'
import { CreateRoomForm } from './components/CreateRoomForm'
import { FileInput } from './components/FileInput'

import Chatkit from 'pusher-chatkit-client'

const credentials = {
  url:
    'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/05f46048-3763-4482-9cfe-51ff327c3f29/token?instance_locator=v1:us1:05f46048-3763-4482-9cfe-51ff327c3f29',
  instanceLocator: 'v1:us1:05f46048-3763-4482-9cfe-51ff327c3f29',
}

class View extends React.Component {
  state = {
    user: {},
    room: {},
    rooms: [],
    message: '',
    messages: {},
    typing: [],
    online: {},
    dragging: false,
  }

  actions = {
    setUser: user => this.setState({ user }),
    setRoom: room => {
      setTimeout(() => {
        const $ = document.querySelector('section ul')
        $.scrollTop = 100000
      }, 0)
      this.setState({ room })
    },
    setRooms: rooms => this.setState({ rooms }),
    setDraggingFile: dragging => this.setState({ dragging }),
    setMessage: message => this.setState({ message }),
    addMessage: payload => {
      const $ = document.querySelector('section ul')
      const x = $.scrollHeight - $.clientHeight <= $.scrollTop + 1
      x && setTimeout(() => ($.scrollTop = 100000), 0)
      this.setState({
        messages: {
          ...this.state.messages,
          [payload.room.id]: {
            ...this.state.messages[payload.room.id],
            [payload.id]: payload,
          },
        },
      })
    },
    isTyping: ([user, room]) =>
      this.state.room.id === room.id &&
      !this.state.typing.includes(user) &&
      this.setState({ typing: [...this.state.typing, user] }),
    notTyping: user =>
      this.setState({
        typing: this.state.typing.filter(x => x !== user),
      }),
    setUserPresence: ([user, status]) =>
      this.setState({
        online: { ...this.state.online, [user]: status },
      }),
  }

  componentDidMount() {
    fetch('https://chatkit-demo-server-xzqbaderjc.now.sh')
      .then(res => res.text())
      .then(userId => {
        const { instanceLocator, url } = credentials
        new Chatkit.ChatManager({
          tokenProvider: new Chatkit.TokenProvider({ url }),
          instanceLocator,
          userId,
        })
          .connect({
            userStartedTyping: (room, user) => {
              this.actions.setUserPresence([user.id, true])
              this.actions.isTyping([user.id, room])
            },
            userStoppedTyping: (room, user) => this.actions.notTyping(user.id),
            userCameOnline: user =>
              this.actions.setUserPresence([user.id, true]),
            userWentOffline: user =>
              this.actions.setUserPresence([user.id, false]),
          })
          .then(user => {
            this.actions.setUser(user)
            user.getJoinableRooms().then(rooms => {
              this.actions.setRooms(rooms)
              const initial = rooms.find(x => x.userIds.length !== 100)
              user
                .subscribeToRoom(initial.id, {
                  newMessage: this.actions.addMessage,
                })
                .then(this.actions.setRoom)
                .catch(console.log)
            })
          })
          .catch(error => console.log('Error on connection', error))
      })
  }

  render() {
    return (
      <main>
        <aside>
          <UserHeader state={this.state} />
          <RoomList state={this.state} actions={this.actions} />
          <CreateRoomForm state={this.state} actions={this.actions} />
        </aside>
        <section
          className={this.state.dragging ? 'dragging' : undefined}
          onDragEnter={e => this.actions.setDraggingFile(true)}
          onMouseLeave={e => this.actions.setDraggingFile(false)}
          onDrop={e => this.actions.setDraggingFile(false)}
        >
          <RoomHeader state={this.state} />
          <TypingIndicator state={this.state} />
          <MessageList state={this.state} />
          <CreateMessageForm state={this.state} actions={this.actions} />
          <FileInput state={this.state} actions={this.actions} />
        </section>
      </main>
    )
  }
}

ReactDOM.render(<View />, document.querySelector('#root'))
