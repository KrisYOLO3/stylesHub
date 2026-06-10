import style from './EmptyCart.module.css'
import { FaOpencart } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";
import CustomButton from '../CustomButton';
import {useNavigate} from 'react-router-dom'

export default function EmptyCart() {


    const navigate = useNavigate()


  return (
    <div className={style.emptyCart}>
        <div className = {style.emptyCartWrapper}>
            <div className={style.emptyCartInfo}>
                <div className={style.emptyCartIcons}>
                    <FaOpencart className={style.cartIcon}/>
                    <GiShoppingCart className={style.cartMainIcon}/>
                </div>
                <div className={style.emptyCartText}>
                    <h1>Your shopping cart is empty</h1>
                    <p>Start shopping and enjoy exclusive discounts and deals</p> 
                </div>   
            </div>
            <div className={style.emptyCartBtns}>
                <CustomButton className={`${style.startShoppingBtn}`} onClick={()=>navigate(`/shop`)}>Start Shoping</CustomButton>  
            </div>
        </div>    
    </div>
  )
}
