'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { authenticateUser } from '../actions/auth';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateForm = (email, password) => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            newErrors.email = ["Please enter a valid email address."];
        }

        const passwordErrors = [];
        if (password.length <= 8) passwordErrors.push("More than 8 characters.");
        if (!/[A-Z]/.test(password)) passwordErrors.push("At least one uppercase letter.");
        if (!/[a-z]/.test(password)) passwordErrors.push("At least one lowercase letter.");
        if (!/[0-9]/.test(password)) passwordErrors.push("At least one number.");
        if (!/[^A-Za-z0-9]/.test(password)) passwordErrors.push("At least one special character.");

        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setServerError('');
        setErrors({});

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email').trim();
        const password = formData.get('password');
        formData.set('email', email); // Update with trimmed email

        if (!validateForm(email, password)) {
            setIsLoading(false);
            return;
        }

        const response = await authenticateUser(null, formData);

        if (response?.success) {
            setSuccess(true);
            // In production: router.push(response.redirect);
            setTimeout(() => alert(`Redirecting to: ${response.redirect}`), 1000);
        } else if (response?.errors) {
            setErrors(response.errors);
            setIsLoading(false);
        } else {
            setServerError(response?.message || "Authentication failed.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F3F6FA] font-sans">
            {/* Left Section - Branding & Illustration */}
            <div className="hidden md:flex md:w-1/2 bg-[#142B50] text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Abstract Decorative Shapes */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#315B91] opacity-20 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#16A34A] opacity-10 blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Brightloop<span className="text-[#315B91]">.</span></h1>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-semibold mb-6 leading-tight">Streamline your business subscriptions.</h2>
                    <p className="text-[#F3F6FA] text-lg opacity-90 mb-8">
                        The all-in-one management platform designed to help you track, analyze, and optimize your software expenses seamlessly.
                    </p>

                    {/* Abstract Data Representation UI */}
                    <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-[#315B91] flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-sm"></div>
                            </div>
                            <div>
                                <div className="w-24 h-2 bg-white/40 rounded-full mb-2"></div>
                                <div className="w-32 h-2 bg-white/20 rounded-full"></div>
                            </div>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-[#16A34A]"></div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-60">
                    &copy; {new Date().getFullYear()} Brightloop Software. All rights reserved.
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="md:hidden mb-8">
                        <h1 className="text-2xl font-bold text-[#142B50]">Brightloop<span className="text-[#315B91]">.</span></h1>
                    </div>

                    <h2 className="text-3xl font-bold text-[#263238] mb-2">Welcome Back</h2>
                    <p className="text-[#64748B] mb-8">Sign in to manage your subscriptions.</p>

                    {serverError && (
                        <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#DC2626] font-medium">{serverError}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#16A34A] font-medium">Authentication successful! Redirecting...</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#263238] mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-[#DC2626] focus:ring-[#DC2626]' : 'border-gray-300 focus:border-[#315B91] focus:ring-[#315B91]'
                                    } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238]`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-[#DC2626]">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#263238] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-[#DC2626] focus:ring-[#DC2626]' : 'border-gray-300 focus:border-[#315B91] focus:ring-[#315B91]'
                                        } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238] pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#263238] transition-colors p-1"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <ul className="mt-2 text-sm text-[#DC2626] list-disc list-inside space-y-1">
                                    {errors.password.map((err, index) => (
                                        <li key={index}>{err}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Form Options */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    value="true"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-[#142B50] focus:ring-[#315B91] cursor-pointer"
                                />
                                <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#64748B] cursor-pointer">
                                    Remember Me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-sm font-medium text-[#315B91] hover:text-[#142B50] transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || success}
                            className="w-full bg-[#142B50] hover:bg-[#0f2140] text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#142B50]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="mt-8 text-center text-sm text-[#64748B]">
                        Don't have an account?{' '}
                        <Link href="/signup" className="font-medium text-[#315B91] hover:text-[#142B50] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}