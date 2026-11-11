import { z } from "zod";

const email = z.string().trim().min(1, "Enter your email address").email("Enter a valid email address").max(120);

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password").max(100),
});

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80, "Name is too long"),
  email,
  password: z.string().min(8, "Use at least 8 characters").max(100, "Password is too long"),
});

export const codeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type SignupValues = z.infer<typeof signupSchema>;
export type CodeValues = z.infer<typeof codeSchema>;
