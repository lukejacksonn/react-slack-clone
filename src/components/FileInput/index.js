import React from 'react'
import style from './index.module.css'

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const FileInput = ({ state: { user, message, room } }) =>
  room.id ? (
    <button>
      <svg>
        <use xlinkHref="index.svg#attach" />
      </svg>
      <input
        className={style.component}
        type="file"
        onChange={e => {
          const file = e.target.files[0]
          file &&
            user.sendMessage({
              text: message || file.name,
              roomId: room.id,
              attachment: {
                // uuidv4() to keep every uploaded file identical,File name to download it correctly
                // othewise we don't know what we downloaded plus extension is lost too.
                name: uuidv4() + '_' + file.name,
                file,
              },
            })
        }}
      />
    </button>
  ) : null
