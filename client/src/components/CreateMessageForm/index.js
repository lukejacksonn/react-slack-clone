import React from 'react'
import style from './index.module.css'

export const CreateMessageForm = ({
  state: { user = {}, room = {}, message = '' },
  actions: { setMessage },
}) =>
  room.id ? (
    <form
      className={style.component}
      onSubmit={e => {
        e.preventDefault()
        user.sendMessage({
          text: message,
          roomId: room.id,
        })
        setMessage('')
      }}
    >
      <input
        placeholder="Type a Message.."
        onInput={e => {
          setMessage(e.target.value)
          user.isTypingIn(room.id)
        }}
        value={message}
      />
      <button type="submit">
        <svg>
          <use href="index.svg#send" />
        </svg>
      </button>
    </form>
  ) : null
