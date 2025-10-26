import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api';

// Hook to fetch all products
export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: productApi.getAllProducts,
    });
};

// Hook to fetch products by category
export const useProductsByCategory = (category: string) => {
    return useQuery({
        queryKey: ['products', 'category', category],
        queryFn: () =>
            category
                ? productApi.getProductsByCategory(category)
                : productApi.getAllProducts(),
        enabled: true,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Hook to fetch all categories
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: productApi.getCategories,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};