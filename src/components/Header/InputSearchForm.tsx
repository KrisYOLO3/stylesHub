import { CiSearch } from "react-icons/ci"
import style from '../Header/Header.module.css'
import CustomInput from "../CustomInput"
import{useState, useRef, useEffect} from 'react'
import { useSearchParams} from "react-router-dom"
import useSearch from "../../hooks/useSearch"

export default function InputSearchForm() {

  const [searchParams] = useSearchParams()
  const {searchQuery, updateSearchQuery } = useSearch();
  const [draft, setDraft] = useState(searchQuery)

  const paramsRef = useRef(searchParams)

  useEffect(()=>{
    paramsRef.current = searchParams
  }, [searchParams]) 


  // при изменении урла синхронизируем ипут с параметром search
  useEffect(()=>{
    setDraft(searchQuery)
  }, [searchQuery])

  useEffect(()=>{

    // if (draft === paramsRef.current.get('search')) return;
    const timer = setTimeout(()=>{
    updateSearchQuery(draft)

    }, 500)
    return ()=> clearTimeout(timer)
  }, [draft, updateSearchQuery])


  

  return (
    <form className={style.searchForm} onSubmit={(e) => e.preventDefault()}>
          <CiSearch className={style.searchIcon}/>
          <CustomInput id='search' 
                      placeholder='Search' 
                      type='text' 
                      className={style.searchWrapper}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
          />
    </form>
  )
}
