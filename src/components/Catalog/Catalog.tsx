import style from './Catalog.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'
import {fetchProducts} from '../../slices/catalogSlice'
import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import CustomButton from '../CustomButton'
import Pagination from '../Pagination/Pagination'
import {usePagination} from '../../hooks/useShopParams'



export default function Catalog(){

  
    const {activeCategory, currentPage} = usePagination()
    const LIMIT = 20;
    

    const dicpatch = useAppDispatch()
    const {products, status, error, total} = useAppSelector(state=> state.catalog)

    const totalPages = total ? Math.ceil(total / LIMIT) : 1;
    const showPagination = totalPages > 1;


    useEffect(()=>{
        const skip = (currentPage - 1) * LIMIT 
        dicpatch(fetchProducts({
                    activeCategory,
                    skip,
                    limit: LIMIT,
             }))
    }, 
    
    [activeCategory, dicpatch, currentPage  ])

    if(status === 'loading') return <p>Trying loading products...</p>
    if (status === 'failed') return <p>{error}</p>

    
    return(
        <div className = {style.catalog}>
            <h1>Product Catalog</h1>
            <ul className={style.catalogList}>
                {products?.map((product)=>
                    <li key={product.id} className={style.catalogListItem}>
                        <Link to={`${product.id}`}>
                            <div className={style.catalogItemWrapper}>
                                <div className={style.catalogItemContent}>
                                    <div className={style.catalogItemImg}>
                                        <img src={product.thumbnail} alt="product" />
                                    </div>
                                    <div className={style.catalogItemNotes}>
                                        <p>{product.title}</p>                                       
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                                <CustomButton className={style.addBtn}>+ Add to cart</CustomButton> 
                            </div>
                        </Link>
                    </li>
                )}
            </ul>
            {showPagination && <Pagination  totalPages={totalPages}/>}
        </div>
    )
}