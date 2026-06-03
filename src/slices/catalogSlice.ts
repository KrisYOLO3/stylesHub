import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../store/store';
import {productsService} from '../api/productsService';
import type {ShopState, FetchProductsResponse, FetchProductsParams, ProductItem } from '../types/types';


const inintialState:ShopState  = {
    products: [],
    categories: [],
    catalogItem: null,
    total: 0, 
    status: 'idle',
    error: null ,
}

const categoriesSlice = createSlice({
    name: 'products',
    initialState: inintialState,
    reducers: {
        setCatalogItem:(state, action:PayloadAction<ProductItem | null>)=>{
            state.catalogItem = action.payload
        },
    },
    extraReducers(builder) {
        builder

              // fetch products

            .addCase(fetchProducts.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.products = action.payload.products
                state.total = action.payload.total
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message || null
            })

            // fetch categories

            .addCase(fetchCategories.fulfilled, (state, action)=>{
                state.categories = action.payload
            })

            // fetch product by id
            .addCase(fetchProductById.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(fetchProductById.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.catalogItem = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action)=>{
                state.error = action.error.message || null
            })
    }
})

// load products

export const fetchProducts = createAsyncThunk<FetchProductsResponse, FetchProductsParams>('products/fetchProducts', async(params, { signal })=>{
    const response = await productsService.fetchProducts({...params, signal})
    return response
})

// load products by id

export const fetchProductById = createAsyncThunk<ProductItem, number>('products/fetchProductById', async(id, {signal})=>{
    const response = await productsService.fetchProductById({id, signal})
    console.log(response)
    return response
})

// load categories
export const fetchCategories = createAsyncThunk<string[]>('products/fetchCategories', async()=>{
    const response = await productsService.fetchCategories()
    console.log(response)
    return response
})



export const  productsReducer = categoriesSlice.reducer
export const shopState = (state: RootState)=> state.catalog
export const {setCatalogItem} = categoriesSlice.actions