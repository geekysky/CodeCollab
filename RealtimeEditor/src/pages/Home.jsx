import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function Home() {

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const createnewRoom = async (e) => {
    e.preventDefault();
    const id = uuidv4();

    setRoomId(id);
    console.log(id);
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src='/code-sync.png' alt='code-sync-logo'></img>
        <h4 className='mainLabel'>Paste Invitation Room ID</h4>
        <div className='inputGroup'>
          <input type="text" className='inputBox' placeholder='Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
          <input type="text" className='inputBox' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <button className='btn joinBtn'>Join</button>

          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a onClick={createnewRoom} href="" className='createNewBtn'>New Room</a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with ❤️&nbsp; by <a href="https://github.com/geekysky">Debjyoti</a></h4>
      </footer>
    </div>
  )
}

export default Home