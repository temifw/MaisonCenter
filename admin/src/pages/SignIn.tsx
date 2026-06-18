import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const { login } = useAuth();

    // Reaching the sign-in screen ends any existing session, so the
    // "Sign Out" links throughout the app (which point here) just work.
    useEffect(() => {
        localStorage.removeItem('authToken');
    }, []);
    const [showPassword, setShowPassword] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsAuthenticating(true);
        try {
            const user = await login(email, password);
            if (!user.isStaff) {
                setError('This account is not authorized for staff access.');
                localStorage.removeItem('authToken');
                return;
            }
            window.location.href = '/dashboard';
        } catch (err: any) {
            if (err?.response?.data?.error) {
                // Server responded with a real error (e.g. wrong password).
                setError(err.response.data.error);
            } else if (err?.response) {
                setError(`Server error (${err.response.status}). Check the API logs.`);
            } else {
                // No response at all => the API server wasn't reachable.
                setError('Cannot reach the API at http://localhost:3000. Is the backend running (npm run dev) and is the .env loaded?');
            }
        } finally {
            setIsAuthenticating(false);
        }
    };

    return (
        <div className="bg-surface text-on-surface min-h-screen flex items-center justify-center relative overflow-hidden w-full">
            {/* Background Image with Prompt */}
            <div className="absolute inset-0 z-0">
                <img alt="Luxury Hotel Lobby" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8ToRYuiKhF_amzFvxGXe59xq5Zrk32BJalsnzxiTCfpjGAoSJbMLgDT9azdZJ68s7sJIa0XXz42GpW7JezrydFHQsy-CDa2HufUO8S0rV3xUDbDmiyCGO51OKLExbCY4HkJJHOR56OeHClWUNwF3Uc8ErAbixTDLFIRDf_dTMmZDRj0wE-XnY5Xp_Cti8oO2n5wrFmIW26wj_W_spuT-8NNSrQaWpg-hDQvfeJmDrwz1AGVwCnl9MXET9XEX1_xPxo3hCUOvhdcg" />
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-[rgba(0,21,42,0.85)] to-[rgba(16,42,67,0.4)]"></div>
            </div>
            
            {/* Main Content Canvas */}
            <main className="relative z-20 w-full max-w-md px-md">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-xl">
                    <div className="bg-primary-container p-sm rounded-xl mb-md">
                        <span className="material-symbols-outlined text-primary-fixed text-[32px]">domain</span>
                    </div>
                    <h1 className="font-h2 text-h2 font-bold text-surface-container-lowest tracking-tight">LuxStay Management</h1>
                    <p className="font-body-md text-body-md text-on-primary-container mt-xs">Enterprise Property Solutions</p>
                </div>
                
                {/* Login Card */}
                <div className="bg-surface-container-lowest rounded-xl p-xl flex flex-col gap-lg border border-outline-variant/30 shadow-[0_20px_40px_rgba(16,42,67,0.08)] backdrop-blur-[10px]">
                    <header>
                        <h2 className="font-h3 text-h3 text-primary mb-xs">Sign In</h2>
                        <p className="font-body-sm text-body-sm text-secondary">Please enter your credentials to access the dashboard.</p>
                    </header>
                    {error && (
                        <div className="bg-error-container text-error rounded-lg px-md py-sm font-body-sm text-body-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">error</span>
                            {error}
                        </div>
                    )}
                    <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">mail</span>
                                <input className="w-full pl-[48px] pr-md py-md bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" id="email" name="email" placeholder="admin@luxstay.com" required type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        
                        {/* Password Field */}
                        <div className="flex flex-col gap-xs">
                            <div className="flex justify-between items-center">
                                <label className="font-label-bold text-label-bold text-on-surface-variant" htmlFor="password">Password</label>
                                <a className="font-label-bold text-label-bold text-primary hover:underline transition-all" href="#">Forgot Password?</a>
                            </div>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">lock</span>
                                <input className="w-full pl-[48px] pr-md py-md bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all" id="password" name="password" placeholder="••••••••" required type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <button className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors" onClick={togglePassword} type="button">
                                    <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
                                </button>
                            </div>
                        </div>
                        
                        {/* Remember Me */}
                        <div className="flex items-center gap-sm mt-xs">
                            <input className="w-4 h-4 text-primary bg-surface border-outline-variant rounded focus:ring-primary-container" id="remember" name="remember" type="checkbox"/>
                            <label className="font-body-sm text-body-sm text-secondary cursor-pointer select-none" htmlFor="remember">Remember Me</label>
                        </div>
                        
                        {/* Action Button */}
                        <button className="w-full bg-primary text-on-primary py-md px-lg rounded-lg font-h3 text-h3 flex items-center justify-center gap-sm hover:bg-primary/90 active:scale-[0.98] transition-all mt-md shadow-md" type="submit" disabled={isAuthenticating}>
                            {isAuthenticating ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span> Authenticating...
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                </>
                            )}
                        </button>
                    </form>
                    <footer className="border-t border-surface-container pt-lg mt-sm">
                        <p className="font-body-sm text-body-sm text-on-surface-variant text-center">
                            Authorized access only. By signing in, you agree to our 
                            <a className="text-primary font-medium hover:underline ml-1" href="#">Terms of Service</a>.
                        </p>
                    </footer>
                </div>
                
                {/* System Status/Help */}
                <div className="mt-xl flex justify-between items-center px-sm">
                    <div className="flex items-center gap-xs">
                        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                        <span className="font-label-bold text-label-bold text-surface-container-lowest">System Online</span>
                    </div>
                    <a className="flex items-center gap-xs text-surface-container-lowest font-label-bold text-label-bold hover:text-primary-fixed transition-colors" href="#">
                        <span className="material-symbols-outlined text-[16px]">help_outline</span>
                        Contact Support
                    </a>
                </div>
            </main>
            
            {/* Footer Copyright */}
            <footer className="absolute bottom-margin left-0 right-0 z-20 text-center">
                <p className="font-body-sm text-body-sm text-on-primary-container/60">
                    © 2024 LuxStay Management. All rights reserved. Secure Server Node L-04.
                </p>
            </footer>
        </div>
    );
};

export default SignIn;
