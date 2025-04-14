import React from 'react'
import Avatar from 'react-avatar';

export default function Client({username}) {
  return (
    <div className='client border-2 border-white flex justify-center align-center flex-row rounded-[15px] m-2 p-2'>
      <Avatar name={username} size={50} round="14px" />
      <span className='username mr-2 ml-2'>{username}</span>
    </div>
  )
}
