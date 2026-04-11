import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/home'
import Editorpage from './pages/editorpage'

function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/editor/:roomId' element={<Editorpage/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
