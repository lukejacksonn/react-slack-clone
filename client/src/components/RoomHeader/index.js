import { h } from 'hyperapp'
import style from './index.css'

export const RoomHeader = ({ name = '', userIds = [] }) =>
  name && (
    <header class={style.component}>
      <h1>{`#${name}`}</h1>
      <div>
        <h4>{userIds.length}</h4>
        <svg>
          <use href="index.svg#members" />
        </svg>
      </div>
    </header>
  )
