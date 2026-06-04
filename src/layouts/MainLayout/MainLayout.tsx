import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import style from '../MainLayout/MainLayout.module.css'

export default function MainLayout() {


  return (
    <div className={style.mainLayout}>
      <Header/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
