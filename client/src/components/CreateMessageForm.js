const SendMessageButton = ({ room = false }) => [
  'button',
  {
    type: 'submit',
    disabled: !room.id,
  },
  [['svg', [['use', { href: 'index.svg#send' }]]]],
]

const MessageInput = ({ user = {}, message = '', room = null }, actions) => [
  'input',
  {
    placeholder: 'Type a Message..',
    oninput: e => {
      actions.setMessage(e.target.value)
      user.isTypingIn(room.id)
    },
    value: message,
    disabled: !room.id,
  },
]

export const CreateMessageForm = (
  { user = {}, room = {}, message = '' },
  actions
) => [
  'form',
  {
    onsubmit: e => {
      e.preventDefault()
      user.sendMessage({
        text: message,
        roomId: room.id,
      })
        .then(messageId => console.log(`Added message to ${room.name}`))
        .catch(error =>
          console.log(`Error adding message to ${room.name}: ${error}`)
        )
      actions.setMessage('')
    }
  },
  [MessageInput({ user, room, message }, actions), SendMessageButton({ room })],
]
