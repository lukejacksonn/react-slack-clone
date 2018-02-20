import { h } from 'hyperapp'
import style from './index.css'

export const UserHeader = ({
  name = '',
  avatarURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
}) => (
  <header class={style.component}>
    <img src={avatarURL} />
    <h3>{name}</h3>
  </header>
)
