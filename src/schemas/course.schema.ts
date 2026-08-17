import { z } from 'zod';
const phoneRegExp = /^(?:\+?234|0)?(?:70|71|80|81|90|91)\d{8}$|^(?:\+?44|0)7\d{9}$/;

export const CourseEnquirySchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'First name is required'),
  email: z.email('Invalid email'),
  phone: z.string().regex(phoneRegExp, 'Invalid phone number format'),
  message: z.string(),
  otherName: z.string(),
  track: z.string().optional(),
});

// `track` is only compulsory for courses that actually have tracks
export const getCourseEnquirySchema = (requireTrack: boolean) =>
  requireTrack
    ? CourseEnquirySchema.superRefine((data, ctx) => {
        if (!data.track) {
          ctx.addIssue({ path: ['track'], message: 'Track is required', code: 'custom' });
        }
      })
    : CourseEnquirySchema;

export const EnrolCourseSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'First name is required'),
    email: z.email('Invalid email'),
    phone: z.string().regex(phoneRegExp, 'Invalid phone number format'),
    deliveryMode: z.string('Class format required'),
    city: z.string().optional(),
    otherName: z.string(),
    track: z.string().optional(),
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

// `track` is only compulsory for courses that actually have tracks
export const getEnrolCourseSchema = (requireTrack: boolean) =>
  requireTrack
    ? EnrolCourseSchema.superRefine((data, ctx) => {
        if (!data.track) {
          ctx.addIssue({ path: ['track'], message: 'Track is required', code: 'custom' });
        }
      })
    : EnrolCourseSchema;

export type CourseEnquiryForm = z.infer<typeof CourseEnquirySchema>;
