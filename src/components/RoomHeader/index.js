import React from 'react'
import style from './index.module.css'

export const RoomHeader = ({
  state: { room, user, sidebarOpen, userListOpen, inputIsOpen, roomTitle },
  actions: { setSidebar, setUserList, setTitleEditable, updateRoom, changeInputTitle },
}) => (
    <header className={style.component}>
      <button onClick={e => setSidebar(!sidebarOpen)}>
        <svg>
          <use xlinkHref="index.svg#menu" />
        </svg>
      </button>
      {
        (room.name && !inputIsOpen) && <h1 onClick={e => setTitleEditable(!inputIsOpen, room.name)}>
          {room.name.replace(user.id, '')}
        </h1>
      }

      {
        inputIsOpen &&
        <h1>{[
          <form >
            <span className={style.horizontal}>
              <input onChange={changeInputTitle} className={style.inputComponent} value={roomTitle} />
              &nbsp;
              <svg onClick={e => updateRoom(room.id, roomTitle)}>
                <use xlinkHref="index.svg#done" />
              </svg>
            </span>
          </form>
        ]}</h1>
      }


      {room.users && (
        <div onClick={e => setUserList(!userListOpen)}>
          <span>{room.users.length}</span>
          <svg>
            <use xlinkHref="index.svg#members" />
          </svg>
        </div>
      )}
    </header>
  )
