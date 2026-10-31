'use server'

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const loginSchema = z.object({
    email: z.string().trim().email("Please enter a valid email address."),
    password: z.string()
        .min(9, "Password must be more than 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.")
});

export async function authenticateUser(prevState, formData) {
    try {
        const email = formData.get('email');
        const password = formData.get('password');
        const rememberMe = formData.get('rememberMe') === 'true';

        // 1. Server-side validation
        const validatedFields = loginSchema.safeParse({ email, password });

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        // --- DATABASE AUTHENTICATION (Activate once MySQL/Prisma is configured) ---
        /*
        // 2. Check if email exists
        const user = await prisma.user.findUnique({
          where: { email: validatedFields.data.email }
        });
    
        // 3. Generic invalid credentials message if user doesn't exist
        if (!user) {
          return { success: false, message: "Invalid email or password." };
        }
    
        // 4 & 5. Compare password hash and return generic error if incorrect
        const passwordMatch = await bcrypt.compare(validatedFields.data.password, user.passwordHash);
        if (!passwordMatch) {
          return { success: false, message: "Invalid email or password." };
        }
    
        // 6. Create secure session (Implementation depends on your chosen session library, e.g., iron-session or jose)
        // await createSession(user.id, rememberMe);
    
        // 7. Role-based redirect path evaluation
        let redirectPath = '/customer/dashboard';
        if (user.role === 'ADMIN') redirectPath = '/admin/dashboard';
        else if (user.role === 'STAFF') redirectPath = '/staff/dashboard';
    
        return { success: true, redirect: redirectPath };
        */

        // Temporary success response for UI testing
        return { success: true, redirect: '/dashboard-placeholder' };

    } catch (error) {
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}