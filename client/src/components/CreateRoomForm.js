import { h } from 'hyperapp'
export const CreateRoomForm = (state, actions) => (
  <form
    onsubmit={e => {
      e.preventDefault()
      state.user.createRoom(
        { name: e.target[0].value },
        room => actions.setRooms([...state.rooms, room]),
        error => console.log(`Error creating room ${error}`)
      )
      e.target[0].value = ''
    }}
  >
    <input placeholder="Create a Room" />
    <button type="submit">
      <svg>
        <use href="index.svg#add" />
      </svg>
    </button>
  </form>
)
