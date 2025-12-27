export interface AuthTokenPayloadI {
  sub: string;
  role: 'admin' | 'user' | 'instructor';
  permissions: string[];
  exp: number;
}

export interface AuthStateI {
  isAuthenticated: boolean;
  role: AuthTokenPayloadI['role'] | null;
  permissions: string[];
  userId: string | null;
  isLoading: boolean;
}
