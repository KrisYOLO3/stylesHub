import { configureStore } from "@reduxjs/toolkit";
import {authFormReducer} from '../slices/formSlice'
import {productsReducer} from '../slices/catalogSlice'

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer:{
        authForm: authFormReducer,
        catalog: productsReducer,
    }
})

export default store