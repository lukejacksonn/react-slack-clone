import React from 'react'
import style from './index.module.css'
import { Message } from '../Message'

const emptyList = (
  <div className={style.empty}>
    <span role="img" aria-label="post">
      📝
    </span>
    <h2>No Messages Yet</h2>
    <p>Be the first to post in this room or invite someone to join the room</p>
  </div>
)

export const MessageList = ({
  state: { messages, user, room, rooms, online },
  actions: { setRoom, setRooms, addMessage },
}) =>
  room.id ? (
    <ul className={style.component}>
      {Object.keys(messages[room.id] || {}).length > 0
        ? Object.keys(messages[room.id])
            .reverse()
            .map(k =>
              Message(user, online, rooms, setRoom, setRooms, addMessage)(
                messages[room.id][k]
              )
            )
        : emptyList}
    </ul>
  ) : null
