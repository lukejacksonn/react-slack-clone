import { h } from 'hyperapp'

const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

const props = (user, attachment) => ({
  controls: true,
  oncreate: e =>
    user
      .fetchAttachment(attachment.link)
      .then(fetched => (e.src = fetched.link)),
})

const Attachment = user => attachment => {
  return {
    image: <img {...props(user, attachment)} />,
    video: <video {...props(user, attachment)} />,
    audio: <audio {...props(user, attachment)} />,
  }[attachment.type]
}

const Message = (user, online) => ({
  id,
  sender,
  createdAt,
  text,
  attachment,
}) => (
  <message-
    key={id}
    class={(sender.id === user.id || online[sender.id]) && 'online'}
  >
    <img src={sender.avatarURL} />
    <div>
      <span>{`${sender.name} | ${time(createdAt)}`}</span>
      <p>{text}</p>
      {attachment && Attachment(user)(attachment)}
    </div>
  </message->
)

export const MessageList = ({ messages, user, room, online }) => (
  <ul class="feed">
    {messages[room.id] &&
      Object.keys(messages[room.id])
        .map(k => messages[room.id][k])
        .reverse()
        .map(Message(user, online))}
  </ul>
)
