import style from '../Header/Header.module.css'
import CustomButton from '../CustomButton'
import { RiAccountPinCircleLine } from "react-icons/ri";
import { useAppSelector } from '../../hooks/hook';
import InputSearchForm from './InputSearchForm';
import { BsCart4 } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import {cartState} from '../../slices/cartSlice'
import {authFormState} from '../../slices/formSlice'


export default function Header() {
  const {userName, isAuthenticated} = useAppSelector(authFormState)
  const navigate = useNavigate();
  const {totalCount} = useAppSelector(cartState)
  const location = useLocation();
  const isShopPage = location.pathname.startsWith('/shop');
  const isCartPage = location.pathname.startsWith('/cart');
  

  const handleCartClick = () => {
    navigate('/cart'); 
  };

  return (
    <header className={style.header}>
      
      <div className={style.logoSymbol}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="10" fill="#007F73" />
          <rect x="12" y="0" width="10" height="10" fill="#007F73" opacity="0.3" />
          <rect x="0" y="12" width="10" height="10" fill="#007F73" opacity="0.3" />
          <rect x="12" y="12" width="10" height="10" fill="#007F73" />
        </svg>
        <span className={style.logoName} onClick={()=>navigate(`/`)}>StyleHub</span>
      </div>

      {(isShopPage || isCartPage) && <InputSearchForm />}

      <div className={style.userActions}>
        {isShopPage && (
          <div className={style.cartIconWrapper}>
            <BsCart4 className = {style.cartIcon} onClick={handleCartClick}/>
            {totalCount >0 && <div className={style.totalCountWrapper}>
                                <span className={style.totalCount}>{totalCount}</span>
                              </div>}
          </div>
        )}
        <CustomButton className={style.account}>
          <RiAccountPinCircleLine className={style.accountBtn}/>
          <span className={style.accountIcon}>{!isAuthenticated ? 'ACCOUNT' : userName}</span>
        </CustomButton>
      </div>  
    </header>
  )
}
