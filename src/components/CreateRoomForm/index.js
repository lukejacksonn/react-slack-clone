import React from 'react'
import style from './index.module.css'

export const CreateRoomForm = ({
  state: { user, rooms },
  actions: { setRooms, setRoom, addMessage },
}) =>
  user.id ? (
    <form
      className={style.component}
      onSubmit={e => {
        e.preventDefault()
        user.createRoom({ name: e.target[0].value }).then(room => {
          setRooms([...rooms, room])
          user
            .subscribeToRoom(room.id, { newMessage: addMessage })
            .then(setRoom)
            .catch(console.log)
        })
        e.target[0].value = ''
      }}
    >
      <input placeholder="Create a Room" />
      <button type="submit">
        <svg>
          <use xlinkHref="index.svg#add" />
        </svg>
      </button>
    </form>
  ) : null
