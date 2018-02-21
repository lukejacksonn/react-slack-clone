import React from 'react';
import style from './index.module.css'

export const RoomHeader = ({ state: { room }}) =>
  room.name ? (
    <header className={style.component}>
      <h1>{`#${room.name}`}</h1>
      <div>
        <h4>{room.userIds.length}</h4>
        <svg>
          <use href="index.svg#members" />
        </svg>
      </div>
    </header>
  ) : null
