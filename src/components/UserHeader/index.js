import React from 'react'
import style from './index.module.css'

const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const UserHeader = ({ state: { user } }) => (
  <header className={style.component}>
    <img src={user.avatarURL || placeholder} alt={user.name} />
    <h3>{user.name}</h3>
  </header>
)
