import './App.css'
import './styles/global.css'
import {Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';
import {Provider} from 'react-redux'
import Shop from './pages/Shop/Shop'
import store from './store/store'
import ShopItem from './components/ShopItem/ShopItem'

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/shop' element = {<Shop/>}/>
        <Route path='/shop/:id' element = {<ShopItem/>}/>
      </Routes> 
    </Provider>
  )
}

export default App
