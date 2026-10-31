
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { processForgotPassword } from '../actions/forgotPassword';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Save form reference before async operation
        const form = e.currentTarget;

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const formData = new FormData(form);

            const response = await processForgotPassword(null, formData);

            if (response?.success) {
                setStatus({
                    type: 'success',
                    message: response.message
                });

                form.reset();
            } else {
                setStatus({
                    type: 'error',
                    message: response?.error || "Request failed."
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: "Something went wrong. Please try again."
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F6FA] font-sans p-6">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="mb-8 text-center">
                    <div className="w-12 h-12 bg-[#142B50]/10 text-[#142B50] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-[#263238] mb-2">Forgot Password?</h1>
                    <p className="text-sm text-[#64748B]">
                        Don't worry! Enter your registered email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {status.message && (
                    <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 border ${status.type === 'error' ? 'bg-[#DC2626]/10 border-[#DC2626]/20' : 'bg-[#16A34A]/10 border-[#16A34A]/20'}`}>
                        {status.type === 'error' ? (
                            <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                        ) : (
                            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                        )}
                        <p className={`text-sm font-medium ${status.type === 'error' ? 'text-[#DC2626]' : 'text-[#16A34A]'}`}>
                            {status.message}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#263238] mb-2">Email Address</label>
                        <input
                            id="email" name="email" type="email"
                            placeholder="Enter your email address"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#315B91] focus:ring-[#315B91] focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-colors text-[#263238]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || status.type === 'success'}
                        className="w-full bg-[#142B50] hover:bg-[#0f2140] text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-[#142B50]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#142B50] transition-colors">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}