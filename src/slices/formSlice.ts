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



const authSlice = {
    name: 'auth',
    initialState,
    reducers: {
        toggleMode:(state)=>{
            state.isLoginMode = ! state.isLoginMode
        }

    }
}

export const {toggleMode} = authSlice.actions