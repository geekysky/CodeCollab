import React, { useState, useRef, useEffect } from 'react'
import toast from 'react-hot-toast';
import Client from '../components/Client'
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import ACTIONS from '../../Actions'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

function Editorpage() {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const { roomId } = useParams();

  const [clients, setClients] = useState([]);


  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();

      socketRef.current.on('connect_error', (err) => {
        handleErrors(err);
      });

      socketRef.current.on('connect_failed', () => {
        handleErrors();
      });

      function handleErrors(e) {
        console.log(e);
        toast.error('Socket connection failed, please try again later');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, (payload) => {
        const { clients, username, socketId } = payload;
        if (username !== location.state?.username) {
          //broadcast to all other clients that a new user has joined
          toast.success(`${username} joined the room`);
          console.log(`${username} joined the room`);
        }

        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });

      });

      // Listening for disconnected event...
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);

        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        })
      });


    };
    init();

    return () => {
      // Cleanup the socket connection on component unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);

      }
    };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied to clipboard');
    } catch (error) {
      console.log(error);
      toast.error('Failed to copy room ID');
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }

  if (!location.state) {
    return <Navigate to="/" />
  }

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
        <button className='btn copyBtn' onClick={copyRoomId}>Copy Room ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
      </div>

      {/* Editor on the right hand side */}
      <div className='editorWrap'>
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => {
          codeRef.current = code;
        }} />
      </div>
    </div>
  )
}

export default Editorpage