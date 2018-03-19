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

export const RoomList = ({ rooms = [], user, messages, current, actions }) => (
  <ul className={style.component}>
    {rooms.map(room => (
      <li
        key={room.id}
        disabled={room.id === current.id}
        onClick={e => actions.joinRoom(room)}
        style={{
          order: unreads(user, room, messages[room.id]) * -1 || 0,
        }}
      >
        <p>
          {Icon(
            room.name.match(user.id)
              ? 'members'
              : room.isPrivate ? 'lock' : 'public'
          )}
          <span>{room.name.replace(user.id, '')}</span>
        </p>
        <label>{unreads(user, room, messages[room.id])}</label>
      </li>
    ))}
  </ul>
)
