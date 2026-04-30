import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import type { RootState } from '../store/store';


type ProductItem = {
  id: number;
  title: string;
  image: string [];
  brand: string;
  price: string;
  description: string;
  thumbnail: string;
  images: string [];
  category: string;
}

type FetchProductsResponse ={
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
}

type ShopState = {
    products: ProductItem [];
    categories: string [],
    catalogItem: ProductItem | null;
    activeCategory: string | null,
    total: number, 
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null | string,
}
type FetchProductsArgs = {
  activeCategory: string | null;
  skip: number;
  limit: number;
}


const inintialState:ShopState  = {
    products: [],
    categories: [],
    catalogItem: null,
    activeCategory: null,
    total: 0, 
    status: 'idle',
    error: null ,
}

const categoriesSlice = createSlice({
    name: 'products',
    initialState: inintialState,
    reducers: {
        setActiveCategory:(state, action)=>{
            state.activeCategory = action.payload
        },
        setCatalogItem:(state, action)=>{
            state.catalogItem = action.payload
        },
    },
    extraReducers(builder) {
        builder
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

const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = createAsyncThunk<FetchProductsResponse, FetchProductsArgs>('products/fetchProducts', async({activeCategory, skip, limit}, {signal})=>{
    
    const path =  activeCategory ?`/category/${activeCategory}` : '' 

    const query = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
    }).toString()
    
    const response = await axios.get(`${BASE_URL}${path}?${query}`)
    return response.data
})

// load products by id

export const fetchProductById= createAsyncThunk('products/fetchProductById', async(id: number)=>{
    const response = await axios.get(`${BASE_URL}/${id}`)
    console.log(response.data)
    return response.data
})

// load categories

export const fetchCategories = createAsyncThunk('products/fetchCategories', async()=>{
    const response = await axios.get('https://dummyjson.com/products/categories')
    console.log(response.data)
    return response.data
})

export const  productsReducer = categoriesSlice.reducer
export const shopState = (state: RootState)=> state.catalog
export const {setActiveCategory, setCatalogItem} = categoriesSlice.actions