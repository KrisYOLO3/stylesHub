import { useSearchParams} from 'react-router-dom'
import {useAppDispatch} from './hook'
import {setActiveCategory, setCatalogItem} from '../slices/catalogSlice'

export  function useShopParams(){

    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1;
    const activeCategory = searchParams.get('category')

    const setPage = (nextPage : number)=>{  
        const params = new URLSearchParams(searchParams)
        if (nextPage === 1){
            params.delete('page')
        }else{
            params.set('page', String(nextPage))
        }

        if(activeCategory){
            params.delete('page')
        }
       
        setSearchParams(params)
    }


    const setCategory = (category : string | null)=>{
        const params = new URLSearchParams(searchParams)
        if (category === null){
            params.delete('category')
            dispatch(setCatalogItem(null)); 
        }else{
            params.set('category', category)
        }
        params.delete('page')
        setSearchParams(params)
        dispatch(setActiveCategory(category))  
        
    }

    return { currentPage, setPage, activeCategory, setCategory  };
}

export const usePagination = useShopParams;
