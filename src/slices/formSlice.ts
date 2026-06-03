import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../store/store';
import type {AuthStateProps} from '../types/types'


const initialState:AuthStateProps = {
    userName: null,
    userEmail: null,
    isAuthenticated: false,
    isLoginMode: true, 
}



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        toggleMode:(state)=>{
            state.isLoginMode = !state.isLoginMode
        },
        loginSuccess:(state, action)=>{
            state.userName = action.payload.name;
            state.userEmail = action.payload.email;
            state.isLoginMode = true;
            state.isAuthenticated = true;
        }
    }
})

export const authFormState = (state: RootState)=> state.authForm // состояние, достаем из store
export const {toggleMode, loginSuccess} = authSlice.actions
export const authFormReducer = authSlice.reducer // для  store