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

import ChatManager from './chatkit'

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
    sidebar: false,
  }

  actions = {
    createConvo: options => {
      const exists = this.state.rooms.find(
        x => x.name.match(options.user.id) && x.name.match(this.state.user.id)
      )
      exists
        ? this.actions.joinRoom(exists)
        : this.actions.createRoom({
            name: this.state.user.id + options.user.id,
            addUserIds: [options.user.id],
            private: true,
          })
    },
    createRoom: options => {
      this.state.user.createRoom(options).then(room => {
        this.actions.addRoom(room)
        this.actions.joinRoom(room)
      })
    },
    joinRoom: room => {
      this.actions.setRoom(room)
      this.state.user
        .subscribeToRoom(room.id, { newMessage: this.actions.addMessage })
        .catch(console.log)
    },
    setSidebar: sidebar => this.setState({ sidebar }),
    setUser: user => this.setState({ user }),
    setRooms: rooms => this.setState({ rooms }),
    addRoom: room => this.setState({ rooms: [...this.state.rooms, room] }),
    setRoom: room => {
      setTimeout(() => {
        const $ = document.querySelector('section ul')
        $.scrollTop = 100000
      }, 0)
      this.setState({
        room,
        sidebar: false,
      })
    },
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
      this.setState({
        typing: [...this.state.typing, user],
        online: { ...this.state.online, [user]: true },
      }),
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
    const user = localStorage.getItem('chatkit-user')
    user
      ? ChatManager(this, user)
      : fetch('https://chatkit-demo-server.herokuapp.com')
          .then(res => res.text())
          .then(id => {
            localStorage.setItem('chatkit-user', id)
            ChatManager(this, id)
          })
  }

  render() {
    return (
      <main>
        <aside data-open={this.state.sidebar}>
          <UserHeader state={this.state} />
          <RoomList state={this.state} actions={this.actions} />
          <CreateRoomForm state={this.state} actions={this.actions} />
        </aside>
        <section>
          <RoomHeader state={this.state} actions={this.actions} />
          <TypingIndicator state={this.state} />
          <MessageList state={this.state} actions={this.actions} />
          <CreateMessageForm state={this.state} actions={this.actions} />
        </section>
      </main>
    )
  }
}

ReactDOM.render(<View />, document.querySelector('#root'))
