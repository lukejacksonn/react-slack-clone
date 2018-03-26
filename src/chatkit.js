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
      onUserStartedTyping: actions.isTyping,
      onUserStoppedTyping: actions.notTyping,
      onAddedToRoom: actions.addRoom,
      onRemovedFromRoom: actions.removeRoom,
      onUserCameOnline: user => actions.setUserPresence([user.id, true]),
      onUserWentOffline: user => actions.setUserPresence([user.id, false]),
    })
    .then(user => {
      Promise.all(
        user.rooms.map(room =>
          user.subscribeToRoom({
            roomId: room.id,
            hooks: { onNewMessage: actions.addMessage },
            messageLimit: 5,
          })
        )
      ).then(rooms => {
        actions.setUser(user)
        actions.setRooms(user.rooms)
        user.rooms.length > 0 && actions.joinRoom(user.rooms[0])
      })
    })
    .catch(error => console.log('Error on connection', error))
