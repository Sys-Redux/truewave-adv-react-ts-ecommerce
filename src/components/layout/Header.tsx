import { ShoppingCart, Home as HomeIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isCartPage = location.pathname === '/cart';

  return (
    <header className="sticky top-0 z-50 bg-[--color-bg-secondary] border-b border-[--color-border]
        backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo/Brand Section - Clickable to go home */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              {/* Cyber logo badge */}
              <div className="w-10 h-10 bg-gradient-cyber rounded-lg flex items-center justify-center glow-cyan">
                <span className="text-[--color-bg-primary] font-bold text-xl">T</span>
              </div>
              {/* Pulsing dot indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[--color-success] rounded-full animate-pulse" />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                <span className="text-gradient-cyber">TrueWave</span>
              </h1>
              <p className="text-[--color-text-muted] text-xs font-mono">// Cyber Store</p>
            </div>
          </button>

          {/* Navigation buttons */}
          <div className="flex items-center gap-3">
            {/* Home button - only show on cart page */}
            {isCartPage && (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-[--color-bg-elevated] hover:bg-[--color-bg-hover]
                    border border-[--color-border] hover:border-[--color-accent] px-4 py-2 rounded-lg
                    transition-all duration-200 group"
              >
                <HomeIcon
                  className="w-5 h-5 text-[--color-text-secondary] group-hover:text-[--color-accent] transition-colors"
                />
                <span className="text-[--color-text-primary] font-medium hidden sm:inline">
                  Continue Shopping
                </span>
              </button>
            )}

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className={`relative flex items-center gap-2 bg-[--color-bg-elevated] hover:bg-[--color-bg-hover]
                    border px-4 py-2 rounded-lg transition-all duration-200 group ${
                isCartPage
                  ? 'border-[--color-accent] glow-cyan'
                  : 'border-[--color-border] hover:border-[--color-accent]'
              }`}
            >
              <ShoppingCart
                className={`w-5 h-5 transition-colors ${
                  isCartPage
                    ? 'text-[--color-accent]'
                    : 'text-[--color-text-secondary] group-hover:text-[--color-accent]'
                }`}
              />
              <span className="text-[--color-text-primary] font-medium hidden sm:inline">
                Cart
              </span>

              {/* Cart count badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[--color-accent] text-[--color-bg-primary]
                    text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center glow-cyan animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent
        via-[--color-accent] to-transparent opacity-30" />
    </header>
  );
};