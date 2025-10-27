import { useState } from 'react';
import type { Product } from '../../types/product';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Fallback placeholder
    const placeholderImage =
        `https://via.placeholder.com/300x300/1e293b/06b6d4?text=${encodeURIComponent(product.title.slice(0, 20))}`;


    return ()
}