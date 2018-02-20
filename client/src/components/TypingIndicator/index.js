import { h } from 'hyperapp'
import style from './index.css'

export const TypingIndicator = ({ typing = [] }) => (
  <div class={style.component}>
    {typing.length > 0 && `${typing.slice(0, 2).join(' and ')} is typing`}
  </div>
)
