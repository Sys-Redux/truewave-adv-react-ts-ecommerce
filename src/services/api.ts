import axios from 'axios';
import type { Product, Category } from '../types/product';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    timeout: 10000,
});

// ---------------- API Functions ----------------
export const productApi = {
    // Get all products
    getAllProducts: async (): Promise<Product[]> => {
        const { data } = await api.get<Product[]>('/products');
        return data;
    },

    // Get products by category
    getProductsByCategory: async (category: string): Promise<Product[]> => {
        const { data } = await api.get<Product[]>(`/products/category/${category}`);
        return data;
    },

    // Get all categories
    getCategories: async (): Promise<Category[]> => {
        const { data } = await api.get<Category[]>('/products/categories');
        return data;
    },
};