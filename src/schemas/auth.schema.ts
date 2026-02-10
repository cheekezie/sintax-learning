import { z } from 'zod';
const phoneRegExp = /^(?:\+?234|0)?(?:70|71|80|81|90|91)\d{8}$|^(?:\+?44|0)7\d{9}$/;

export const LoginSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(2, 'Password is required'),
});

export type LoginForm = z.infer<typeof LoginSchema>;
