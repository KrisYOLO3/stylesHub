import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


type ProductItem = {
  id: number;
  title: string;
  image: string [];
  brand: string;
  price: string;
  description: string;
  thumbnail: string;
}

type ProductsState = {
    products: ProductItem [];
    categories: string [],
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null | string,
}

const inintialState:ProductsState = {
    products: [],
    categories: [],
    status: 'idle',
    error: null ,
}

const categoriesSlice = createSlice({
    name: 'products',
    initialState: inintialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state)=>{
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message || null
            })

            // fetch categories

            .addCase(fetchCategories.fulfilled, (state, action)=>{
                state.categories = action.payload
            })
    }
})


export const fetchProducts = createAsyncThunk<ProductItem[], string | null>('products/fetchProducts', async(activeCategory)=>{
    const url = activeCategory 
    ? `https://dummyjson.com/products/category/${activeCategory}`
    : `https://dummyjson.com/products?limit=100`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Error occured while loading the products');
    }
    const data = await response.json()
    return data.products
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async()=>{
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories = await response.json()
    console.log(categories)
    return categories
})

export const  productsReducer = categoriesSlice.reducer
export const allCategories = (state)=> state.catalog.categories
export const allProducts = (state)=> state.catalog.products