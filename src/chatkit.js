import Chatkit from '@pusher/chatkit-client'

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
      onAddedToRoom: actions.subscribeToRoom,
      onRemovedFromRoom: actions.removeRoom,
      onPresenceChanged: actions.setUserPresence,
    })
    .then(user => {
      // Subscribe to all rooms the user is a member of
      Promise.all(
        user.rooms.map(room =>
          user.subscribeToRoom({
            roomId: room.id,
            hooks: { onMessage: actions.addMessage },
          })
        )
      ).then(rooms => {
        actions.setUser(user)
        // Join the first room in the users room list
        user.rooms.length > 0 && actions.joinRoom(user.rooms[0])
      })
    })
    .catch(error => console.log('Error on connection', error))
