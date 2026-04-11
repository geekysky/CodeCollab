import React from 'react'

function Home() {
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src='/code-sync.png' alt='code-sync-logo'></img>
        <h4 className='mainLabel'>Paste Invitation Room ID</h4>
        <div className='inputGroup'>
          <input type="text" className='inputBox' placeholder='Room ID' />
          <input type="text" className='inputBox' placeholder='Username' />
          <button className='btn joinBtn'>Join</button>

          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a href="" className='createNewBtn'>New Room</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home