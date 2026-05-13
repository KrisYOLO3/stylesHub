import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store";
import {type CartItemParams, type CartState} from "../types/types";


const initialState:CartState ={
    items: [],
    totalCount: 0,
    totalPrice:0,   
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action:PayloadAction<CartItemParams>)=>{
            const existingItem = state.items.find((item)=> item.id === action.payload.id)
            if(existingItem){
                existingItem.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }
        }
    }
})

export const {addToCart} = cartSlice.actions
export const cartReducer = cartSlice.reducer
export const cartState = (state: RootState) => state.cart