import React from 'react';
import style from './index.module.css'

export const FileInput = ({
  state: { user = {}, message = '', room = null },
  actions
}) => (
  <input
    className={style.component}
    type="file"
    onChange={e => {
      const file = e.target.files[0]
      user.sendMessage(
        {
          text: message || file.name,
          roomId: room.id,
          attachment: {
            file,
            name: file.name,
          },
        },
        messageId => console.log(`Added message to ${room.name}`),
        error => console.log(`Error adding message to ${room.name}: ${error}`)
      )
    }}
  />
)
