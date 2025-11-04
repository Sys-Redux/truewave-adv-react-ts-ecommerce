import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch.ts';
import { login, selectAuthLoading, selectAuthError, clearError } from '../store/authSlice.ts';
import { Toaster } from 'react-hot-toast';
import { errorfulToast, successfulToast } from '../utils/toasts.ts';

export const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    // Form state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Get redirect path after login
    const from = (location.state as { from: string } | undefined)?.from || '/';

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            errorfulToast('❌ Please fill in all fields');
            return;
        }

        // Dispatch login thunk
        const result = await dispatch(login({ email, password }));

        // Check if login succeeded
        if (login.fulfilled.match(result)) {
            successfulToast('Welcome back! 😀');
            dispatch(clearError());
            navigate(from, { replace: true });
        } else {
            // Error handled by Redux state and displayed below
            errorfulToast(error || '❌ Login failed');
        };
    };


    return (
        <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12'>
            {/* Background effects */}
            <div className='absolute inset-0 bg-linear-to-br from-accent/5 via-transparent
                to-secondary/5 pointer-events-none' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]
                pointer-events-none' />

            {/* Login Card */}
            <div className='relative w-full max-w-md'>
                <div className='bg-bg-secondary border border-border rounded-2xl shadow-xl p-8 backdrop-blur-sm'>

                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-cyber
                            rounded-xl mb-4 shadow-cyan'>
                            <LogIn className='w-8 h-8 text-bg-primary' />
                        </div>
                        <h1 className='text-3xl font-bold mb-2'>
                            <span className='text-gradient-cyber'>Welcome Back</span>
                        </h1>
                        <p className='text-text-muted font-mono text-sm'>
                            // Sign in to your account
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className='mb-6 p-4 bg-error/10 border border-error/50 rounded-lg
                            flex items-start gap-3'>
                            <AlertCircle className='w-5 h-5 text-error shrink-0 mt-0.5' />
                            <div>
                                <p className='text-error text-sm font-medium'>Authentication Failed</p>
                                <p className='text-error/80 text-sm mt-1'>{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>

                        {/* Email Field */}
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium
                                text-text-secondary mb-2 font-mono'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted' />
                                <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                                        text-text-primary placeholder:text-text-muted transition-all'
                                    placeholder='Enter your email'
                                    disabled={loading}
                                    autoComplete='email'
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium
                                text-text-secondary mb-2 font-mono'>
                                Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted' />
                                <input
                                    id='password'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                                        text-text-primary placeholder:text-text-muted transition-all'
                                    placeholder='••••••••'
                                    disabled={loading}
                                    autoComplete='current-password'
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 bg-gradient-cyber text-bg-primary font-bold rounded-lg
                                hover:shadow-cyan transition-all duration-200 disabled:opacity-50
                                disabled:cursor-not-allowed flex items-center justify-center gap-2 group'
                        >
                            {loading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary
                                        rounded-full animate-spin' />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className='w-5 h-5 group-hover:translate-x-0.5 transition-transform' />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-8'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-border' />
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-bg-secondary text-text-muted font-mono'>
                                or
                            </span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className='text-center'>
                        <p className='text-text-muted text-sm'>
                            Don't have an account?{' '}
                            <Link
                                to='/register'
                                className='text-accent hover:text-accent/80 font-medium transition-colors'
                            >
                                Create one now
                            </Link>
                        </p>
                    </div>

                    {/* Footer Note */}
                    <div className='mt-8 pt-6 border-t border-border'>
                        <p className='text-center text-text-muted text-xs font-mono'>
                            🔒 Secured by Firebase Authentication
                        </p>
                    </div>
                </div>

                {/* Decorative Glow */}
                <div className='absolute -inset-1 bg-linear-to-r from-accent/20 to-secondary/20
                    rounded-2xl blur-xl -z-10 opacity-50' />
            </div>
            <Toaster />
        </div>
    );
};