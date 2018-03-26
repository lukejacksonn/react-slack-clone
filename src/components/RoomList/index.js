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
    {rooms.map(room => (
      <li
        key={room.id}
        disabled={room.id === current.id}
        onClick={e => actions.joinRoom(room)}
        style={{
          order: priority(user, room, messages[room.id]),
        }}
      >
        <row->
          {room.name.match(user.id) &&
          room.users.find(x => x.id !== user.id) ? (
            <img
              src={room.users.find(x => x.id !== user.id).avatarURL}
              alt={room.users.find(x => x.id !== user.id).id}
            />
          ) : (
            Icon(room.isPrivate ? 'lock' : 'public')
          )}
          <col->
            <p>{room.name.replace(user.id, '')}</p>
            <span>
              {messages[room.id] &&
                Object.keys(messages[room.id]).length > 0 &&
                messages[room.id][
                  Object.keys(messages[room.id]).pop()
                ].text.slice(0, 50)}
            </span>
          </col->
        </row->
        {room.id !== current.id ? (
          <label>{unreads(user, room, messages[room.id])}</label>
        ) : null}
      </li>
    ))}
  </ul>
)
