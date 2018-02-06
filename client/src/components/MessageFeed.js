const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

export const MessageFeed = ({ messages = {}, user = {}, room = {} }) => [
  'div',
  {
    class: 'feed',
  },
  Object.keys(messages)
    .filter(x => messages[x].room.id === room.id)
    .map(k => messages[k])
    .reverse()
    .map(x => [
      'message-',
      { key: x.id },
      [
        ['img', { src: x.sender.avatarURL }],
        [
          'div',
          [
            ['span', `${x.sender.name} | ${time(x.createdAt)}`],
            ['p', x.text],
            // x.attachment &&
            //   x.attachment.type === 'image' && [
            //     'img',
            //     { src: x.attachment.link },
            //   ],
          ],
        ],
      ],
    ]),
]
