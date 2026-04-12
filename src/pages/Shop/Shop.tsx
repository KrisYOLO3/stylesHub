import Header from '../../components/Header/Header'
import style from '../Shop/Shop.module.css'
import Catalog from '../../components/Catalog/Catalog'
import Categories from '../../components/Categories/Categories'
import ShoppingCart  from '../../components/ShoppingCart/ShoppingCart'

export default function Shop() {
  return (
    <div className={style.shop}>
      <Header/>
      <main className={style.main}>
        <div className={style.mainWrapper}>
          <div className={style.store}>
            <Categories />
            <Catalog />
          </div>
          <aside className={style.cartSidebar}>
            <ShoppingCart />
          </aside>
        </div>
      </main>
    </div>
  )
}
