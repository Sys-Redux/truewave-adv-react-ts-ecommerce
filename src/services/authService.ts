// This wraps Firebase's SDK functions
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type User as FirebaseUser,
    type UserCredential,
} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import type { User, RegisterData, LoginData, ProfileUpdateData } from '../types/user';

// Helper: Convert FirebaseUser to our User type
export const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
});

// Register New User
export const registerUser = async (data: RegisterData): Promise<User> => {
    // Create Auth Account
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth, data.email, data.password
    );

    // Set Display Name (Firebase doesn't set it on registration)
    if (data.displayName) {
        await updateProfile(userCredential.user, {
            displayName: data.displayName,
        });
    }

    // Return Mapped User
    return mapFirebaseUser(userCredential.user);
};

// Login Existing User
export const loginUser = async (data: LoginData): Promise<User> => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
    );
    return mapFirebaseUser(userCredential.user);
};

// Logout Current User
export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
};

// Update User Profile
export const updateUserProfile = async (data: ProfileUpdateData): Promise<void> => {
    if (!auth.currentUser) {
        throw new Error('No authenticated user');
    }
    await updateProfile(auth.currentUser, data);
};