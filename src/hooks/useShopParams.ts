import { useSearchParams, useNavigate} from 'react-router-dom'
import {useAppDispatch} from './hook'
import {setCatalogItem} from '../slices/catalogSlice'

export  function useShopParams(){

    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const currentPage = Number(searchParams.get('page')) || 1;
    const activeCategory = searchParams.get('category')

    const setPage = (nextPage : number)=>{  
        const params = new URLSearchParams(searchParams)
        if (nextPage === 1){
            params.delete('page')
        }else{
            params.set('page', String(nextPage))
        }

        const queryString = params.toString()  
        const path = queryString ? `/shop?${queryString}` : `/shop`     
        navigate(`${path}`, { replace: true })  
    }


    const setCategory = (category : string | null)=>{
        const params = new URLSearchParams(searchParams)
        if (category === null){
            params.delete('category')
        }else{
            params.set('category', category)
        }

        dispatch(setCatalogItem(null)); 
        params.delete('page')
        params.delete('search')
        const queryString = params.toString()  
        const path = queryString ? `/shop?${queryString}` : `/shop`     
        navigate(`${path}`, { replace: true })  
    }

    return { currentPage, setPage, activeCategory, setCategory  }; 
 
}
