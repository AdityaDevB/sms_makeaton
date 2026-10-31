'use server'

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const signupSchema = z.object({
    name: z.string().trim().min(1, "Full name is required."),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
    password: z.string()
        .min(9, "Password must be more than 8 characters.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number.")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character.")
});

export async function registerUser(prevState, formData) {
    try {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        const validatedFields = signupSchema.safeParse({ name, email, password });

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const validData = validatedFields.data;



        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validData.email }
        });

        if (existingUser) {
            return { success: false, message: "This email address is already registered." };
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(validData.password, saltRounds);

        // Create user with forced CUSTOMER role
        await prisma.user.create({
            data: {
                name: validData.name,
                email: validData.email,
                passwordHash: passwordHash,
                role: 'CUSTOMER',
            }
        });

        return { success: true };


        // Temporary success response for UI testing
        return { success: true };

    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "An unexpected error occurred during registration. Please try again." };
    }
}