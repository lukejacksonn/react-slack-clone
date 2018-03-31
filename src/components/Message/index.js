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
        .fetchAttachment({ url: this.props.link })
        .then(fetched =>{
          this.setState({ src: fetched.link, name: fetched.file.name });
          }
        ).catch(error => console.log(error));
  }
  render() {
    let paperClipIcon = (
      <div className={style['icon-paperclip']} style={{float: "left"}}>
        <div className={style["paperclip-1"]} style={{backgroundColor: "black"}}>
          <div className={style["paperclip-2"]}>
            <div className={style["paperclip-3"]} style={{backgroundColor: "black"}}>
              <div className={style["paperclip-4"]}>
              </div>
            </div>
          </div>
        </div>
      </div> );
    return this.state? {
          image: <img controls={true} src={this.state.src} alt={this.state.name} />,
          video: <video controls={true} src={this.state.src} />,
          audio: <audio controls={true} src={this.state.src} />,
          file: (<a download={this.props.text} href={this.state.src} className={style.link}>{paperClipIcon} {this.props.text}</a>)
        }[this.props.type]
      : null
  }
}

export const Message = ({ user, createConvo }) => message =>{
  console.log(message);
  return message.sender ? (
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
        {(message.attachment && message.attachment.type === 'file')?null:<p><Linkify properties={{ target: '_blank' }}>{message.text}</Linkify></p>}
        {message.attachment ? (
          <Attachment
            user={user}
            link={message.attachment.link}
            type={message.attachment.type}
            text={message.text}
          />
        ) : null}
      </div>
    </li>
  ) : null}
