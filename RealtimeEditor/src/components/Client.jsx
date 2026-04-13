import React from 'react'
import Avatar from 'react-avatar';

function Client({ username }) {
    return (
        <div className='client'>
            <Avatar name={username} size={50} round="14px" />
            <br />
            <span className='userName'>{username}</span>
            <br />
        </div>
    )
}

export default Client