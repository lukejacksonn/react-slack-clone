import { h } from 'hyperapp'
export const UserHeader = ({
  name = '',
  avatarURL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
}) => (
  <header>
    <img src={avatarURL} />
    <h3>{name}</h3>
  </header>
)
