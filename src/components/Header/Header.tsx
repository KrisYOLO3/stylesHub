import style from '../Header/Header.module.css'
import CustomButton from '../CustomButton'
import { RiAccountPinCircleLine } from "react-icons/ri";
import {useMatch} from 'react-router-dom'
import { useAppSelector } from '../../hooks/hook';
import InputSearchForm from './InputSearchForm';


export default function Header() {

  const path = useMatch('/shop/*')
 
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

      {path && <InputSearchForm />}

      <CustomButton className={style.account}>
        <RiAccountPinCircleLine className={style.accountBtn}/>
        {path ? `Hello, ${userName}` : `ACCAUNT`}
      </CustomButton>
          
        
      </header>
  )
}
