// src/app/actions/resetPassword.js
'use server'

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import prisma from '../../lib/prisma';
import { z } from 'zod';

const resetSchema = z.object({
    token: z.string().min(1, "Reset token is missing."),
    password: z.string()
        .min(9, "Password must be more than 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.")
});

export async function processResetPassword(prevState, formData) {
    try {
        const rawToken = formData.get('token');
        const password = formData.get('password');

        const validated = resetSchema.safeParse({ token: rawToken, password });

        if (!validated.success) {
            return { success: false, errors: validated.error.flatten().fieldErrors };
        }

        const hashedToken = crypto.createHash('sha256').update(validated.data.token).digest('hex');

        // Find valid token
        const dbToken = await prisma.passwordResetToken.findUnique({
            where: { token: hashedToken },
            include: { user: true }
        });

        if (!dbToken || dbToken.expiresAt < new Date()) {
            return { success: false, message: "This password reset link is invalid or has expired." };
        }

        // Hash the new password
        const passwordHash = await bcrypt.hash(validated.data.password, 10);

        // Update password and delete all reset tokens for this user
        await prisma.$transaction([
            prisma.user.update({
                where: { id: dbToken.userId },
                data: { passwordHash }
            }),
            prisma.passwordResetToken.deleteMany({
                where: { userId: dbToken.userId }
            })
        ]);

        return { success: true };
    } catch (error) {
        console.error("Reset password error:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}