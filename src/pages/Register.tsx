import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch.ts';
import { register, selectAuthLoading, selectAuthError, clearError } from '../store/authSlice.ts';
import { Toaster } from 'react-hot-toast';
import { errorfulToast, successfulToast } from '../utils/toasts.ts';

export const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    // Form state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    // Password strength indicator
    const getPasswordStrength = (pwd: string) => {
        if (pwd.length === 0) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;

        const labels = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
        const colors = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#059669'];

        return { strength, label: labels[strength], color: colors[strength] };
    };

    const passwordStrength = getPasswordStrength(password);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Reset previous errors
        setPasswordError('');
        dispatch(clearError());

        // Validation
        if (!email || !password || !confirmPassword || !displayName) {
            errorfulToast('Please fill in all fields');
            return;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            errorfulToast('❌ Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            errorfulToast('❌ Passwords do not match');
            return;
        }

        // Dispatch register thunk
        const result = await dispatch(register({
            email,
            password,
            displayName,
        }));

        // Check if registration succeeded
        if (register.fulfilled.match(result)) {
            successfulToast('Account created successfully! 🎉🎉');
            dispatch(clearError());
            navigate('/'); // To Home Page
        } else {
            errorfulToast(error || '❌ Registration failed');
        }
    };


    return (
        <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12'>
        <Toaster />
            {/* Background effects */}
            <div className='absolute inset-0 bg-linear-to-br from-secondary/5 via-transparent
                to-accent/5 pointer-events-none' />
            <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]
                pointer-events-none' />

            {/* Register Card */}
            <div className='relative w-full max-w-md'>
                <div className='bg-bg-secondary border border-border rounded-2xl shadow-xl p-8 backdrop-blur-sm'>

                    {/* Header */}
                    <div className='text-center mb-8'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-linear-to-r
                            from-secondary to-accent rounded-xl mb-4 shadow-purple'>
                            <UserPlus className='w-8 h-8 text-bg-primary' />
                        </div>
                        <h1 className='text-3xl font-bold mb-2'>
                            <span className='text-gradient-cyber'>Create an Account</span>
                        </h1>
                        <p className='text-text-muted font-mono text-sm'>
                            // Join the TrueWave for additional benefits
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className='mb-6 p-5 bg-error/10 border border-error/50 rounded-lg
                            flex items-start gap-3'>
                            <AlertCircle className='w-5 h-5 text-error shrink-0 mt-0.5' />
                            <div>
                                <p className='text-error text-sm font-medium'>Registration Failed</p>
                                <p className='text-error/80 text-sm mt-1'>{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className='space-y-5'>

                        {/* Display Name Field */}
                        <div>
                            <label htmlFor='displayName' className='block text-sm font-medium
                                text-text-secondary mb-2 font-mono'>
                                Display Name
                            </label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted' />
                                <input
                                    type='text'
                                    id='displayName'
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                                        text-text-primary placeholder:text-text-muted transition-all'
                                    placeholder='Your display name'
                                    disabled={loading}
                                    autoComplete='name'
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium
                                text-text-secondary mb-2 font-mono'>
                                Email Address
                            </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted' />
                                <input
                                    type='email'
                                    id='email'
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
                                    type='password'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                                        text-text-primary placeholder:text-text-muted transition-all'
                                    placeholder='••••••••'
                                    disabled={loading}
                                    autoComplete='new-password'
                                    required
                                />
                            </div>

                            {/* Password Strength Indicator */}
                            {password && (
                                <div className='mt-2 space-y-1'>
                                    <div className='flex gap-1'>
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-all ${
                                                    level <= passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-bg-elevated'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    {passwordStrength.label && (
                                        <p className='text-xs text-text-muted font-mono'>
                                            Strength:
                                            <span className='text-text-secondary'>{passwordStrength.label}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor='confirmPassword' className='block text-sm font-medium
                                text-text-secondary mb-2 font-mono'>
                                Confirm Password
                            </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted' />
                                <input
                                    type='password'
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='w-full pl-11 pr-4 py-3 bg-bg-elevated border border-border rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
                                        text-text-primary placeholder:text-text-muted transition-all'
                                    placeholder='••••••••'
                                    disabled={loading}
                                    autoComplete='new-password'
                                    required
                                />
                                {confirmPassword && password === confirmPassword && (
                                    <CheckCircle className='absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success' />
                                )}
                            </div>
                            {passwordError && (
                                <p className='mt-1 text-sm text-error'>{passwordError}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full py-3 bg-linear-to-r from-secondary to-accent text-bg-primary font-bold
                                rounded-lg hover:shadow-purple transition-all duration-200 disabled:opacity-50
                                disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-6'
                        >
                            {loading ? (
                                <>
                                    <div className='w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary
                                        rounded-full animate-spin' />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className='w-5 h-5 group-hover:scale-110 transition-transform' />
                                    <span>Create Account</span>
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
                            <span className='bg-bg-secondary px-4 text-text-muted font-mono'>
                                or
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className='text-center'>
                        <p className='text-text-muted text-sm'>
                            Already have an account?{' '}
                            <Link
                                to='/login'
                                className='text-accent hover:text-accent/80 font-mono font-medium
                                    hover:underline transition-colors'
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>

                    {/* Terms Note */}
                    <div className='mt-6 pt-6 border-t border-border'>
                        <p className='text-center text-text-muted text-xs leading-relaxed'>
                            By creating an account, you agree to our{' '}
                            <span className='text-accent font-medium'>Terms of Service</span>
                            {' '}and{' '}
                            <span className='text-accent font-medium'>Privacy Policy</span>.
                        </p>
                    </div>
                </div>

                {/* Decorative glow effect */}
                <div className='absolute -inset-1 bg-linear-to-r from-secondary/20 to-accent/20
                    rounded-2xl blur-xl -z-10 opacity-50' />
            </div>
        </div>
    );
};