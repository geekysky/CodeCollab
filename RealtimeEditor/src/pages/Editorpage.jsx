import React from 'react'

function Editorpage() {

  const [clients, setClients] = useState([]);

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <div className='logo'>
            <img className='logoImage' src="/code-sync.png" alt="code-sync-logo" />
          </div>
          <h3>Connected</h3>
          <div className='clientsList'>
            <div className='client'>
              <span className='userName'>Debjyoti</span>
            </div>
          </div>
        </div>
      </div>

      <div className='editorWrap'>Editor goes here...</div>
    </div>
  )
}

export default Editorpage