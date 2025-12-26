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
  level: string;
  learningOutcomes: string[];
  tags: string[];
  category: string;
  curriculum: { title: string; outline: { lesson: string; order: number }[] }[];
  instructors: any[];
  learningMode: 'cohort' | 'on-demand' | 'hybrid';
  instrctirLed: boolean;
  cohortDuration: number;
  createdAt: string;
  cohortStartDate: string;
  cohortEndDate: string;
}
