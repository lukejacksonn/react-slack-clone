import React from 'react'
import style from './index.module.css'

export const TypingIndicator = ({ state: { typing = [] } }) => (
  <div className={style.component}>
    {typing.length > 0 && `${typing.slice(0, 2).join(' and ')} is typing`}
  </div>
)
