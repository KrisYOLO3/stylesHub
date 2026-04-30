import style from '../Header/Header.module.css'
import CustomButton from '../CustomButton'
import { RiAccountPinCircleLine } from "react-icons/ri";
import {useLocation} from 'react-router-dom'
import CustomInput from '../CustomInput'
import { CiSearch } from "react-icons/ci"
import { useAppSelector } from '../../hooks/hook';


export default function Header() {

  const location = useLocation()
  const path = location.pathname === '/shop'
  const userName = useAppSelector(state=>state.authForm.userName)


  return (
    <header className={style.header}>
      
      <div className={style.logoSymbol}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="10" fill="#007F73" />
          <rect x="12" y="0" width="10" height="10" fill="#007F73" opacity="0.3" />
          <rect x="0" y="12" width="10" height="10" fill="#007F73" opacity="0.3" />
          <rect x="12" y="12" width="10" height="10" fill="#007F73" />
        </svg>
        <span className={style.logoName}>StyleHub</span>
      </div>

      {path && (
        <form className={style.searchForm}>
          <CiSearch className={style.searchIcon}/>
          <CustomInput id='search' placeholder='Search' type='text' className={style.searchWrapper}/>
        </form>
      )}

      <CustomButton className={style.account}>
        <RiAccountPinCircleLine className={style.accountBtn}/>
        {path ? `Hello, ${userName}` : `ACCAUNT`}
      </CustomButton>
          
        
      </header>
  )
}
