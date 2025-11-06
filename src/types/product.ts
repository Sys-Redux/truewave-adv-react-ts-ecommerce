import { Timestamp } from "firebase/firestore";

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    imageURL: string;
    imagePath?: string;
    rating: number;
    ratingCount: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export type Category = string;

export type ProductFormData = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'ratingCount'>;