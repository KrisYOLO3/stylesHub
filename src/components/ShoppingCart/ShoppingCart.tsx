import style from './ShoppingCart.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hook'
import {cartState } from '../../slices/cartSlice'
import {Link, useNavigate} from 'react-router-dom' 
import {addQuantiy, distractQuantiy, removeItemFromCart} from '../../slices/cartSlice'
import { GoTrash } from "react-icons/go";
import CustomButton from '../CustomButton'
import EmptyCart from '../EmptyCart/EmptyCart'


export default function ShoppingCart(){
    const {items, totalCount, totalPrice} = useAppSelector(cartState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    if(items.length ===0){
        return <EmptyCart/>
    }

    const handleRemoveItem = (id:number)=>{
        dispatch(removeItemFromCart(id))
    }

    return(
        <div className={style.shoppingCart}>
            <div className={style.shoppingCartWrapper}>
                <h2 className={style.shoppingCartTitle}>Your Shopping Cart({totalCount})</h2>
                <div className = {style.shoppingCartContent}>
                    <ul className={style.shoppingCartListItems}>
                        {items.map((item)=>
                            <li className={style.shoppingCartItem}>
                                <Link to='/cart' className={style.cartItemInfo}>
                                    <div className={style.cartItemPhoto}>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <h4>{item.title}</h4>
                                </Link>
                                <p>{`Price: $${item.price}`}</p> 
                                <div className={style.cartItemQuantityControl}>
                                    <button className = {`btn ${style.distractQuantityBtn}`} onClick={() => dispatch(distractQuantiy(item.id))} disabled={item.quantity===0}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className = {`btn ${style.addQuantityBtn}`} onClick={() => dispatch(addQuantiy(item.id))}>+</button> 
                                </div>
                                <div className={style.cartItemActions}>
                                    <div className={style.cartItemRemoveBtn}>
                                        <span>Remove</span>
                                        <GoTrash onClick={()=>handleRemoveItem(item.id)} className={style.cartItemRemoveIcon}/>
                                    </div>
                                    <p>${(+item.price * item.quantity).toFixed(2)}</p>                           
                                </div>
                            </li>)} 
                    </ul>
                    <div className={style.cartSummary}> 
                        <h3>Order summary</h3>
                        <p className={style.subtotal}>Subtotal ({`${totalCount}`} items)</p>
                        <p><strong>Total $<span>{`${totalPrice.toFixed(2)}`}</span></strong></p>
                        <CustomButton className={`btn ${style.checkoutBtn}`} onClick={()=>navigate(`/`)}>Proceed to checkout</CustomButton>
                    </div>   
                </div>  
            </div>
        </div>
    )
}