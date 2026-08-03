import { z } from 'zod';
const phoneRegExp = /^(?:\+?234|0)?(?:70|71|80|81|90|91)\d{8}$|^(?:\+?44|0)7\d{9}$/;

export const LoginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(2, 'Password is required'),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.email('Invalid email'),
});

export type ForgotPasswordForm = z.infer<typeof ForgotPasswordSchema>;

export const NewPasswordSchema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type NewPasswordForm = z.infer<typeof NewPasswordSchema>;

export type ResetPasswordForm = NewPasswordForm & { otp: string };
