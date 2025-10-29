import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './Header';
import { type RootState } from '../../store/store';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get cart item count from Redux store
    const cartItemCount = useSelector((state: RootState) =>
        state.cart?.items?.length || 0
    );

    const handleCartClick = () => {
        if (location.pathname !== '/cart') {
            navigate('/cart');
        }
    };

    return (
        <div className='min-h-screen flex flex-col'>

            {/* Header */}
            <Header cartItemCount={cartItemCount} onCartClick={handleCartClick} />

            {/* Main content area */}
            <main className='flex-1'>
                {children}
            </main>

            {/* Footer */}
            <footer className='border-t border-border bg-bg-secondary py-6 mt-auto'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <p className='text-text-muted text-sm'>
                            &copy; {new Date().getFullYear()} TrueWave. All rights reserved.
                        </p>
                        <p className='text-text-muted text-sm'>
                            Built with <span className='text-accent font-medium'>React </span>
                            & <span className='text-accent font-medium'>TypeScript</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};