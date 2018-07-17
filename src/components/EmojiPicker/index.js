import EmojiPicker from 'emoji-picker-react'
import style from './index.module.css'

import React from 'react'
import JSEMOJI from 'emoji-js'

let jsemoji = new JSEMOJI()

const Picker = ({
  state: { isPickerShowing },
  actions: { toggleEmojiPicker, handleEmojiSelection },
}) => (
  <div
    onClick={e => {
      e.nativeEvent.stopImmediatePropagation()
    }}
    className={style.component}
  >
    <div
      className={`${style.overlayWrapper} ${isPickerShowing ? style.show : ''}`}
    >
      <EmojiPicker
        onEmojiClick={(emojiCode, emojiObj, e) => {
          e.nativeEvent.stopImmediatePropagation()
          const emoji = jsemoji.replace_colons(`:${emojiObj.name}:`)
          handleEmojiSelection(emoji)
          toggleEmojiPicker(!isPickerShowing)
        }}
      />
    </div>
    <input
      type={'button'}
      className={style.button}
      onClick={e => {
        e.preventDefault()
        toggleEmojiPicker(!isPickerShowing)
      }}
    />
  </div>
)

export default Picker
