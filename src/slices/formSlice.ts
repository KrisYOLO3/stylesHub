import { createSlice } from "@reduxjs/toolkit";


type AuthStateProps = {
    userName: string | null,
    userEmail: string | null,
    isAuthenticated: boolean,
    isLoginMode: boolean, 
}

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

export const authFormState = (state)=> state.authForm // состояние, достаем из store
export const {toggleMode, loginSuccess} = authSlice.actions
export const authFormReducer = authSlice.reducer // для  store