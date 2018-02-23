import React from 'react'
import style from './index.module.css'

const Room = (state, actions) => room =>
  room.userIds.length < 100 ? (
    <li
      key={room.id}
      disabled={state.room.id === room.id}
      onClick={e => {
        actions.setRoom(room)
        state.user.subscribeToRoom(room.id, { newMessage: actions.addMessage })
      }}
    >
      <p>{`# ${room.name}`}</p>
    </li>
  ) : null

export const RoomList = ({ state, actions }) => (
  <ul className={style.component}>{state.rooms.map(Room(state, actions))}</ul>
)
