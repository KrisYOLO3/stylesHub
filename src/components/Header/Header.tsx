import style from '../Header/Header.module.css'
import CustomButton from '../CustomButton'
import { RiAccountPinCircleLine } from "react-icons/ri";


export default function Header() {
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

      <CustomButton className={style.account}>
        <RiAccountPinCircleLine className={style.accountBtn}/>
        ACCOUNT
      </CustomButton>
          
        
      </header>
  )
}
