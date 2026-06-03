import CustomInput from '../CustomInput'
import style from './Form.module.css'
import {useNavigate} from 'react-router-dom'
import {useForm, type SubmitHandler} from 'react-hook-form'
import CustomButton from '../CustomButton'
import {useAppSelector,useAppDispatch  } from '../../hooks/hook'
import {authFormState, toggleMode, loginSuccess} from '../../slices/formSlice'

type User = {
  name: string;
  email: string;
  password: string;
}

export default function Form() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isLoginMode } = useAppSelector(authFormState)

  type LoginForm = {
    name: string,
    email : string,
    password: string,
}
  const {register, handleSubmit, formState:{errors}} = useForm<LoginForm>()

  const submit : SubmitHandler<LoginForm> = (data)=>{

    const usersInStorge = localStorage.getItem('usersData')
    const users = usersInStorge ? JSON.parse(usersInStorge) : [ ]

    if(!isLoginMode){
      const user = {name: data.name, email: data.email, password: data.password}
      const updatedUsers = [...users, user]
      localStorage.setItem('usersData', JSON.stringify(updatedUsers))
      dispatch(loginSuccess(user))
      return navigate('/shop');
    }

    const existingUser = users.find((user: User)=> user.name === data.name)
      if(existingUser){
        dispatch(loginSuccess(existingUser))
        return navigate('/shop', {replace:true});
      }else{
        dispatch(toggleMode())
      }
}

  const validateName = {
    required: 'Name is required',
    minLength: {
      value: 5,
      message: 'Name is too short (min 5 chars)'
    },
    maxLength:{
      value: 20,
      message: 'Name is too long (max 20 chars)'
    },
    pattern: {
      value: /^[A-Za-zА-Яа-яЁё\s]+$/,
      message: 'Only letters are allowed'
    }
  }

  const validatePassword = {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters'
    },
    maxLength: {
      value: 30,
      message: 'Password is too long (max 30 chars)'
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      message: 'Need at least one uppercase letter and one special character (!@#$%^&*)'
    }
  }

  const validateEmail = {
    required: 'Email is required',
    pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
    }
  }

  return (
    <div className = {style.formWrapper}>
      <form  onSubmit = {handleSubmit(submit)} className={style.form}>
        <h2>{isLoginMode ? 'Welcome Back' : 'Create account' }</h2>
        <CustomInput id='name' 
                      placeholder='Enter your name' 
                      type='text' 
                      label='name'
                      className = {style.inputForm}
                      {...register('name', validateName)}/>
        {errors.name && <span className = {style.error}>{errors.name.message}</span>}
        {!isLoginMode && <CustomInput id='email' 
                                placeholder='Enter your email' 
                                type='email' 
                                label='id'
                                className = {style.inputForm}
                                {...register('email', validateEmail)}/>}
        {!isLoginMode && <CustomInput id ='password'
                                type='password'
                                label = 'password'
                                className = {style.inputForm} 
                                placeholder='Enter password'
                                {...register('password', validatePassword)}/>}
         {errors.password && <span className = {style.error}>{errors.password.message}</span>}
        <CustomButton className={style.loginAndStart} type='submit'>Login & Start Shopping</CustomButton>
      </form>
      <div className={style.switchModeBtn}>
        <span>{isLoginMode ? 'Not registered?' : 'Registered?'}</span>
        <CustomButton className={style.signUp} onClick={()=>dispatch(toggleMode())}>{isLoginMode ? 'Sign Up' : 'Sign In'}</CustomButton>
      </div>
    </div>
 
  )
}
