export const RoomList = (state, actions) => [
  'ul',
  state.rooms.map(room => [
    'li',
    {
      disabled: state.room.id === room.id,
      onclick: e => {
        state.user.joinRoom(
          room.id,
          room => {
            actions.setRoom(room)
            state.user.subscribeToRoom(room, {
              newMessage: actions.addMessage,
            })
          },
          error => console.log(`Error joining room ${room.name}: ${error}`)
        )
      },
    },
    [['p', `# ${room.name}`], room.userIds.length === 100 && ['span', 'FULL']],
  ]),
]
