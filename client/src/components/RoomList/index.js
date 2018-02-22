import React from 'react'
import style from './index.module.css'

const Room = (state, actions) => room => (
  <li
    key={room.id}
    disabled={state.room.id === room.id}
    onClick={e =>
      state.user
        .subscribeToRoom(room.id, { newMessage: actions.addMessage })
        .then(actions.setRoom)
    }
  >
    <p>{`# ${room.name}`}</p>
    {room.userIds.length === 100 && <span>FULL</span>}
  </li>
)

export const RoomList = ({ state, actions }) => (
  <ul className={style.component}>{state.rooms.map(Room(state, actions))}</ul>
)
