export interface CohortI {
  title: string;
  maxStudents: number;
  enrolledCount: number;
  mode: 'virtual' | 'in-person' | 'hybrid';
  status: 'draft' | 'active' | 'completed' | 'closed';
  duration: number; // in weeks
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  basePrice: {
    amount: number;
    currency: 'GBP' | 'USD' | 'NGN';
  };
  pricing: CoursePricngI[];
}

export interface CoursePricngI {
  amount: number;
  country: string;
  currency: 'NGN' | 'GBP' | 'USD';
}
