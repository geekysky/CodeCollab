import React, { useState } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
function Editorpage() {

  const [clients, setClients] = useState([
    { socketId: 1, username: 'Debjyoti' },
    { socketId: 2, username: 'John Doe' }
  ]);

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img className='logoImage' src="/code-sync.png" alt="code-sync-logo" />
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            {
              clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))
            }
          </div>
        </div>
        <button className='btn copyBtn'>Copy Room ID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>

      //Editor on the right hand side
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default Editorpage