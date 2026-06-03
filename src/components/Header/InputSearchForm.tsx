import { CiSearch } from "react-icons/ci"
import style from '../Header/Header.module.css'
import CustomInput from "../CustomInput"
import{useState, useEffect} from 'react'
import { useNavigate, useLocation} from "react-router-dom"
import {useSearch} from "../../hooks/useSearch"

export default function InputSearchForm() {

  const {searchQuery, updateSearchQuery } = useSearch();
  const [draft, setDraft] = useState(searchQuery)
  const navigate = useNavigate()
  const location = useLocation()


  //  синхронизируем урл и инпут
  useEffect(()=>{
    setDraft(searchQuery)
  }, [searchQuery])


  useEffect(() => {
    if (!location.pathname.startsWith('/shop')) return; 
    if (draft === searchQuery) return;

    const timer = setTimeout(() => {
      updateSearchQuery(draft.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [draft, searchQuery, updateSearchQuery, location.pathname]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraft(value); 

    if (!location.pathname.startsWith('/shop') && value.trim()) {
      navigate(`/shop?search=${encodeURIComponent(value.trim())}`, { replace: true });
    }
  };


  return (
    <form className={style.searchForm} onSubmit={(e) => e.preventDefault()}>
          <CiSearch className={style.searchIcon}/>
          <CustomInput id='search' 
                      placeholder='Search' 
                      type='text' 
                      className={style.searchWrapper}
                      value={draft}
                      onChange={handleInputChange}
          />
    </form>
  )
}
