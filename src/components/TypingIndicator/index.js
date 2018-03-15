import React from 'react'
import style from './index.module.css'

const dots = (
  <div className={style.dots}>{[0, 1, 2].map(x => <div key={x} />)}</div>
)

export const TypingIndicator = ({ state: { room = {}, typing } }) =>
  typing[room.id] && Object.keys(typing[room.id]).length ? (
    <div className={style.component}>
      <div>{dots}</div>
      <div>{`${Object.keys(typing[room.id])
        .slice(0, 2)
        .join(' and ')} is typing`}</div>
    </div>
  ) : null
