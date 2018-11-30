import React from 'react'
import style from './index.module.css'
import { FileInput } from '../FileInput'

export const CreateMessageForm = ({
  state: { user = {}, room = {}, message = '' },
  actions: { runCommand },
}) =>
  room.id ? (
    <form
      className={style.component}
      onSubmit={e => {
        e.preventDefault()

        const message = e.target[0].value.trim()

        if (message.length === 0) {
          return
        }

        e.target[0].value = ''

        message.startsWith('/')
          ? runCommand(message.slice(1))
          : user.sendMessage({
              text: message,
              roomId: room.id,
            })
      }}
    >
      <input
        placeholder="Type a Message.."
        onInput={e => user.isTypingIn({ roomId: room.id })}
      />
      <FileInput state={{ user, room, message }} />
      <button type="submit">
        <svg>
          <use xlinkHref="index.svg#send" />
        </svg>
      </button>
    </form>
  ) : null
