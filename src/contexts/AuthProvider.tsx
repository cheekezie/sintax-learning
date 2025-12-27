import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import type { AuthStateI, AuthTokenPayloadI } from '../interface/auth.interface';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthStateI>({
    isAuthenticated: false,
    role: null,
    permissions: [],
    userId: null,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }

    try {
      const decoded = jwtDecode<AuthTokenPayloadI>(token);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('access_token');
        setState((s) => ({ ...s, isLoading: false }));
        return;
      }

      setState({
        isAuthenticated: true,
        role: decoded.role,
        permissions: decoded.permissions ?? [],
        userId: decoded.sub,
        isLoading: false,
      });
    } catch {
      localStorage.removeItem('access_token');
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
