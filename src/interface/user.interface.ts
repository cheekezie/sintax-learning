export interface UserI {
  membership_id: string;
  firstName: string;
  otherName: string;
  lastName: string;
  fullName: string;
  profilePhoto: string;
  location: string;
  country: string;
  email: string;
  phone: string;
  address: string;
  role: 'student' | 'instructor' | 'admin';
  isVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLogin: Date;
  createdAt: Date;
  updateddAt: Date;
  status: 'active' | 'pending' | 'deactivated' | 'abandoned';
  refreshToken: string;
  password: string;
  tokenVersion: number;
}

// User Types
export interface UserType {
  id: 'school' | 'other';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
