import Chatkit from '@pusher/chatkit'

const credentials = {
  url: (id, token) =>
    `https://chatkit-demo-server.herokuapp.com/token?user=${id}&token=${token}`,
  instanceLocator: 'v1:us1:d2c40632-6424-44ff-82fc-e8a2acc6c13e',
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
      onUserCameOnline: actions.setUserPresence,
      onUserWentOffline: actions.setUserPresence,
    })
    .then(user => {
      // Subscribe to all rooms the user is a member of
      Promise.all(
        user.rooms.map(room =>
          user.subscribeToRoom({
            roomId: room.id,
            hooks: { onNewMessage: actions.addMessage },
          })
        )
      ).then(rooms => {
        actions.setUser(user)
        // Join the first room in the users room list
        user.rooms.length > 0 && actions.joinRoom(user.rooms[0])
      })
    })
    .catch(error => console.log('Error on connection', error))
