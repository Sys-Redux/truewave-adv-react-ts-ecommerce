import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import type { Product, ProductFormData } from '../types/product';
import type { Order, CreateOrderData } from '../types/order';

// Collection reference
const productsCollection = collection(db, 'products');
const ordersCollection = collection(db, 'orders');

// Convert Firestore Timestamp to ISO string for serialization
const convertTimestamps = <T extends Record<string, unknown>>(data: T): T => {
    const converted: Record<string, unknown> = { ...data };

    // Handle createdAt - convert to ISO string
    if (data.createdAt instanceof Timestamp) {
        converted.createdAt = data.createdAt.toDate().toISOString();
    } else if (data.createdAt === null || data.createdAt === undefined) {
        converted.createdAt = new Date().toISOString();
    }

    // Handle updatedAt - convert to ISO string
    if (data.updatedAt instanceof Timestamp) {
        converted.updatedAt = data.updatedAt.toDate().toISOString();
    } else if (data.updatedAt === null || data.updatedAt === undefined) {
        converted.updatedAt = new Date().toISOString();
    }

    return converted as T;
};

// ======================================================================================
// Product Service Functions
// ======================================================================================
// Get All Products
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        // Try with orderBy first
        try {
            const querySnapshot = await getDocs(
                query(productsCollection, orderBy('createdAt', 'desc'))
            );

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...convertTimestamps(doc.data()),
            })) as Product[];
        } catch (orderError) {
            // If orderBy fails (missing field or index), fetch without ordering
            console.warn('Fetching products without ordering:', orderError);
            const querySnapshot = await getDocs(productsCollection);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...convertTimestamps(doc.data()),
            })) as Product[];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

// Get Products by Category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    try {
        // Try with orderBy first
        try {
            const q = query(
                productsCollection,
                where('category', '==', category),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...convertTimestamps(doc.data()),
            })) as Product[];
        } catch (orderError) {
            // If orderBy fails (missing index or field), fetch without ordering
            console.warn('Fetching products by category without ordering:', orderError);
            const q = query(
                productsCollection,
                where('category', '==', category)
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...convertTimestamps(doc.data()),
            })) as Product[];
        }
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Failed to fetch products by category');
    }
};

// Get Product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, 'products', productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...convertTimestamps(docSnap.data()),
            } as Product;
        }

        return null;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

// Add New Product
export const createProduct = async (productData: ProductFormData): Promise<string> => {
    try {
        const docRef = await addDoc(productsCollection, {
            ...productData,
            rating: 0,
            ratingCount: 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};

// Update Existing Product
export const updateProduct = async (
    productId: string,
    productData: Partial<ProductFormData>
): Promise<void> => {
    try {
        const docRef = doc(db, 'products', productId);
        await updateDoc(docRef, {
            ...productData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
};

// Delete Product
export const deleteProduct = async (productId: string): Promise<void> => {
    try {
        const docRef = doc(db, 'products', productId);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }
};

// ======================================================================================
// Order Service Functions
// ======================================================================================
// Create New Order
export const createOrder = async (orderData: CreateOrderData): Promise<string> => {
    try {
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        console.log('Order created with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
};

// Get All Order for a Specific User
export const getUserOrders = async (userId: string): Promise<Order[]> => {
    try {
        const q = query(
            ordersCollection,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...convertTimestamps(doc.data()),
        })) as Order[];
    } catch (error) {
        console.error('Error fetching user orders:', error);
        throw new Error('Failed to fetch user orders');
    }
};

// Get Order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
        const docRef = doc(db, 'orders', orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...convertTimestamps(docSnap.data()),
            } as Order;
        }

        return null;
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        throw new Error('Failed to fetch order by ID');
    }
};