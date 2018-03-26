import React from 'react'
import style from './index.module.css'

export const RoomHeader = ({
  state: { room, user, sidebarOpen, userListOpen },
  actions: { setSidebar, setUserList, createConvo, removeUserFromRoom },
}) => (
  <header className={style.component}>
    <button onClick={e => setSidebar(!sidebarOpen)}>
      <svg>
        <use xlinkHref="index.svg#menu" />
      </svg>
    </button>
    <h1>{room.name.replace(user.id, '')}</h1>
    {room.userIds.length > 2 ? (
      <div onClick={e => setUserList(!userListOpen)}>
        <h4>{room.userIds.length}</h4>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
    ) : null}
  </header>
)
