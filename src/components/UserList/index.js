import React from 'react'
import style from './index.module.css'

export const UserList = ({ room, user, createConvo, runCommand }) =>
  room.users ? (
    <ul className={style.component}>
      {room.users.map(x => (
        <li
          key={x.id}
          className={
            (x.presence && x.presence.state === 'online') || x.id === user.id
              ? style.online
              : null
          }
        >
          <svg onClick={e => runCommand(`remove ${x.id}`)}>
            <use xlinkHref={'index.svg#remove'} />
          </svg>
          <img src={x.avatarURL} alt={x.name} />
          <p onClick={e => x.id !== user.id && createConvo({ user: x })}>
            {x.name}
          </p>
        </li>
      ))}
    </ul>
  ) : null
