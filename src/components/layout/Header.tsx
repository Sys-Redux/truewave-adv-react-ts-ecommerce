import { ShoppingCart, Home as HomeIcon, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isCartPage = location.pathname === '/cart';

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo/Brand Section - Clickable to go home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              {/* Cyber logo badge */}
              <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center shadow-cyan">
                <span className="text-bg-primary font-bold text-xl">T</span>
              </div>
              {/* Pulsing dot indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                <span className="text-gradient-cyber">TrueWave</span>
              </h1>
              <p className="text-text-muted text-xs font-mono">// Cyber Store</p>
            </div>
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className='flex items-center justify-center bg-bg-elevated w-10 h-10 hover:bg-bg-hover
                border border-border rounded-lg hover:border-accent transition-all duration-200'
              aria-label='Toggle theme'
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className='w-5 h-5 text-text-secondary' />
              ) : (
                <Sun className='w-5 h-5 text-text-accent' />
              )}
            </button>

            {/* Home button - only show on cart page */}
            {isCartPage && (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-bg-elevated hover:bg-bg-hover
                    border border-border hover:border-accent px-4 py-2 rounded-lg
                    transition-all duration-200 group"
              >
                <HomeIcon
                  className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors"
                />
                <span className="text-text-primary font-medium hidden sm:inline">
                  Continue Shopping
                </span>
              </button>
            )}

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center gap-2 bg-bg-elevated hover:bg-bg-hover
                    border px-4 py-2 rounded-lg transition-all duration-200 group ${
                isCartPage
                  ? 'border-accent shadow-cyan'
                  : 'border-border hover:border-accent'
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 transition-colors ${
                  isCartPage
                    ? 'text-accent'
                    : 'text-text-secondary group-hover:text-accent'
                }`}
              />
              <span className="text-text-primary font-medium hidden sm:inline">
                Cart
              </span>

              {/* Cart count badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-bg-primary
                    text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center shadow-cyan animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent
        via-accent to-transparent opacity-30" />
    </header>
  );
};