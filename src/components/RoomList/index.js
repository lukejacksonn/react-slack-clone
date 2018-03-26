import React from 'react'
import style from './index.module.css'

const Icon = id => (
  <svg>
    <use xlinkHref={`index.svg#${id}`} />
  </svg>
)

const unreads = (user, room, messages = {}) => {
  const read = user.readCursor({ roomId: room.id })
  return (
    (read && Object.keys(messages).filter(x => x > read.position).length) ||
    undefined
  )
}

const priority = (user, room, messages = {}) => {
  const unreadMessages = unreads(user, room, messages) || 0
  const lastMessage = Object.keys(messages).pop() || 0
  return (unreadMessages + parseInt(lastMessage)) * -1
}

export const RoomList = ({ rooms = [], user, messages, current, actions }) => (
  <ul className={style.component}>
    {rooms.map(room => {
      const messageKeys = Object.keys(messages[room.id] || {})
      const latestMessage =
        messageKeys.length > 0 && messages[room.id][messageKeys.pop()]
      const firstUser = room.users.find(x => x.id !== user.id)
      const order = priority(user, room, messages[room.id])
      return (
        <li
          key={room.id}
          disabled={room.id === current.id}
          onClick={e => actions.joinRoom(room)}
          style={{ order }}
        >
          <row->
            {room.name.match(user.id) && firstUser ? (
              <img src={firstUser.avatarURL} alt={firstUser.id} />
            ) : (
              Icon(room.isPrivate ? 'lock' : 'public')
            )}
            <col->
              <p>{room.name.replace(user.id, '')}</p>
              <span>{latestMessage && latestMessage.text.slice(0, 50)}</span>
            </col->
          </row->
          {room.id !== current.id ? (
            <label>{unreads(user, room, messages[room.id])}</label>
          ) : null}
        </li>
      )
    })}
  </ul>
)
