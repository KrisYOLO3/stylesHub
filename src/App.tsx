import './App.css'
import './styles/global.css'
import {Routes, Route } from "react-router-dom";
import Landing from './pages/Landing/Landing';

import Shop from './pages/Shop/Shop'

import CatalogItemDetails from './components/CatalogItemDetails/CatalogItemDetails'
import ShopLayout from './layouts/ShopLayout/ShopLayout';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {

  return (

    <Routes>
      <Route path='/' element = {<MainLayout/>}>
          <Route index element = {<Landing/>}/>
          <Route path ='shop' element = {<ShopLayout/>}>
            <Route index element = {<Shop/>}/>
            <Route path=':id' element = {<CatalogItemDetails/>}/>
          </Route>
      </Route>
    </Routes> 

  )
}

export default App
