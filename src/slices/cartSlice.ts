import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../store/store";
import {type CartItemParams, type CartState} from "../types/types";


const initialState:CartState ={
    items: [],
    totalCount: 0,
    totalPrice:0,   
}

const updateCartTotals = (state:CartState) =>{
    state.totalCount = state.items.reduce((total, item)=> total + item.quantity, 0)
    state.totalPrice = state.items.reduce((total, item)=> total + (Number(item.price)*item.quantity), 0)
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
            updateCartTotals(state);
        },
        addQuantiy: (state, action:PayloadAction<number>)=>{
           const existingItem = state.items.find((item)=> item.id === action.payload)
           if(existingItem){
                existingItem.quantity +=1
           }
            updateCartTotals(state);
        },
        distractQuantiy: (state, action:PayloadAction<number>)=>{
            const existingItem = state.items.find((item)=> item.id === action.payload)
            if (existingItem){
                existingItem.quantity -= 1
            }
            updateCartTotals(state);

        },
        removeItemFromCart: (state, action:PayloadAction<number>)=>{
            state.items = state.items.filter((item)=> item.id !== action.payload)
            updateCartTotals(state);   
        }
    }
})

export const {addToCart, addQuantiy, distractQuantiy, removeItemFromCart} = cartSlice.actions
export const cartReducer = cartSlice.reducer
export const cartState = (state: RootState) => state.cart