import React from 'react';
import style from './index.module.css'

export const CreateRoomForm = ({ state, actions }) => (
  <form
    className={style.component}
    onSubmit={e => {
      e.preventDefault()
      state.user.createRoom(
        { name: e.target[0].value },
        room => actions.setRooms([...state.rooms, room]),
        error => console.log(`Error creating room ${error}`)
      )
      e.target[0].value = ''
    }}
  >
    <input placeholder="Create a Room" />
    <button type="submit">
      <svg>
        <use href="index.svg#add" />
      </svg>
    </button>
  </form>
)
