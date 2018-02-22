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

export const MessageList = ({ state: { messages, user, room, online } }) =>
  room.id ? (
    <ul className={style.component}>
      {Object.keys(messages[room.id] || {}).length > 0
        ? Object.keys(messages[room.id])
            .map(k => messages[room.id][k])
            .reverse()
            .map(Message(user, online))
        : emptyList}
    </ul>
  ) : null
