import CustomInput from '../CustomInput'
import style from './Form.module.css'
import {useState} from 'react'
import {useForm, type SubmitHandler} from 'react-hook-form'
import CustomButton from '../CustomButton'

export default function Form() {

  const [login, setLogin] = useState(true)

    type LoginForm = {
    name: string,
    email : string,
    password: string,
  }
  const {register, handleSubmit, control, formState:{ errors}} = useForm<LoginForm>()

  const submit : SubmitHandler<LoginForm> = (data)=>{

 }

 const handleForm = (e)=>{
    e.preventDefault()
    
 }

 const handleLogin = ()=>{
  setLogin(prev=> !prev)
 }



  return (
    <div className={style.formWrapper}>
        <form  onSubmit = {handleSubmit(submit)}>
            <h2>{login ? 'Welcomr Back' : 'Create account' }</h2>
            <CustomInput id='name' 
                         placeholder='Enter your name' 
                         type='text' 
                         label='id'
                         {...register('name', { required: 'Name is required' })}/>
            {!login && <CustomInput id='email' 
                                    placeholder='Enter your email' 
                                    type='email' 
                                    label='id'
                                    {...register('email', { required: 'Email is required' })}/>}
            {!login && <CustomInput id ='password'
                                    type='password'
                                    label = 'password' 
                                    {...register('password', { required: 'Password is required' })}/>}
            <CustomButton className={style.loginAndStart}>Login & Start Shopping</CustomButton>
            <div>
              <span>Not registered?</span>
              <CustomButton className={style.signUp} onClick={handleLogin}>Sign up</CustomButton>
            </div>
        </form>

    </div>
  )
}
