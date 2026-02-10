import { z } from 'zod';
const phoneRegExp = /^(?:\+?234|0)?(?:70|71|80|81|90|91)\d{8}$|^(?:\+?44|0)7\d{9}$/;

export const CourseEnquirySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'First name is required'),
  email: z.email('Invalid email'),
  phone: z.string().regex(phoneRegExp, 'Invalid phone number format'),
  message: z.string(),
  otherName: z.string(),
});

export const EnrolCourseSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'First name is required'),
    email: z.email('Invalid email'),
    phone: z.string().regex(phoneRegExp, 'Invalid phone number format'),
    deliveryMode: z.string('Class format required'),
    city: z.string().optional(),
    otherName: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.deliveryMode === 'in-person' && !data.city) {
      ctx.addIssue({
        path: ['city'],
        message: 'City is required for in-person lessons',
        code: 'custom',
      });
    }
  });

export type CourseEnquiryForm = z.infer<typeof CourseEnquirySchema>;
