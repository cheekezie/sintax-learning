import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { RequestService } from '@/services/api/client'; // if you use setToken
import { getCookie } from './cookieStorage';
import { jwtDecode } from 'jwt-decode';
import { logout, setUser } from '@/store/authslice';

export function AuthBootstrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie<string>('AUTH_TOKEN');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      console.log({ decoded });

      // Optional: if token has exp, validate it
      if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
        dispatch(logout());
        return;
      }

      // Ensure client has token too (if you use RequestService token)
      RequestService.setToken(token);

      // Restore redux state
      dispatch(setUser(decoded));
    } catch {
      dispatch(logout());
    }
  }, [dispatch]);

  return null;
}
