// src/app/actions/forgotPassword.js
'use server'

import crypto from 'crypto';
import prisma from '../../lib/prisma';
import { sendPasswordResetEmail } from '../../lib/mailer';
import { z } from 'zod';

const emailSchema = z.object({
    email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
});

export async function processForgotPassword(prevState, formData) {
    try {
        const email = formData.get('email');
        const validated = emailSchema.safeParse({ email });

        if (!validated.success) {
            return { success: false, error: validated.error.errors[0].message };
        }

        const validEmail = validated.data.email;
        const user = await prisma.user.findUnique({ where: { email: validEmail } });

        // Always return a generic success message to prevent email enumeration
        const genericSuccessMsg = "If an account with that email exists, a password reset link has been sent.";

        if (!user) {
            return { success: true, message: genericSuccessMsg };
        }

        // Generate a secure random token for the email link
        const rawToken = crypto.randomBytes(32).toString('hex');

        // Hash the token for database storage (prevents DB compromise from exposing active links)
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Invalidate previous tokens for this user and create the new one
        await prisma.$transaction([
            prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
            prisma.passwordResetToken.create({
                data: {
                    token: hashedToken,
                    expiresAt,
                    userId: user.id,
                }
            })
        ]);

        await sendPasswordResetEmail(user.email, rawToken);

        return { success: true, message: genericSuccessMsg };
    } catch (error) {
        console.error("Forgot password error:", error);
        return { success: false, error: "An unexpected error occurred. Please try again." };
    }
}