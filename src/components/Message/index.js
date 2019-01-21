import React from 'react'
import style from './index.module.css'
import Linkify from 'react-linkify'

const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

class Attachment extends React.Component {
  componentDidMount() {
    if (this.props.link) this.setState({ src: this.props.link });
  }
  render() {
    return this.state
      ? {
          image: (
            <img controls={true} src={this.state.src} alt={this.state.name} />
          ),
          video: <video controls={true} src={this.state.src} />,
          audio: <audio controls={true} src={this.state.src} />,
          file: (
            <a href={this.state.src} download>
              Download File
            </a>
          ),
        }[this.props.type]
      : null
  }
}

export const Message = ({ user, createConvo }) => message =>
  message.sender ? (
    <li key={message.id} className={style.component}>
      <img
        onClick={e => createConvo({ user: message.sender })}
        src={message.sender.avatarURL}
        alt={message.sender.name}
      />
      <div>
        <span
          className={
            message.sender.id === user.id ||
            (message.sender.presence &&
              message.sender.presence.state === 'online')
              ? style.online
              : null
          }
        >{`${message.sender.name} | ${time(message.createdAt)}`}</span>
        <p>
          <Linkify properties={{ target: '_blank' }}>{message.text}</Linkify>
        </p>
        {message.attachment ? (
          <Attachment
            user={user}
            link={message.attachment.link}
            type={message.attachment.type}
          />
        ) : null}
      </div>
    </li>
  ) : null
