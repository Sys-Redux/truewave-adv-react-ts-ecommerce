import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer, { initializeAuthListener } from './authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});

// Initialize Firebase auth listener to sync auth state
initializeAuthListener(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;