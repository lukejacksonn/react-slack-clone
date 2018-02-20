import { h } from 'hyperapp'
import style from './index.css'

const join = (state, actions) => room => e =>
  state.user.joinRoom(
    room.id,
    room => {
      actions.setRoom(room)
      state.user.subscribeToRoom(room, {
        newMessage: actions.addMessage,
        cursorSet: console.log,
      })
    },
    error => console.log(`Error joining room ${room.name}: ${error}`)
  )

const room = (state, actions) => room => (
  <li disabled={state.room.id === room.id} onclick={join(state, actions)(room)}>
    <p>{`# ${room.name}`}</p>
    {room.userIds.length === 100 && <span>FULL</span>}
  </li>
)

export const RoomList = (state, actions) => (
  <ul class={style.component}>{state.rooms.map(room(state, actions))}</ul>
)
