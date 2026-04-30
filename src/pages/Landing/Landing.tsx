import style from './Landing.module.css'
import CustomButton from '../../components/CustomButton'
import  stylishMan from '../../images/stylishMan.jpg'
import Form from '../../components/Form/Form'

export default function Landing() {
  return (
    <>
      <div className= {style.landing}>
        <div className= {style.landingWrapper}>
            <main className= {style.main}>
              <section className={style.landingLeft}>
                <h1>Elevate your everyday style</h1>
                <CustomButton className={style.startBtn}>Start shopping</CustomButton>
              </section>
              <section className={style.landingRight}>
                <div className={style.stylishMan}>
                  <img src={stylishMan} alt="Stylish Man"/>
                </div>
              </section>
            </main>    
          </div>
      </div>
      <div className={style.formContent}>
        <Form /> 
      </div>
    </>  
  )
}
