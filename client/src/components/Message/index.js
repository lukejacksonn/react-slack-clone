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

export const Message = (user, online) => ({
  id,
  sender,
  createdAt,
  text,
  attachment = {},
}) => (
  <li key={id} className={style.component}>
    <img src={sender.avatarURL} alt={sender.name} />
    <div>
      <span
        className={(sender.id === user.id || online[sender.id]) && style.online}
      >{`${sender.name} | ${time(createdAt)}`}</span>
      <p>{text}</p>
      <Attachment user={user} link={attachment.link} type={attachment.type} />
    </div>
  </li>
)
