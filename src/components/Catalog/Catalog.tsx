import style from './Catalog.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import {fetchProducts} from '../../slices/catalogSlice'
import {useEffect} from 'react'
import { Link} from 'react-router-dom'
import CustomButton from '../CustomButton'
import Pagination from '../Pagination/Pagination'
import {useShopParams} from '../../hooks/useShopParams' 
import { useSearch } from '../../hooks/useSearch'
import type { CartItemParams, ProductItem } from '../../types/types'
import { addToCart, cartState } from '../../slices/cartSlice'
import { shopState } from '../../slices/catalogSlice'
import {addQuantiy, distractQuantiy} from '../../slices/cartSlice'



export default function Catalog(){

  
    const {activeCategory, currentPage} = useShopParams()
    const LIMIT = 20;
    const {searchQuery: query} =  useSearch();

    const {items} = useAppSelector(cartState )
    const dispatch = useAppDispatch()
    const {products, status, error, total} = useAppSelector(shopState)

    const totalPages = total ? Math.ceil(total / LIMIT) : 1;
    const showPagination = totalPages > 1;


    useEffect(()=>{
        const skip = (currentPage - 1) * LIMIT 
        dispatch(fetchProducts({
                    activeCategory,
                    skip,
                    limit: LIMIT,
                    search: query || null
             }))
    }, 
    [activeCategory, dispatch, currentPage, query])

    if(status === 'loading') return <p>Trying loading products...</p>
    if (status === 'failed') return <p>{error}</p>

    const handleAddToCart= (product:ProductItem)=>{
        const itemForCart : CartItemParams = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            quantity: 1,
        }
       dispatch(addToCart(itemForCart))
    }

    
    return(
        <div className = {style.catalog}>
            <h1>Product Catalog</h1>
            <ul className={style.catalogList}>
                {products?.map((product)=>{
                    const existingItem = items.find((item)=>item.id === product.id)
                    return  <li key={product.id} className={style.catalogListItem}>
                                <Link to={`${product.id}`} className={style.catalogItemLink}>
                                    <div className={style.catalogItemWrapper}>
                                        <div className={style.catalogItemContent}>
                                            <div className={style.catalogItemImg}>
                                                <img src={product.thumbnail} alt="product" />
                                            </div>
                                            <div className={style.catalogItemNotes}>
                                                <p className={style.title}><b>{product.title}</b></p>                                       
                                                <p>${product.price}</p>
                                            </div>
                                        </div>                       
                                    </div>
                                </Link>
                                {existingItem && existingItem?.quantity >0
                                    ?(<div className={`${style.inCartBtns}` }>
                                        <CustomButton className = {`${style.distractQuantityBtn}`} onClick={() => dispatch(distractQuantiy(existingItem.id))} disabled={existingItem.quantity===0}>-</CustomButton>
                                        <span className={`${style.inCartText}`}>{`(${existingItem.quantity}) In Cart`}</span>
                                        <CustomButton className = {`btn ${style.addQuantityBtn}`} onClick={() => dispatch(addQuantiy(existingItem.id))}>+</CustomButton> 
                                    </div>) 
                                    : (<CustomButton className={`${style.addBtn}`} onClick={()=> handleAddToCart(product)}>
                                        Add to cart
                                    </CustomButton>)}         
                            </li>}
                )}
            </ul>
            {showPagination && <Pagination  totalPages={totalPages}/>}
        </div>
    )
}


