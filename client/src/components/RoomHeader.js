import { h } from 'hyperapp'
export const RoomHeader = ({ name = '', userIds = [] }) =>
  name && (
    <header>
      <h1>{`#${name}`}</h1>
      <div>
        <h4>{userIds.length}</h4>
        <svg>
          <use href="index.svg#members" />
        </svg>
      </div>
    </header>
  )
