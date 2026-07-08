import type { CohortI, CoursePricngI } from './cohort.interface';
import type { UserI } from './user.interface';

export interface CourseI {
  _id: string;
  title: string;
  code: string;
  bannerImage: string;
  thumbnail: string;
  author: UserI;
  owner: {
    internal: boolean;
    name: string;
  };
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  learningOutcomes: string[];
  tags: string[];
  category: string;
  curriculum: CurriculumI[];
  instructors: any[];
  learningMode: 'cohort' | 'on-demand' | 'hybrid';
  instrctirLed: boolean;
  cohortDuration: number;
  createdAt: string;
  cohortStartDate: string;
  cohortEndDate: string;
  pricing: CoursePricngI;
  discount: {
    originalPrice: number;
    percentage: number
  };
  availability: ['online', 'in-person'];
  locationAvailability?: {
    country: string; // ISO code: 'NG', 'GB'
    city: string; // 'Lagos', 'London'
  }[];
}
export interface CurriculumI {
  title: string;
  outline: { lesson: LessonI; order: number }[];
}

export interface LessonI {
  title: string;
  description: string;
  curriculum: string;
  modality: 'live' | 'self-paced';
  delivery: 'online' | 'in-person';
  mode: 'live-online' | 'in-person' | 'self-paced';
  createdAt: Date;
  order: number;
  estimatedDuration: number;
  resources: any[];
  tags: string[];
}

export interface CourseEnquiryPayloadI {
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  phone: string;
  message: string;
  courseId: string;
}
export interface CourseRegisterPayloadI {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryMode: string;
  city: string;
  otherName: string;
  courseId: string;
}

export interface EnrollmnentI {
  _id: string;
  cohort: CohortI | string;
  course: CourseI;
  user: any;
  amount: number;
  createdAt: string;
  date: string;
  discount: number;
  extraCharge: number;
  paymentPlan: 'full' | 'installment';
  progress: number;
  status: 'pending' | 'in-progress' | 'completed';
  paymentStatus: 'pending' | 'in-progress' | 'paid'
  totalPaid: number;
  updatedAt: string;
  totalLessons: number;
  lessonsCompleted: number
  enrolleeCount: number;
  enrollees: [
    {
      fullName: string;
      avatar: string
    }
  ]
}
export interface MyEnrollmnentI extends EnrollmnentI {
  totalLessons: number;
  lessonsCompleted: number
  enrolleeCount: number;
  enrollees: [
    {
      fullName: string;
      avatar: string
    }
  ]
}

export interface PaginatedResponseI<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}