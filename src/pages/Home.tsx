import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useProductsByCategory } from '../hooks/useProducts';
import { ProductList } from '../components/products/ProductList';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { addToCart } from '../store/cartSlice';
import type { Product } from '../types/product';

export const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: products, isLoading, error } = useProductsByCategory(selectedCategory || '');

    const handleAddToCart = (product: Product) => {
        // Dispatch Redux action to add product to cart
        dispatch(addToCart(product));
    };


    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>

                {/* Hero Header */}
                <div className='mb-8 relative'>
                    <div className='absolute inset-0 bg-linear-to-r from-accent/10 via-secondary/10 to-accent/10 blur-3xl' />
                    <div className='relative z-10'>
                        <h2 className='text-4xl font-bold mb-3'>
                            <span className='text-text-primary'>Featured </span>
                            <span className='text-gradient-cyber'>Products</span>
                        </h2>
                        <p className='text-text-secondary text-lg'>
                            Discover our collection of premium products
                            <span className='text-accent font-mono ml-2'>
                                Latest Arrivals
                            </span>
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className='mb-8'>
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </div>

                    {/* Product Section */}
                    {isLoading ? (
                        <div className='flex flex-col items-center justify-center py-20'>
                            <div className='relative'>
                                <div className='w-16 h-16 border-4 border-bg-elevated
                                    border-t-accent rounded-full animate-spin shadow-cyan' />
                                <div className='absolute inset-0 w-16 h-16 border-4 border-transparent
                                    border-b-secondary rounded-full animate-spin'
                                        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                            </div>
                            <p className='text-text-secondary mt-6 text-lg'>Loading Products...</p>
                            <p className='text-text-muted mt-2 text-sm font-mono'>
                                Please wait while we fetch the latest products for you.
                            </p>
                        </div>
                    ) : error ? (
                        <div className='flex flex-col items-center justify-center py-20'>
                            <div className='bg-bg-secondary border-2 border-error
                                rounded-lg p-8 max-w-md'>
                                <p className='text-bg-error text-xl font-bold mb-2'>⚠️ Connection Error</p>
                                <p className='text-text-secondary'>Failed to load products from the server</p>
                                <p className='text-text-muted text-sm mt-3 font-mono'>Please try again later</p>
                            </div>
                        </div>
                    ) : (
                        <ProductList products={products || []} onAddToCart={handleAddToCart} />
                    )}
                </div>
            </div>
        </div>
    );
};