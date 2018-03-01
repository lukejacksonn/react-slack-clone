import React from 'react'
import style from './index.module.css'

const RoomName = (name, user) => name.replace(user.id, '')

export const RoomHeader = ({
  state: { room, sidebar, user },
  actions: { setSidebar },
}) =>
  room.id ? (
    <header className={style.component}>
      <button onClick={e => setSidebar(!sidebar)}>
        <svg>
          <use xlinkHref="index.svg#menu" />
        </svg>
      </button>
      <h1>{RoomName(room.name, user)}</h1>
      <div>
        <h4>{room.userIds.length}</h4>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
    </header>
  ) : null
