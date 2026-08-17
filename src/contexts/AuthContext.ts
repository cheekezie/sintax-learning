import type { AuthStateI } from '@/interface/auth.interface';
import { createContext } from 'react';

export const AuthContext = createContext<AuthStateI | null>(null);
