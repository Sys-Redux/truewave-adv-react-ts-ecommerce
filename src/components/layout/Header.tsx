import { ShoppingCart, Home as HomeIcon, Sun, Moon, User, LogOut, UserCircle, ChevronDown, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectCurrentUser, logout } from '../../store/authSlice';
import { successfulToast } from '../../utils/toasts';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  // Get current user from Redux
  const user = useAppSelector(selectCurrentUser);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isCartPage = location.pathname === '/cart';
  const isProfilePage = location.pathname === '/profile';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle logout
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await dispatch(logout());
    successfulToast('👋 Logged out successfully');
    navigate('/');
  };

  // Handle profile navigation
  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

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

            {/* Home button - only show on cart/profile pages */}
            {(isCartPage || isProfilePage) && (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-bg-elevated hover:bg-bg-hover
                    border border-border hover:border-accent px-4 py-2 rounded-lg
                    transition-all duration-200 group"
              >
                <HomeIcon
                  className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors"
                />
                <span className="text-text-primary font-medium hidden lg:inline">
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

            {/* Auth Section - Dropdown or Login/Register */}
            {user ? (
              // User is logged in - Show dropdown menu
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-2 bg-bg-elevated hover:bg-bg-hover
                    border px-4 py-2 rounded-lg transition-all duration-200 group ${
                    isDropdownOpen || isProfilePage
                      ? 'border-accent shadow-cyan'
                      : 'border-border hover:border-accent'
                  }`}
                >
                  {/* User avatar or icon */}
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full object-cover border border-accent"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-cyber flex items-center justify-center">
                      <User className="w-4 h-4 text-bg-primary" />
                    </div>
                  )}

                  {/* User name - hidden on small screens */}
                  <span className="text-text-primary font-medium hidden md:inline max-w-[120px] truncate">
                    {user.displayName || user.email}
                  </span>

                  {/* Dropdown chevron */}
                  <ChevronDown
                    className={`w-4 h-4 text-text-secondary transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-bg-secondary border-2 border-border
                    rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">

                    {/* User Info Section */}
                    <div className="p-4 border-b border-border bg-bg-elevated">
                      <div className="flex items-center gap-3">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || 'User'}
                            className="w-12 h-12 rounded-full object-cover border-2 border-accent shadow-cyan"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-cyber flex items-center justify-center shadow-cyan">
                            <User className="w-6 h-6 text-bg-primary" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary font-bold truncate">
                            {user.displayName || 'No Name Set'}
                          </p>
                          <p className="text-text-muted text-xs font-mono truncate">
                            {user.email}
                          </p>
                          {/* Online status indicator */}
                          <div className="flex items-center gap-1 mt-1">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                            <span className="text-success text-xs font-medium">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {/* Profile/Edit Button */}
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-bg-elevated
                          transition-colors group text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center
                          group-hover:bg-accent/20 transition-colors">
                          <Settings className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium group-hover:text-accent transition-colors">
                            Edit Profile
                          </p>
                          <p className="text-text-muted text-xs">
                            Manage your account settings
                          </p>
                        </div>
                      </button>

                      {/* Divider */}
                      <div className="my-2 border-t border-border" />

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-error/10
                          transition-colors group text-left"
                      >
                        <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center
                          group-hover:bg-error/20 transition-colors">
                          <LogOut className="w-5 h-5 text-error" />
                        </div>
                        <div>
                          <p className="text-text-primary font-medium group-hover:text-error transition-colors">
                            Logout
                          </p>
                          <p className="text-text-muted text-xs">
                            Sign out of your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // User is NOT logged in - Show login/register buttons
              !isAuthPage && (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center gap-2 bg-bg-elevated hover:bg-bg-hover
                      border border-border hover:border-accent px-4 py-2 rounded-lg
                      transition-all duration-200 group"
                  >
                    <User className="w-5 h-5 text-text-secondary group-hover:text-accent transition-colors" />
                    <span className="text-text-primary font-medium hidden sm:inline">
                      Login
                    </span>
                  </button>

                  <button
                    onClick={() => navigate('/register')}
                    className="flex items-center gap-2 bg-gradient-cyber text-bg-primary
                      px-4 py-2 rounded-lg hover:shadow-cyan transition-all duration-200 font-bold"
                  >
                    <UserCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </button>
                </>
              )
            )}
          </div>

        </div>
      </div>

      {/* Subtle bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent
        via-accent to-transparent opacity-30" />
    </header>
  );
};