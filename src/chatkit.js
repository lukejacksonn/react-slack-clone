import Chatkit from '@pusher/chatkit'

const credentials = {
  url: (id, token) =>
    `https://chatkit-demo-server.herokuapp.com/token?user=${id}&token=${token}`,
  instanceLocator: 'v1:us1:05f46048-3763-4482-9cfe-51ff327c3f29',
}

const { instanceLocator, url } = credentials
export default ({ state, actions }, { id, token }) =>
  new Chatkit.ChatManager({
    tokenProvider: new Chatkit.TokenProvider({ url: url(id, token) }),
    instanceLocator,
    userId: id,
  })
    .connect({
      onUserStartedTyping: (room, user) => actions.isTyping([user.id, room]),
      onUserStoppedTyping: (room, user) => actions.notTyping(user.id),
      onUserCameOnline: user => actions.setUserPresence([user.id, true]),
      onUserWentOffline: user => actions.setUserPresence([user.id, false]),
      onAddedToRoom: actions.addRoom,
      onRemovedFromRoom: actions.removeRoom,
    })
    .then(user => {
      actions.setUser(user)
      user.rooms.map(room =>
        user.subscribeToRoom({
          roomId: room.id,
          hooks: { onNewMessage: actions.addMessage },
        })
      )
      user.getAllRooms().then(rooms => {
        actions.setRooms(rooms)
        actions.joinRoom()
      })
    })
    .catch(error => console.log('Error on connection', error))
