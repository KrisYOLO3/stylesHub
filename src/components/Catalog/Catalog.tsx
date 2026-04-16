import style from './Catalog.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import {fetchProducts} from '../../slices/catalogSlice'
import {useEffect} from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import CustomButton from '../CustomButton'
import {allProducts} from '../../slices/catalogSlice'


export default function Catalog(){

    const [searchParams] = useSearchParams()
    const activeCategory = searchParams.get('category')
    const dicpatch = useAppDispatch()
    const products = useAppSelector(allProducts)
    const status = useAppSelector(state=> state.catalog.status)
    const error = useAppSelector(state=> state.catalog.error)


    useEffect(()=>{
        dicpatch(fetchProducts(activeCategory))
    }, 
    
    [activeCategory, dicpatch ])

    if(status === 'loading') return <p>Trying loading products...</p>
    if (status === 'failed') return <p>{error}</p>


    return(
        <div className = {style.catalog}>
            <h1>Product Catalog</h1>
            <ul>
                {products?.map((product)=>
                    <li key={product.id}>
                        <Link>
                            <div className={style.catalogItem}>
                                <div className={style.catalogItem}>
                                    <div className={style.catalogItemImg}>
                                        <img src={product.thumbnail} alt="product" />
                                    </div>
                                    <div className={style.catalogItemNotes}>
                                        <p>{product.title}</p>
                                        <p>{product.brand}</p>
                                        <p>{product.price}</p>
                                    </div>
                                </div>
                                <CustomButton>+ Add to cart</CustomButton> 
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}