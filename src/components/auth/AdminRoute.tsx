import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { selectCurrentUser, selectAuthInitialized } from '../../store/authSlice';

interface AdminRouteProps {
    children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
    const user = useAppSelector(selectCurrentUser);
    const initialized = useAppSelector(selectAuthInitialized);

    // Wait for auth to Initialize
    if (!initialized) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='animate-spin rounded-full w-12 h-12 border-4 border-accent border-t-transparent' />
            </div>
        );
    }

    // Not Logged In
    if (!user) {
        return <Navigate to='/login' replace />;
    }

    // Not an Admin
    if (!user.isAdmin) {
        return <Navigate to='/' replace />;
    }

    return <>{children}</>;
}