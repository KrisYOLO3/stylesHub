import axios from "axios";
import {type FetchProductsParams, type FetchProductsResponse, type ProductItem, type FetchProductByIdParams} from '../types/types';

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
});


export const productsService = {

    fetchProducts: async({activeCategory, skip, limit, signal, search}: FetchProductsParams) : Promise<FetchProductsResponse>=>{
        let path = '';
        if(search){
            path = `/search`
        }else if(activeCategory){
            path = `/category/${activeCategory}`
        }
        //request

        const response = await api.get(path, {
            params: {limit, skip, q: search},
            signal,
        });
        return response.data;
    },

     fetchCategories: async() : Promise<string[]>=>{
        const response = await api.get(`/categories`)
        return response.data;
    },

    fetchProductById: async({id, signal}: FetchProductByIdParams) : Promise<ProductItem>=>{
        const response = await api.get(`/${id}`, {signal})
        return response.data;
    },

} 