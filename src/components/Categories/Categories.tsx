import style from './Categories.module.css'
import { useSearchParams} from 'react-router-dom'
import {fetchCategories, allCategories} from '../../slices/catalogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hook'   
import { useEffect } from 'react'


export default function Categories(){

    const [searchParams, setSearchParams ] = useSearchParams()
    const dispatch = useAppDispatch()
    const categories = useAppSelector(allCategories)
    const popularCategories = ['beauty', 'fragrances', 'furniture', 'laptops'];
    const filteredCategories = categories.filter((category)=>popularCategories.includes(category.slug) )


    useEffect(()=>{
        if (categories.length === 0){
            dispatch(fetchCategories())
        }

    }, [categories.length, dispatch])

    function updateSearchParams(key, value){
        const params = new URLSearchParams(searchParams)
        if(value ===null){
            params.delete(key)
        }else{
            params.set(key,value )
        }
        setSearchParams(params.toString());
    }

    const activeCategory = searchParams.get('category')


    return(
        <div className={style.categories}>
            <h2>Categories</h2>
            <ul className={style.categoriesList}>
                {filteredCategories?.map((category)=>
                    <li key={category.slug} 
                    onClick={()=>updateSearchParams('category',category.slug)}
                    className = {`${style.categoryItem} ${activeCategory === category.slug ? style.active : ''}`}>{category.slug}</li>)}
            </ul>
        </div>
    )
}