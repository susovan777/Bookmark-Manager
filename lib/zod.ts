// Path: lib\zod.ts

import { z } from 'zod';

// signInSchema validates the login form data
export const signInSchema = z.object({
  // z.string().email() works in both Zod v3 and v4
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// signUpSchema for register page — extends signIn with name
export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

// Export types so can be use them in components with TypeScript
export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
