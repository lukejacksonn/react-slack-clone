import React from 'react';
import style from './index.module.css'

const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}


class Attachment extends React.Component {

  state = {
    src: undefined
  }

  componentDidMount() {
    this.props.user
      .fetchAttachment(this.props.attachment.link)
      .then(fetched => this.setState({ src: fetched.link }))
  }

  render() {
    return {
      image: <img controls={true} src={this.state.src} />,
      video: <video controls={true} src={this.state.src} />,
      audio: <audio controls={true} src={this.state.src} />,
    }[this.props.attachment.type]
  }

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
    class={(sender.id === user.id || online[sender.id]) && style.online}
  >
    <img src={sender.avatarURL} />
    <div>
      <span>{`${sender.name} | ${time(createdAt)}`}</span>
      <p>{text}</p>
      {attachment && <Attachment user={user} attachment={attachment} />}
    </div>
  </message->
)

export const MessageList = ({ state: { messages, user, room, online }}) => (
  <ul className={style.component}>
    {messages[room.id] &&
      Object.keys(messages[room.id])
        .map(k => messages[room.id][k])
        .reverse()
        .map(Message(user, online))}
  </ul>
)
