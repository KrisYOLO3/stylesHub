import './App.css'
import './styles/global.css'
import {Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Shop from './pages/Shop/Shop'

function App() {

  return (
    <Routes>
      <Route path='/' element = {<Landing/>}/>
      <Route path='/Shop' element = {<Shop/>}/>
    </Routes> 
  )
}

export default App
