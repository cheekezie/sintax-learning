import type { CoursePricngI } from './cohort.interface';
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
