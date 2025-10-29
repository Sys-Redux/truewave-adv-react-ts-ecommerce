import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/product';
import { type CartItem, saveCartToStorage, loadCartFromStorage, clearCartFromStorage } from '../utils/storage';

interface CartState {
    items: CartItem[];
}

// Load initial state from sessionStorage
const initialState: CartState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add product to cart
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );
            if (existingItem) {
                // Product exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // New product, add to cart
                state.items.push({ product, quantity: 1 });
            }

            // Save updated cart to storage
            saveCartToStorage(state.items);
        },

        // Update quantity of a product
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find((item) => item.product.id === productId);

            if (item) {
                // Remove item if quantity is 0 or less
                if (quantity <= 0) {
                    state.items = state.items.filter(
                        (item) => item.product.id !== productId);
                } else {
                    item.quantity = quantity;
                }

                // Save updated cart to storage
                saveCartToStorage(state.items);
            }
        },

        // Remove item from cart
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.product.id !== productId);
            // Save updated cart to storage
            saveCartToStorage(state.items);
        },

        // Clear the cart
        clearCart: (state) => {
            state.items = [];
            clearCartFromStorage();
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors (helpers to access cart data)
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartTotal = (state: { cart: CartState }) => {
    return state.cart.items.reduce(
        (total, item) => total + item.product.price * item.quantity, 0
    );
};

export const selectCartItemCount = (state: { cart: CartState }) => {
    return state.cart.items.reduce((count, item) => count + item.quantity, 0);
};