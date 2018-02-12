const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

const Message = (user, online) => ({
  id,
  sender,
  createdAt,
  text,
  attachment,
}) => [
  'message-',
  {
    key: id,
    class: online[sender.id] && 'online',
  },
  [
    ['img', { src: sender.avatarURL }],
    [
      'div',
      [
        ['span', `${sender.name} | ${time(createdAt)}`],
        ['p', text],
        attachment && MessageAttachment(user)(attachment),
      ],
    ],
  ],
]

const MessageAttachment = user => attachment => [
  {
    image: 'img',
    video: 'video',
    audio: 'audio',
  }[attachment.type],
  {
    controls: true,
    oncreate: e =>
      user
        .fetchAttachment(attachment.link)
        .then(fetched => (e.src = fetched.link)),
  },
]

export const MessageList = ({ messages, user, room, online }) => [
  'div',
  {
    class: 'feed',
  },
  Object.keys(messages)
    .filter(x => messages[x].room.id === room.id)
    .map(k => messages[k])
    .reverse()
    .map(Message(user, online)),
]
