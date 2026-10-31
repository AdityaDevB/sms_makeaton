'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { registerUser } from '../actions/signup';

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

    // Password Requirements State
    const reqs = {
        length: formData.password.length > 8,
        upper: /[A-Z]/.test(formData.password),
        lower: /[a-z]/.test(formData.password),
        number: /[0-9]/.test(formData.password),
        special: /[^A-Za-z0-9]/.test(formData.password)
    };

    const score = Object.values(reqs).filter(Boolean).length;
    const strengthLabel = score <= 2 ? "Weak" : score <= 4 ? "Medium" : "Strong";
    const strengthColor = score <= 2 ? "text-[#DC2626]" : score <= 4 ? "text-[#D97706]" : "text-[#16A34A]";
    const isFormValid = formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        score === 5 &&
        formData.password === formData.confirmPassword &&
        formData.agreeTerms;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        setServerError('');
        setErrors({});

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('password', formData.password);

        const response = await registerUser(null, submitData);

        if (response?.success) {
            setSuccess(true);
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else if (response?.errors) {
            setErrors(response.errors);
            setIsLoading(false);
        } else {
            setServerError(response?.message || "Registration failed.");
            setIsLoading(false);
        }
    };

    const RequirementItem = ({ met, text }) => (
        <div className={`flex items-center gap-2 text-sm ${met ? 'text-[#16A34A]' : 'text-[#64748B]'}`}>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${met ? 'bg-[#16A34A] border-[#16A34A]' : 'border-[#64748B]'}`}>
                {met && <Check size={10} className="text-white" />}
            </div>
            {text}
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#F3F6FA] font-sans">
            {/* Left Section */}
            <div className="hidden md:flex md:w-1/2 bg-[#142B50] text-white p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#315B91] opacity-20 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#16A34A] opacity-10 blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Brightloop<span className="text-[#315B91]">.</span></h1>
                </div>

                <div className="relative z-10 max-w-md">
                    <h2 className="text-4xl font-semibold mb-6 leading-tight">Start Your Journey with Brightloop.</h2>
                    <p className="text-[#F3F6FA] text-lg opacity-90 mb-8">
                        Manage your subscriptions, billing and business operations in one place.
                    </p>

                    <div className="bg-white/10 p-6 rounded-xl border border-white/20 backdrop-blur-sm">
                        <div className="flex gap-3 mb-4">
                            <div className="w-8 h-8 rounded bg-[#16A34A]/80"></div>
                            <div className="w-8 h-8 rounded bg-[#315B91]/80"></div>
                            <div className="w-8 h-8 rounded bg-white/20"></div>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full mb-3"></div>
                        <div className="w-4/5 h-2 bg-white/10 rounded-full"></div>
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-60">
                    &copy; {new Date().getFullYear()} Brightloop Software. All rights reserved.
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-8">
                    <div className="md:hidden mb-8">
                        <h1 className="text-2xl font-bold text-[#142B50]">Brightloop<span className="text-[#315B91]">.</span></h1>
                    </div>

                    <h2 className="text-3xl font-bold text-[#263238] mb-2">Create Your Account</h2>
                    <p className="text-[#64748B] mb-8">Join Brightloop and manage your subscriptions effortlessly.</p>

                    {serverError && (
                        <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#DC2626] font-medium">{serverError}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                            <p className="text-sm text-[#16A34A] font-medium">Account created successfully! Redirecting to login...</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[#263238] mb-1">Full Name</label>
                            <input
                                id="name" name="name" type="text"
                                placeholder="Enter your full name"
                                required
                                value={formData.name} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-[#DC2626]' : 'border-gray-300'} focus:border-[#315B91] focus:ring-[#315B91] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238]`}
                            />
                            {errors.name && <p className="mt-1 text-sm text-[#DC2626]">{errors.name[0]}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#263238] mb-1">Email Address</label>
                            <input
                                id="email" name="email" type="email"
                                placeholder="Enter your email address"
                                required
                                value={formData.email} onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-[#DC2626]' : 'border-gray-300'} focus:border-[#315B91] focus:ring-[#315B91] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238]`}
                            />
                            {errors.email && <p className="mt-1 text-sm text-[#DC2626]">{errors.email[0]}</p>}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#263238] mb-1">Password</label>
                            <div className="relative">
                                <input
                                    id="password" name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    required
                                    value={formData.password} onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-[#DC2626]' : 'border-gray-300'} focus:border-[#315B91] focus:ring-[#315B91] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238] pr-12`}
                                />
                                <button
                                    type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#263238] p-1"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-[#64748B]">Password Strength:</span>
                                        <span className={`text-xs font-bold ${strengthColor}`}>{strengthLabel}</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1.5">
                                        <RequirementItem met={reqs.length} text="At least 9 characters" />
                                        <RequirementItem met={reqs.upper} text="One uppercase letter" />
                                        <RequirementItem met={reqs.lower} text="One lowercase letter" />
                                        <RequirementItem met={reqs.number} text="One number" />
                                        <RequirementItem met={reqs.special} text="One special character" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#263238] mb-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    id="confirmPassword" name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    required
                                    value={formData.confirmPassword} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#315B91] focus:ring-[#315B91] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238] pr-12"
                                />
                                <button
                                    type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#263238] p-1"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-1 text-sm text-[#DC2626]">Passwords do not match.</p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-start mt-2">
                            <input
                                id="agreeTerms" name="agreeTerms" type="checkbox"
                                checked={formData.agreeTerms} onChange={handleChange}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#142B50] focus:ring-[#315B91] cursor-pointer"
                            />
                            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-[#64748B]">
                                I agree to the <Link href="#" className="text-[#315B91] hover:underline">Terms and Conditions</Link> and <Link href="#" className="text-[#315B91] hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || success || !isFormValid}
                            className="w-full mt-4 bg-[#142B50] hover:bg-[#0f2140] text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#142B50]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-6 text-center text-sm text-[#64748B]">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-[#315B91] hover:text-[#142B50] transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}