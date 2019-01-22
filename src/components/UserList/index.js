import React from 'react'
import style from './index.module.css'

export const UserList = ({ room, current, createConvo, removeUser }) => (
	<div>
	  <button onClick={e => removeUser(room)}>
		  <span>Leave Room</span>
	  </button>
	  <ul className={style.component}>
		{room.users.map(user => (
		  <li
			key={user.id}
			className={user.presence.state === 'online' ? style.online : null}
			onClick={e => createConvo({ user })}
			style={{ order: user.presence.state === 'online' && -1 }}
		  >
			<img src={user.avatarURL} alt={user.name} />
			<p>{user.name}</p>
		  </li>
		))}
	  </ul>
  </div>
)
