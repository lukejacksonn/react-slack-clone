import { app } from 'hyperapp'
import { h } from 'ijk'

import { Header } from './components/Header'
import { MessageFeed } from './components/MessageFeed'
import { TypingIndicator } from './components/TypingIndicator'
import { MessageForm } from './components/MessageForm'
import { RoomList } from './components/RoomList'
import { RoomHeader } from './components/RoomHeader'
import { CreateRoomForm } from './components/CreateRoomForm'
import { FileInput } from './components/FileInput'

import { startup } from './chatkit'

const state = {
  user: {},
  room: {},
  rooms: [],
  message: '',
  messages: {},
  typing: [],
  dragging: false,
}

const actions = {
  setUser: user => ({ user }),
  setRoom: room => ({ room, messages: {} }),
  setRooms: rooms => ({ rooms }),
  setDraggingFile: dragging => ({ dragging }),
  setMessage: message => ({ message }),
  addMessage: payload => ({ messages }) => ({
    messages: Object.assign({}, messages, { [payload.id]: payload }),
  }),
  isTyping: user => ({ typing }) => ({
    typing: !typing.includes(user) ? [...typing, user] : typing,
  }),
  notTyping: user => ({ typing }) => ({
    typing: typing.filter(x => x !== user),
  }),
}

const view = (state, actions) =>
  h('name', 'props', 'children')([
    'main',
    [
      [
        'aside',
        [
          Header(state.user),
          RoomList(state, actions),
          CreateRoomForm(state, actions),
        ],
      ],
      [
        'section',
        {
          ondragover: e => actions.setDraggingFile(true),
          ondragleave: e => actions.setDraggingFile(false),
          ondrop: e => actions.setDraggingFile(false),
        },
        [
          RoomHeader(state.room),
          MessageFeed(state),
          TypingIndicator(state),
          MessageForm(state, actions),
          state.dragging && FileInput(state, actions),
        ],
      ],
    ],
  ])

startup(app(state, actions, view, document.body))
