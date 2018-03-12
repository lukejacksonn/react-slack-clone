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
    this.props.link &&
      this.props.user
        .fetchAttachment(this.props.link)
        .then(fetched =>
          this.setState({ src: fetched.link, name: fetched.file.name })
        )
  }
  render() {
    return this.state
      ? {
          image: (
            <img controls={true} src={this.state.src} alt={this.state.name} />
          ),
          video: <video controls={true} src={this.state.src} />,
          audio: <audio controls={true} src={this.state.src} />,
        }[this.props.type]
      : null
  }
}

export const Message = ({ user, online, createConvo }) => ({
  id,
  sender,
  createdAt,
  text,
  attachment = {},
}) =>
  sender ? (
    <li key={id} className={style.component}>
      <img
        onClick={e => createConvo({ user: sender })}
        src={sender.avatarURL}
        alt={sender.name}
      />
      <div>
        <span
          className={
            sender.id === user.id || online[sender.id] ? style.online : null
          }
        >{`${sender.name} | ${time(createdAt)}`}</span>
        <p>
          <Linkify properties={{ target: '_blank' }}>{text}</Linkify>
        </p>
        <Attachment user={user} link={attachment.link} type={attachment.type} />
      </div>
    </li>
  ) : null
