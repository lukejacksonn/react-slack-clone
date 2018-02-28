import React from 'react'
import style from './index.module.css'

export const CreateRoomForm = ({
  state: { user, rooms },
  actions: { createRoom },
}) =>
  user.id ? (
    <form
      className={style.component}
      onSubmit={e => {
        e.preventDefault()
        createRoom({ name: e.target[0].value })
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
