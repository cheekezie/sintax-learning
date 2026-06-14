// src/store/auth/authSlice.ts
import type { UserI } from '@/interface/user.interface';
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
  profile: UserI | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<JwtDecoded>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    setUserProfile: (state, action: PayloadAction<UserI>) => {
      state.profile = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setUserProfile, logout } = authSlice.actions;
export default authSlice.reducer;
