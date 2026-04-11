import { configureStore } from "@reduxjs/toolkit";
import {authFormReducer} from '../slices/formSlice'

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer:{
        authForm: authFormReducer,
    }
})

export default store