import { h } from 'hyperapp'
import style from './index.css'

export const FileInput = (
  { user = {}, message = '', room = null },
  actions
) => (
  <input
    class={style.component}
    type="file"
    onchange={e => {
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
