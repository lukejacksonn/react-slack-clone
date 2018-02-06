export const TypingIndicator = ({ typing = [] }) => [
  'div',
  { class: 'typing' },
  typing.length > 0 && `${typing.slice(0, 2).join(' and ')} is typing`,
]
