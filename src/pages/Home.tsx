import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsByCategory } from '../hooks/useProducts';
import { ProductList } from '../components/products/ProductList';
import { CategoryFilter } from '../components/products/CategoryFilter';
import type { Product } from '../types/product';

export const Home = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { data: products, isLoading, error } = useProductsByCategory(selectedCategory || '');

    const handleAddToCart = (product: Product) => {
        // TODO: Dispatch Redux action to add product to cart
        console.log('Add to cart:', product);

        // Optional: Show a toast notification header
    };


    return (
        <main className='py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>

                {/* Hero Header */}
                <div className='mb-8 relative'>
                    <section className='absolute inset-0 bg-gradient-cyber opacity-5 blur-3xl'>
                        <article className='relative'>
                            <h2 className='text-4xl font-bold mb-3 scan-lines'>
                                <span className='text-[--color-text-primary]'>Featured </span>
                                <span className='text-gradient-cyber'>Products</span>
                            </h2>
                            <p className='text-[--color-text-secondary] text-lg'>
                                Discover our collection of premium products
                                <span className='text-[--color-accent] font-mono ml-2'>
                                    Latest Arrivals
                                </span>
                            </p>
                        </article>
                    </section>

                    {/* Category Filter */}
                    <section className='mb-8'>
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </section>

                    {/* Product Section */}
                    {isLoading ? (
                        <section className='flex flex-col items-center justify-center py-20'>
                            <article className='relative'>
                                <div className='w-16 h-16 border-4 border-[--color-bg-elevated]
                                    border-t-[--color-accent] rounded-full animate-spin glow-cyan' />
                                <div className='absolute inset-0 w-16 h-16 border-4 border-transparent
                                    border-b-[--color-secondary] rounded-full animate-spin'
                                        style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                            </article>
                            <p className='text-[--color-text-secondary] mt-6 text-lg'>Loading Products...</p>
                            <p className='text-[--color-text-muted] mt-2 text-sm font-mono'>
                                Please wait while we fetch the latest products for you.
                            </p>
                        </section>
                    ) : error ? (
                        <section className='flex flex-col items-center justify-center py-20'>
                            <article className='bg-[--color-bg-secondary] border-2 border-[--color-error]
                                rounded-lg p-8 max-w-md'>
                                <p className='text-[--color-bg-error] text-xl font-bold mb-2'>⚠️ Connection Error</p>
                                <p className='text-[--color-text-secondary]'>Failed to load products from the server</p>
                                <p className='text-[--color-text-muted] text-sm mt-3 font-mono'>Please try again later</p>
                            </article>
                        </section>
                    ) : (
                        <ProductList products={products || []} onAddToCart={handleAddToCart} />
                    )}
                </div>
            </div>
        </main>
    );
};