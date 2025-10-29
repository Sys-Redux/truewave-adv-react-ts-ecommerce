import { ShoppingCart } from '../components/cart/ShoppingCart';
import { ShoppingBag } from 'lucide-react';

export const Cart = () => {
    return (
        <div className='py-8 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>

                {/* Header */}
                <div className='mb-8 relative'>
                    <div className='absolute inset-0 bg-gradient-cyber-alt opacity-5 blur-3xl' />
                    <div className='relative z-10'>
                        <h2 className='text-4xl font-bold mb-3 scan-lines'>
                            <span className='text-text-primary'>Shopping </span>
                            <span className='text-gradient-cyber'>Cart</span>
                        </h2>
                        <p className='text-text-secondary text-lg'>
                            Review Your Items
                            <ShoppingBag className='inline-block w-6 h-6 text-secondary ml-2 mb-1' />
                            <span className='text-secondary font-mono ml-2'>Checkout</span>
                        </p>
                    </div>
                </div>

                {/* Shopping Cart Component */}
                <ShoppingCart />
            </div>
        </div>
    );
};