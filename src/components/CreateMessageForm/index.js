import React, { Component } from 'react'
import style from './index.module.css'
import { FileInput } from '../FileInput'
import EmojiPicker from '../EmojiPicker'

export class CreateMessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      cursorPostion: 0
    }
  }

  render() {
    const { runCommand, toggleEmojiPicker } = this.props.actions
    const { user, room, message, isPickerShowing } = this.props.state

    return room.id ? (
      <form
        className={style.component}
        onSubmit={e => {
          e.preventDefault()
          const message = this.state.message
          message.startsWith('/')
            ? runCommand(message.slice(1))
            : message.length > 0 &&
              user.sendMessage({
                text: message,
                roomId: room.id
              })

          this.setState({
            message: ''
          })
        }}
      >
        <input
          ref={input => {
            this.messageInput = input
          }}
          placeholder="Type a Message.."
          onInput={this.handleInput.bind(this)}
          onClick={this.updateCursorPostion.bind(this)}
          onKeyUp={e => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              this.updateCursorPostion(e)
            }
          }}
          value={this.state.message}
        />
        <EmojiPicker
          state={{ isPickerShowing }}
          actions={{
            toggleEmojiPicker,
            handleEmojiSelection: this.addEmojiToMessage.bind(this)
          }}
        />
        <FileInput state={{ user, room, message }} />
        <button type="submit">
          <svg>
            <use xlinkHref="index.svg#send" />
          </svg>
        </button>
      </form>
    ) : null
  }

  handleInput(e) {
    const { user, room } = this.props.state
    user.isTypingIn({ roomId: room.id })

    this.setState({
      message: e.target.value,
      cursorPostion: e.target.selectionStart
    })
  }

  updateCursorPostion(e) {
    this.setState({
      cursorPostion: e.target.selectionStart
    })
  }

  addEmojiToMessage(emoji) {
    let message = this.state.message
    let newMessage = ''
    let cursor = this.state.cursorPostion
    let beforeCursorStr = ''
    let afterCursorStr = ''

    beforeCursorStr = message.substring(0, cursor)
    afterCursorStr = message.substr(cursor)
    newMessage = `${beforeCursorStr}${emoji}${afterCursorStr}`

    // reset the cursor to be after the emoji
    this.messageInput.setSelectionRange(
      this.state.cursorPostion + 2,
      this.state.cursorPostion + 2,
      0
    )

    this.setState({
      cursorPostion: this.state.cursorPostion + 2,
      message: newMessage
    })
  }
}
