import './App.css'
import './styles/global.css'
import {Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import {Provider} from 'react-redux'
import Shop from './pages/Shop/Shop'
import store from './store/store'

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/Shop' element = {<Shop/>}/>
      </Routes> 
    </Provider>
  )
}

export default App
