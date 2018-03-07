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
  state: { messages, user, room, online },
  actions: { createConvo, setEngaged },
}) =>
  room.id ? (
    <ul
      className={style.component}
      onMouseEnter={e => {
        messages[room.id] &&
          user.setReadCursor(
            room.id,
            parseInt(Object.keys(messages[room.id]).pop())
          )
        setEngaged(true)
      }}
      onScroll={e => {
        e.target.oldScroll > e.target.scrollTop &&
          e.target.scrollTop !== 0 &&
          setEngaged(false)
        ;(e.target.scrollHeight - e.target.scrollTop ===
          e.target.clientHeight ||
          e.target.oldRoom !== room.id) &&
          setEngaged(true)

        e.target.oldRoom = room.id
        e.target.oldScroll = e.target.scrollTop
      }}
    >
      {Object.keys(messages[room.id] || {}).length > 0
        ? Object.keys(messages[room.id])
            .reverse()
            .map(k =>
              Message({ user, online, createConvo })(messages[room.id][k])
            )
        : emptyList}
    </ul>
  ) : null
