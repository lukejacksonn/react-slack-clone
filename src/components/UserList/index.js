import React from 'react'
import style from './index.module.css'

export const UserList = ({ room, current, createConvo, removeUser }) => (
  <ul className={style.component}>
    {room.users.filter(user => user.id !== current).map(user => (
      <li
        key={user.id}
        className={user.presence.state === 'online' ? style.online : null}
      >
        <svg onClick={e => removeUser({ userId: user.id })}>
          <use xlinkHref={'index.svg#remove'} />
        </svg>
        <img src={user.avatarURL} alt={user.name} />
        <p onClick={e => createConvo({ user })}>{user.name}</p>
      </li>
    ))}
  </ul>
)
