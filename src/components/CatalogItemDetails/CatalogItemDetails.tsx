import style from './CatalogItemDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useParams, Link } from 'react-router-dom';
import { fetchProductById} from '../../slices/catalogSlice';
import { useEffect } from 'react';
import CustomButton from '../CustomButton';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { addToCart, cartState} from '../../slices/cartSlice'
import {shopState} from '../../slices/catalogSlice'
import type {CartItemParams} from '../../types/types'


export default function CatalogItemDetails(){

    const { status, error, catalogItem} = useAppSelector(shopState)
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const {items} = useAppSelector(cartState)
    const existingItemInCart = items.some(item => item.id === catalogItem?.id)

    useEffect(()=>{
        if(id){
            dispatch(fetchProductById(Number(id)))  
        }       
    }, [id, dispatch])

    if(status === 'loading') return <p>Trying loading product...</p>
    if (status === 'failed') return <p>{error}</p>
    if (!catalogItem) return <p>Product not found</p> 

    const handleAddToCartItemDetails= ()=>{
        if (!catalogItem) return

        const cartItem: CartItemParams= {
            id: catalogItem.id,
            image: catalogItem.thumbnail,
            title: catalogItem.title,
            price: catalogItem.price,
            quantity: 1,
        }
        dispatch(addToCart(cartItem))
    }

    const capitalizedCategory = catalogItem.category[0].toUpperCase() + catalogItem.category.slice(1)

    return(
        <div className={style.catalogItemDetails}>
            <h1>Single Product View</h1> 
            <div className={style.catalogItemDetailsWrapper}>   
                    <Link to={catalogItem?.category ? `/shop/?category=${catalogItem.category}` : `/shop`} className={style.bactToAll}>
                        <FaAngleDoubleLeft className={style.bactToAllIcon}/>
                        {`Back to ${capitalizedCategory}`}
                    </Link>

                    <div className={style.catalogItemDetailsContent}> 
                        <div className={style.catalogItemDetailsImg}>
                            <img src={catalogItem?.images[0]} alt={catalogItem?.title} />
                        </div>
                        <div className={style.catalogItemDetailsInfo}>
                            <h3>{catalogItem?.title}</h3>
                            <p className={style.catalogItemDetailsInfoPrice}><strong>${catalogItem?.price}</strong></p>
                            <p>{catalogItem?.description}</p>
                            <CustomButton className={style.catalogItemDetailsAddBtn} 
                                            onClick={handleAddToCartItemDetails}
                                            disabled = {existingItemInCart}>
                                            {existingItemInCart ? 'Added to cart' : '+ Add to cart'}
                            </CustomButton>
                        </div>
                    </div>

                    <div className={style.relatedItems}> 
                    </div>
            </div>
        </div>
    )    
}