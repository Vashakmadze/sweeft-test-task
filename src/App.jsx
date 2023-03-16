import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './pages/User'

function App() {

  return (
    <BrowserRouter>
      <div className="App w-[80%] m-auto">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/user/:id' element={<User />}/>
          <Route path='*' element={<Home />}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
