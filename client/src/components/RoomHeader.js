export const RoomHeader = ({ name = '', userIds = [] }) => [
  'header',
  name && [
    ['h1', `#${name}`],
    [
      'div',
      [
        ['h4', userIds.length],
        ['svg', [['use', { href: 'index.svg#members' }]]],
      ],
    ],
  ],
]
