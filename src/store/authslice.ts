// src/store/auth/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type JwtDecoded = {
  sub?: string;
  id?: string;
  email?: string;
  role?: string | string[];
  permissions?: any;
  exp?: number;
  iat?: number;
  [key: string]: any;
};

export interface AuthState {
  user: JwtDecoded | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /** Set authenticated user (after login or bootstrap) */
    setUser: (state, action: PayloadAction<JwtDecoded>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    /** Clear auth state */
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
