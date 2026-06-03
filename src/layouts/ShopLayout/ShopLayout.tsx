import style from './ShopLayout.module.css'
import Categories from "../../components/Categories/Categories";
import { Outlet } from "react-router-dom";

export default function ShopLayout() {
    return (
    <div className={style.shopLayout}>
      <div className={style.store}>
        <Categories />
        <div className={style.contentArea}>
          <Outlet /> 
        </div>
      </div>
    </div>
  ) 
}


