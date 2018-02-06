const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

export const MessageFeed = ({ messages = [], user = {} }) => [
  'div',
  {
    class: 'feed',
    ondragenter: console.log,
  },
  Object.keys(messages)
    .map(k => messages[k])
    .reverse()
    .map(x => [
      'message-',
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
