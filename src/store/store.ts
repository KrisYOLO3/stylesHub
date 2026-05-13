import { configureStore } from "@reduxjs/toolkit";
import {authFormReducer} from '../slices/formSlice'
import {productsReducer} from '../slices/catalogSlice'
import {cartReducer} from '../slices/cartSlice'

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer:{
        authForm: authFormReducer,
        catalog: productsReducer,
        cart: cartReducer,
    }
})

export default store