export interface UserI {
  _id?: string;
  id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  profileImage?: string;
  gender?: 'male' | 'female' | 'Male' | 'Female';
  phoneVerified?: boolean;
  disabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  role?: string;
  roles?: string[];
  permissions?: string[] | Record<string, { read?: boolean; write?: boolean }>;

  currentOrgVariant?: string;
  groupManagedFees?: boolean;
  [key: string]: any;
}

// User Types
export interface UserType {
  id: 'school' | 'other';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
