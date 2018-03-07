import React from 'react'
import style from './index.module.css'
import { UserList } from '../UserList'

export const RoomHeader = ({
  state: { room, sidebar, user, userList },
  actions: { setSidebar, createConvo, runCommand, setUserList },
}) =>
  room.id ? (
    <header className={style.component}>
      <button onClick={e => setSidebar(!sidebar)}>
        <svg>
          <use xlinkHref="index.svg#menu" />
        </svg>
      </button>
      <h1>{room.name.replace(user.id, '')}</h1>
      <div onClick={e => setUserList(!userList)}>
        <h4>{room.userIds.length}</h4>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
      {userList ? (
        <UserList
          room={room}
          user={user}
          createConvo={createConvo}
          runCommand={runCommand}
        />
      ) : null}
    </header>
  ) : null
