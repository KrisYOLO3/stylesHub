import style from './ShoppingCart.module.css'


export default function ShoppingCart(){
    return(
        <div className={style.shoppingCartWrapper}>
            <h2>Your Shopping Cart</h2>
            <div className={style.shoppingCartContent}>
                <p>{`Cart (${3}items)`}</p>

            </div>
        </div>
    )
}