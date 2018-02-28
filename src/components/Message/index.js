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

export const Message = (
  user,
  online,
  rooms,
  setRoom,
  setRooms,
  addMessage
) => ({ id, sender, createdAt, text, attachment = {} }) => (
  <li key={id} className={style.component}>
    <img
      onClick={e => {
        const exists = rooms.find(
          x => x.name.match(sender.id) && x.name.match(user.id)
        )
        exists
          ? user
              .subscribeToRoom(exists.id, { newMessage: addMessage })
              .then(setRoom)
              .catch(console.log)
          : user
              .createRoom({
                name: user.id + sender.id,
                addUserIds: [sender.id],
                private: true,
              })
              .then(room => {
                setRooms([...rooms, room])
                user
                  .subscribeToRoom(room.id, { newMessage: addMessage })
                  .then(setRoom)
                  .catch(console.log)
              })
              .catch(console.log)
      }}
      src={sender.avatarURL}
      alt={sender.name}
    />
    <div>
      <span
        className={(sender.id === user.id || online[sender.id]) && style.online}
      >{`${sender.name} | ${time(createdAt)}`}</span>
      <p>
        <Linkify properties={{ target: '_blank' }}>{text}</Linkify>
      </p>
      <Attachment user={user} link={attachment.link} type={attachment.type} />
    </div>
  </li>
)
