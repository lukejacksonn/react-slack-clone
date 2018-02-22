import React from 'react'
import style from './index.module.css'

const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

class Attachment extends React.Component {
  componentDidMount() {
    this.props.link &&
      this.props.user
        .fetchAttachment(this.props.link)
        .then(fetched => this.setState({ src: fetched.link }))
  }
  render() {
    return this.state
      ? {
          image: <img controls={true} src={this.state.src} alt="" />,
          video: <video controls={true} src={this.state.src} />,
          audio: <audio controls={true} src={this.state.src} />,
        }[this.props.type]
      : null
  }
}

const Message = (user, online) => ({
  id,
  sender,
  createdAt,
  text,
  attachment = {},
}) => (
  <message-
    key={id}
    class={(sender.id === user.id || online[sender.id]) && style.online}
  >
    <img src={sender.avatarURL} alt={sender.name} />
    <div>
      <span>{`${sender.name} | ${time(createdAt)}`}</span>
      <p>{text}</p>
      <Attachment user={user} link={attachment.link} type={attachment.type} />
    </div>
  </message->
)

export const MessageList = ({ state: { messages, user, room, online } }) =>
  room.id ? (
    <ul className={style.component}>
      {Object.keys(messages[room.id] || {}).length > 0 ? (
        Object.keys(messages[room.id])
          .map(k => messages[room.id][k])
          .reverse()
          .map(Message(user, online))
      ) : (
        <div>
          <span role="img" aria-label="post">
            📝
          </span>
          <h2>No Messages Yet</h2>
          <p>
            Be the first to post in this room or invite someone to join the room
          </p>
        </div>
      )}
    </ul>
  ) : null
