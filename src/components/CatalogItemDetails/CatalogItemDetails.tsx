import style from './CatalogItemDetails.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import { useParams } from 'react-router-dom';
import { fetchProductById} from '../../slices/catalogSlice';
import { useEffect } from 'react';
import CustomButton from '../CustomButton';
import {Link, useSearchParams} from 'react-router-dom'


export default function CatalogItemDetails(){

    const { status, error, catalogItem} = useAppSelector(state=> state.catalog)
    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('category')

    const { id } = useParams();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        if(id){
            dispatch(fetchProductById(Number(id)))  
        }       
    }, [id, dispatch])

    if(status === 'loading') return <p>Trying loading product...</p>
    if (status === 'failed') return <p>{error}</p>
    if (!catalogItem) return <p>Product not found</p> 
    
    const textBack = activeCategory ? `Back to ${activeCategory}` : `Back to All Products` 
    const backLink = activeCategory ? `/shop?category=${activeCategory}` : '/shop' 

    return(
        <div className={style.catalogItemDetails}>
            <h1>Single Product View</h1> 

            <div className={style.catalogItemDetailsWrapper}>

                <Link to={backLink}>{textBack}</Link>

                <div className={style.catalogItemDetailsContent}>
                    <div className={style.catalogItemDetailsImg}>
                        <img src={catalogItem?.images[0]} alt={catalogItem?.title} />
                    </div>
                    <div className={style.catalogItemDetailsInfo}>
                        <h3>{catalogItem?.title}</h3>
                        <p className={style.catalogItemDetailsInfoPrice}><strong>${catalogItem?.price}</strong></p>
                        <p>{catalogItem?.description}</p>
                        <CustomButton className={style.catalogItemDetailsInfoPriceAddBtn}>+ Add to cart</CustomButton>
                    </div>
                </div>

                <div className={style.relatedItems}></div>
            </div>

        </div>
    )
    
}