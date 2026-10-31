
'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Check, KeyRound } from 'lucide-react';
import { processResetPassword } from '../actions/resetPassword';

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);

    const reqs = {
        length: password.length > 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };

    const isFormValid = Object.values(reqs).every(Boolean) && password === confirmPassword && password.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid || !token) return;

        setIsLoading(true);
        setServerError('');

        const formData = new FormData();
        formData.append('token', token);
        formData.append('password', password);

        const response = await processResetPassword(null, formData);

        if (response?.success) {
            setSuccess(true);
            setTimeout(() => router.push('/login'), 2500);
        } else {
            setServerError(response?.message || "Password reset failed.");
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

    if (!token) {
        return (
            <div className="text-center">
                <AlertCircle className="w-12 h-12 text-[#DC2626] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[#263238] mb-2">Invalid Reset Link</h2>
                <p className="text-[#64748B] mb-6">No reset token was found in the URL.</p>
                <Link href="/forgot-password" className="text-[#315B91] hover:underline font-medium">Request a new link</Link>
            </div>
        );
    }

    return (
        <>
            <div className="mb-8 text-center">
                <div className="w-12 h-12 bg-[#142B50]/10 text-[#142B50] rounded-full flex items-center justify-center mx-auto mb-4">
                    <KeyRound size={24} />
                </div>
                <h1 className="text-2xl font-bold text-[#263238] mb-2">Set New Password</h1>
                <p className="text-sm text-[#64748B]">Please enter and confirm your new password below.</p>
            </div>

            {serverError && (
                <div className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#DC2626] font-medium">{serverError}</p>
                </div>
            )}

            {success ? (
                <div className="p-6 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg text-center">
                    <CheckCircle2 className="w-12 h-12 text-[#16A34A] mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#16A34A] mb-2">Password Reset Successfully!</h3>
                    <p className="text-sm text-[#263238]">Redirecting you to the login page...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                        <label className="block text-sm font-medium text-[#263238] mb-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create new password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#315B91] focus:outline-none focus:ring-2 focus:ring-[#315B91]/20 text-[#263238] pr-12"
                            />
                            <button
                                type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#263238] p-1"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {password && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 grid grid-cols-1 gap-1.5">
                                <RequirementItem met={reqs.length} text="At least 9 characters" />
                                <RequirementItem met={reqs.upper} text="One uppercase letter" />
                                <RequirementItem met={reqs.lower} text="One lowercase letter" />
                                <RequirementItem met={reqs.number} text="One number" />
                                <RequirementItem met={reqs.special} text="One special character" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#263238] mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#315B91] focus:outline-none focus:ring-2 focus:ring-[#315B91]/20 text-[#263238] pr-12"
                            />
                            <button
                                type="button" onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#263238] p-1"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {confirmPassword && password !== confirmPassword && (
                            <p className="mt-1 text-sm text-[#DC2626]">Passwords do not match.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !isFormValid}
                        className="w-full mt-4 bg-[#142B50] hover:bg-[#0f2140] text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none disabled:opacity-50 flex justify-center"
                    >
                        {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Reset Password'}
                    </button>
                </form>
            )}
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA] font-sans p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </div>
    );
}