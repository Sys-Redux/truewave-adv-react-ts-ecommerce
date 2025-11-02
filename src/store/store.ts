import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer, { initializeAuthListener } from './authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});

// Initialize Firebase auth listener & cleanup function
export const unsubscribeAuth = initializeAuthListener(store.dispatch);

// Optional cleanup function for testing
export const cleanupStore = () => {
    unsubscribeAuth();
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;