import style from './ShoppingCart.module.css'
import { useAppSelector, useAppDispatch } from '../../hooks/hook'
import {cartState } from '../../slices/cartSlice'
import {Link} from 'react-router-dom' 
import {addQuantiy, distractQuantiy} from '../../slices/cartSlice'


export default function ShoppingCart(){
    const {items, totalCount, totalPrice} = useAppSelector(cartState)
    const dispatch = useAppDispatch()


    return(
        <div className={style.shoppingCartWrapper}>
            <h2>Your Shopping Cart</h2>
            <ul className={style.shoppingCartContent}>
                <h4>{`Cart ${totalCount} items`}</h4> 
                {items.map((item)=>
                    <li>
                    <Link to='/cart'>
                        <div className={style.cartItemPhoto}>
                            <img src={item.image} alt={item.title} />
                        </div>
                        <div>
                            <h4>{item.title}</h4>
                            <p>{`Price: $${item.price}`}</p> 
                        </div>
                    </Link>
                    <div className={style.cartItemQuantityControl}>
                        <button className = {style.distractQuantityBtn} onClick={() => dispatch(distractQuantiy(item.id))} disabled={item.quantity===0}>-</button>
                        <span>{item.quantity}</span>
                        <button className = {style.addQuantityBtn} onClick={() => dispatch(addQuantiy(item.id))}>+</button> 
                    </div>
                </li>
                )}
            <div className={style.cartTotal}> 
                <p>Your Total</p>
                <span>{`${totalPrice.toFixed(2)}`}</span> 
            </div>    
            </ul>
        </div>
    )
}