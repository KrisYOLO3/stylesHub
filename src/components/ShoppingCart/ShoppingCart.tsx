import style from './ShoppingCart.module.css'
import { useAppSelector } from '../../hooks/hook'


export default function ShoppingCart(){
    const cartItems = useAppSelector(cartState=> cartState.items)
    return(
        <div className={style.shoppingCartWrapper}>
            <h2>Your Shopping Cart</h2>
            <div className={style.shoppingCartContent}>
                <p>{`Cart (${3}items)`}</p>

            </div>
        </div>
    )
}