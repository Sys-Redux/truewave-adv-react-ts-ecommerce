import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectIsAuthenticated, selectAuthInitialized } from '../../store/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

// Route guard component that requires authentication
// Waits for firebase onAuthStateChanged to finish
// If not authenticated, redirects to /login w/ return URL
// If authenticated, renders the protected content

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const authInitialized = useAppSelector(selectAuthInitialized);
    const location = useLocation();

    // Show loading spinner while firebase auth state is initializing
    if (!authInitialized) {
        return (
            <div className='flex items-center justify-center min-h-[calc(100vh-4rem)]'>
                <div className='text-center space-y-4'>
                    <div className='relative w-16 h-16 mx-auto'>
                        <div className='absolute inset-0 border-4 border-bg-elevated border-t-accent
                            rounded-full animate-spin shadow-cyan' />
                        <div className='absolute inset-2 border-4 border-transparent border-b-secondary
                            rounded-full animate-spin'
                            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    </div>
                    <p className='text-text-secondary text-sm font-mono'>Initializing Authentication...</p>
                    <div className='flex items-center justify-center gap-1'>
                        <div className='w-2 h-2 bg-accent rounded-full animate-pulse' />
                        <div className='w-2 h-2 bg-accent rounded-full animate-pulse' style={{ animationDelay: '0.2s' }} />
                        <div className='w-2 h-2 bg-accent rounded-full animate-pulse' style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <>{children}</>;
};