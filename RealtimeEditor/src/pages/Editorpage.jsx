import React, { useState, useRef, useEffect } from 'react'
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import ACTIONS from '../../Actions'
import { useLocation } from 'react-router-dom';

function Editorpage() {
  const socketRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });
    };
    init();

    return () => {
      // Cleanup the socket connection on component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const [clients, setClients] = useState([
    { socketId: 1, username: 'Debjyoti' },
    { socketId: 2, username: 'Advit Katti' }
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

      {/* Editor on the right hand side */}
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default Editorpage