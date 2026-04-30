import style from './Categories.module.css'
import { MdKeyboardArrowRight } from "react-icons/md";
import {fetchCategories, shopState} from '../../slices/catalogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'   
import { useEffect } from 'react'
import CustomButton from '../CustomButton'
import {useShopParams} from '../../hooks/useShopParams'

export default function Categories(){

    
    const dispatch = useAppDispatch()
    
    const {categories, catalogItem} = useAppSelector(shopState)
    const popularCategories = ['beauty', 'fragrances', 'furniture', 'laptops'];
    const filteredCategories = categories.filter((category)=>popularCategories.includes(category.slug) )


    useEffect(()=>{
        if (categories.length === 0){
            dispatch(fetchCategories())
        }
    }, [categories.length, dispatch])


    const {activeCategory, setCategory} = useShopParams()

    const highlightActiveCategory = catalogItem ? catalogItem.category : activeCategory


    return(
        <div className={style.categories}>
             <div className={style.backBtnWrapper}>
                <CustomButton onClick={() => setCategory(null)} className={`${activeCategory ? style.backBtn : style.hidden}`}>
                    to All Products 
                    <MdKeyboardArrowRight className={style.backBtnArrow}/>
                </CustomButton>
            </div>
            <h2>Categories</h2>
            <ul className={style.categoriesList}>
                {filteredCategories?.map((category)=>
                    <li key={category.slug} 
                    onClick={()=>setCategory(category.slug)}
                    className = {`${style.categoryItem} ${highlightActiveCategory === category.slug ? style.active : ''}`}>{category.slug}</li>)}
            </ul>
        </div>
    )
}