import React from 'react'
import style from './index.module.css'

export const RoomHeader = ({
  state: { room, sidebar },
  actions: { setSidebar },
}) =>
  room.id ? (
    <header className={style.component}>
      <button onClick={e => setSidebar(!sidebar)}>
        <svg>
          <use xlinkHref="index.svg#menu" />
        </svg>
      </button>
      <h1>{`#${room.name}`}</h1>
      <div>
        <h4>{room.userIds.length}</h4>
        <svg>
          <use xlinkHref="index.svg#members" />
        </svg>
      </div>
    </header>
  ) : null
