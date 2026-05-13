import style from './Pagination.module.css'
import CustomButton from '../CustomButton'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import {useShopParams} from '../../hooks/useShopParams'

type CurrentPageProps = { 
    totalPages: number;
}


export default function Pagination({ totalPages}:CurrentPageProps) {
  
    const {currentPage, setPage } = useShopParams()

    return (
        <div className = {style.currentPageBtns}>
            <CustomButton className = {style.prevBtn} onClick= {()=>setPage(currentPage-1)} disabled = {currentPage ===1}>
                <MdKeyboardArrowLeft /> 
            </CustomButton>
            <p className={style.currentPage}>{currentPage}</p>
            <CustomButton className = {style.nextBtn} onClick= {()=>setPage(currentPage+1)} disabled = {currentPage ===totalPages} >
                <MdKeyboardArrowRight />
            </CustomButton>
        </div>
    )
}
