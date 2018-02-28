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
    setSidebar: sidebar => this.setState({ sidebar }),
    setUser: user => this.setState({ user }),
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
        <section
          className={this.state.dragging ? 'dragging' : undefined}
          onDragEnter={e => this.actions.setDraggingFile(true)}
          onMouseLeave={e => this.actions.setDraggingFile(false)}
          onDrop={e => this.actions.setDraggingFile(false)}
        >
          <RoomHeader state={this.state} actions={this.actions} />
          <TypingIndicator state={this.state} />
          <MessageList state={this.state} actions={this.actions} />
          <CreateMessageForm state={this.state} actions={this.actions} />
          <FileInput state={this.state} actions={this.actions} />
        </section>
      </main>
    )
  }
}

ReactDOM.render(<View />, document.querySelector('#root'))
