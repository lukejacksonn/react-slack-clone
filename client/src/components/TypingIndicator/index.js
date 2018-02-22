import React from 'react'
import style from './index.module.css'

const indicator = (
  <div class={style.dots}>
    <div class="dot" cx="46" cy="30" r="8" />
    <div class="dot" cx="68" cy="30" r="8" />
    <div class="dot" cx="90" cy="30" r="8" />
  </div>
)

export const TypingIndicator = ({ state: { room, typing = [] } }) =>
  room.id && typing.length > 0 ? (
    <div className={style.component}>
      <div>{indicator}</div>
      <div>{`${typing.slice(0, 2).join(' and ')} is typing`}</div>
    </div>
  ) : null
