import type { Product } from '../types/product';

const CART_STORAGE_KEY = 'truewave_cart';

// Cart item w/ quantity
export interface CartItem {
    product: Product;
    quantity: number;
};

// Save cart to sessionStorage
export const saveCartToStorage = (items: CartItem[]): void => {
    try {
        const serialized = JSON.stringify(items);
        sessionStorage.setItem(CART_STORAGE_KEY, serialized);
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
};

// Load cart from sessionStorage
export const loadCartFromStorage = (): CartItem[] => {
    try {
        const serialized = sessionStorage.getItem(CART_STORAGE_KEY);
        if (serialized === null) {
            return [];
        }
        return JSON.parse(serialized) as CartItem[];
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        return [];
    }
};

// Clear cart from sessionStorage
export const clearCartFromStorage = (): void => {
    try {
        sessionStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing cart from storage:', error);
    }
};