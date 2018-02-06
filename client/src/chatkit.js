import Chatkit from 'pusher-chatkit-client'

const credentials = {
  url:
    'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/05f46048-3763-4482-9cfe-51ff327c3f29/token?instance_locator=v1:us1:05f46048-3763-4482-9cfe-51ff327c3f29',
  instanceLocator: 'v1:us1:05f46048-3763-4482-9cfe-51ff327c3f29',
}

export const startup = ({
  addMessage,
  setUser,
  setRooms,
  setRoom,
  isTyping,
  notTyping,
}) =>
  fetch('http://localhost:3000')
    .then(res => res.text())
    .then(userId => {
      const { instanceLocator, url } = credentials
      new Chatkit.ChatManager({
        tokenProvider: new Chatkit.TokenProvider({ url }),
        instanceLocator,
        userId,
      }).connect({
        delegate: {
          userStartedTyping: (room, user) => isTyping(user.name),
          userStoppedTyping: (room, user) => notTyping(user.name),
        },
        onSuccess: currentUser => {
          setUser(currentUser)
          currentUser.getJoinableRooms(setRooms, error =>
            console.log(`Error getting rooms: ${err}`)
          )
        },
        onError: error => console.log('Error on connection', error),
      })
    })
