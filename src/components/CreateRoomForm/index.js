import React from 'react'
import style from './index.module.css'

export const CreateRoomForm = ({ submit }) => (
  <form
    className={style.component}
    onSubmit={e => {
      e.preventDefault()
      submit({
        name: e.target[0].value,
        private: e.target.elements[2].checked,
      })
      e.target[0].value = ''
    }}
  >
    <input placeholder="Create a Room" type="text" required />
    <button>
      <input type="checkbox" />
      <svg>
        <use xlinkHref="index.svg#lock" />
      </svg>
    </button>
    <button type="submit">
      <svg>
        <use xlinkHref="index.svg#add" />
      </svg>
    </button>
  </form>
)
