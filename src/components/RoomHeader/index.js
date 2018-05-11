import React from 'react'
import style from './index.module.css'

export const RoomHeader = ({
  state: { room, user, sidebarOpen, userListOpen },
  actions: { setSidebar, setUserList, chirp },
}) => (
  <header className={style.component}>
    <button onClick={e => setSidebar(!sidebarOpen)}>
      <svg>
        <use xlinkHref="index.svg#menu" />
      </svg>
    </button>
    <h1 onClick={e => chirp('' + room.id)}>
      {room.name && room.name.replace(user.id, '')}
    </h1>
    {room.users && (
      <div onClick={e => setUserList(!userListOpen)}>
        <span>{room.users.length}</span>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
    )}
  </header>
)
