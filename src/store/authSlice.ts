import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import * as authService from '../services/authService';
import type { AuthState, User, RegisterData, LoginData, ProfileUpdateData } from '../types/user';
import type { RootState, AppDispatch } from './store';

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    initialized: false,
};

// ==================================================================================
// Async Thunks for Auth Actions -- (I like styling comments)
// ==================================================================================

// Register New User
export const register = createAsyncThunk<User, RegisterData>(
    'auth/register',
    async (data, { rejectWithValue }) => {
        try {
            return await authService.registerUser(data);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Registration failed';
            return rejectWithValue(message);
        }
    }
);

// Login Existing User
export const login = createAsyncThunk<User, LoginData>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            return await authService.loginUser(data);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Login failed';
            return rejectWithValue(message);
        }
    }
);

// Logout Current User
export const logout = createAsyncThunk<void, void>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logoutUser();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Logout failed';
            return rejectWithValue(message);
        }
    }
);

// Update User Profile
export const updateProfile = createAsyncThunk<void, ProfileUpdateData>(
    'auth/updateProfile',
    async (data, { rejectWithValue }) => {
        try {
            await authService.updateUserProfile(data);
            // After update, firebase will auto-update the user via onAuthStateChanged
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Profile update failed';
            return rejectWithValue(message);
        }
    }
);

// ==================================================================================
// Redux Slice
// ==================================================================================

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Called on by onAuthStateChanged listener
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.initialized = true; // Auth state is known now
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Logout
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;

// ==================================================================================
// Selectors
// ==================================================================================

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.user !== null;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthInitialized = (state: RootState) => state.auth.initialized;

// ==================================================================================
// Auth State Listener Initialization
// ==================================================================================

// KEY FUNCTION: Call this once on app startup to listen for auth state changes

export const initializeAuthListener = (dispatch: AppDispatch): (() => void) => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            const user = authService.mapFirebaseUser(firebaseUser);
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
    });

    // Return the unsubscribe function so caller can cleanup if needed
    return unsubscribe;
};