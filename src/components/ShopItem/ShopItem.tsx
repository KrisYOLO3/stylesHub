import style from './ShopItem.module.css'



export default function ShopItem(){
    return(
        <div className={style.shopItem}>

            <div className={style.shopItemContent}>
                <div className={style.shopItemImg}>
                    <img/>
                </div>
                <div className={style.shopItemInfo}>
                    <h4>title</h4>
                    <p>price</p>
                    <p>description</p>
                    <div className={style.shopItemSettings}>
                        <select></select>
                        <div className={style.shopItemCountI}></div>
                    </div>
                </div>
            </div>
            
            <div className={style.relatedItems}>
            </div>
        </div>
    )
    
}