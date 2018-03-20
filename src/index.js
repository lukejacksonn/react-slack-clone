import React from 'react'
import ReactDOM from 'react-dom'
import vuid from 'vuid'
import { set, del } from 'object-path-immutable'
import './index.css'

import { UserHeader } from './components/UserHeader'
import { UserList } from './components/UserList'
import { MessageList } from './components/MessageList'
import { TypingIndicator } from './components/TypingIndicator'
import { CreateMessageForm } from './components/CreateMessageForm'
import { RoomList } from './components/RoomList'
import { RoomHeader } from './components/RoomHeader'
import { CreateRoomForm } from './components/CreateRoomForm'

import ChatManager from './chatkit'

const githubAuthRedirect = () => {
  const client = '20cdd317000f92af12fe'
  const url = 'https://github.com/login/oauth/authorize'
  const server = 'https://chatkit-demo-server.herokuapp.com'
  const redirect =
    window.location.hostname === 'localhost'
      ? `${server}/success/local`
      : `${server}/success`
  const nonce = vuid()
  window.localStorage.setItem('nonce', nonce)
  window.location = `${url}?scope=user:email&client_id=${client}&state=${nonce}&redirect_uri=${redirect}`
}

const scrollList = () => {
  const elem = document.querySelector('section > ul')
  elem && (elem.scrollTop = 100000)
}

class View extends React.Component {
  state = {
    user: {},
    room: {},
    messages: {},
    online: {},
    typing: {},
    rooms: [],
    message: '',
    sidebar: false,
    userList: false,
    engaged: true,
  }

  actions = {
    scrollToEnd: e => this.state.engaged && scrollList(),
    setEngaged: engaged => this.setState({ engaged }),
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
    setRooms: rooms => this.setState({ rooms }),
    createRoom: options => {
      this.state.user.createRoom(options).then(room => {
        this.actions.addRoom(room)
        this.actions.joinRoom(room)
      })
    },
    addRoom: room => {
      this.setState({ rooms: [...this.state.user.rooms, room] })
      this.state.user.subscribeToRoom({
        roomId: room.id,
        hooks: { onNewMessage: this.actions.addMessage },
      })
    },
    joinRoom: (room = {}) => {
      this.actions.setRoom(room)
      room.id &&
        this.state.user
          .subscribeToRoom({
            roomId: room.id,
            hooks: { onNewMessage: this.actions.addMessage },
          })
          .catch(console.log)
    },
    setRoom: room => {
      this.setState({ room, sidebar: false })
      this.actions.scrollToEnd()
    },
    removeRoom: room => {
      this.setState({ rooms: this.state.user.rooms })
      this.state.room.id === room.id && this.actions.joinRoom()
    },
    setSidebar: sidebar => this.setState({ sidebar }),
    setUser: user => this.setState({ user }),
    setUserList: userList => this.setState({ userList }),
    setMessage: message => this.setState({ message }),
    addMessage: payload => {
      this.setState(
        set(this.state, ['messages', payload.room.id, payload.id], payload)
      )
      this.actions.scrollToEnd()
    },
    isTyping: (room, user) =>
      this.setState(set(this.state, ['typing', room.id, user.id], true)),
    notTyping: (room, user) =>
      this.setState(del(this.state, ['typing', room.id, user.id])),
    setUserPresence: ([user, status]) =>
      this.setState({ online: { ...this.state.online, [user]: status } }),
    addUserToRoom: ({ userId, roomId = this.state.room.id }) =>
      this.state.user
        .addUserToRoom({ userId, roomId })
        .then(this.actions.setRoom),
    removeUserFromRoom: ({ userId, roomId = this.state.room.id }) => {
      return userId === this.state.user.id
        ? this.state.user.leaveRoom({ roomId })
        : this.state.user
            .removeUserFromRoom({ userId, roomId })
            .then(this.actions.setRoom)
    },
    runCommand: command => {
      const commands = {
        invite: ([userId]) => this.actions.addUserToRoom({ userId }),
        remove: ([userId]) => this.actions.removeUserFromRoom({ userId }),
        leave: ([userId]) =>
          this.actions.removeUserFromRoom({ userId: this.state.user.id }),
      }
      const name = command.split(' ')[0]
      const args = command.split(' ').slice(1)
      const exec = commands[name]
      exec &&
        exec(args)
          .then(_ => this.actions.setMessage(''))
          .catch(console.log)
    },
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search.slice(1))
    const code =
      params.get('state') === window.localStorage.getItem('nonce') &&
      params.get('code')
    code
      ? fetch('https://chatkit-demo-server.herokuapp.com/auth', {
          method: 'POST',
          body: JSON.stringify({ code }),
        })
          .then(res => res.json())
          .then(user => {
            window.localStorage.removeItem('nonce')
            window.history.replaceState(null, null, window.location.pathname)
            ChatManager(this, user)
          })
      : githubAuthRedirect()
  }

  render() {
    const { sidebar, user, room, messages, typing, userList } = this.state
    const { createRoom, createConvo, removeUserFromRoom } = this.actions
    return (
      <main>
        <aside data-open={sidebar}>
          <UserHeader user={user} />
          <RoomList
            user={user}
            messages={messages}
            rooms={user.rooms}
            current={room}
            actions={this.actions}
          />
          <CreateRoomForm submit={createRoom} />
        </aside>
        {room.id ? (
          <section>
            <RoomHeader state={this.state} actions={this.actions} />
            {userList && room.userIds.length > 2 ? (
              <UserList
                room={room}
                current={user.id}
                createConvo={createConvo}
                removeUser={removeUserFromRoom}
              />
            ) : null}
            <TypingIndicator typing={typing[room.id]} />
            <MessageList state={this.state} actions={this.actions} />
            <CreateMessageForm state={this.state} actions={this.actions} />
          </section>
        ) : (
          <section />
        )}
      </main>
    )
  }
}

ReactDOM.render(<View />, document.querySelector('#root'))
