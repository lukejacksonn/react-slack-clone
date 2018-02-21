import React from 'react';
import style from './index.module.css'

console.log('STYLE', style);

export const UserHeader = ({ state }) => (
  <header className={style.component}>
    <img src={state.user.avatarURL || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} />
    <h3>{state.user.name || ''}</h3>
  </header>
)
