import { persistUserProfile } from '@/hooks/useCurrentUser';
import type { UserI } from '@/interface';
import type { ForgotPasswordForm, LoginForm, ResetPasswordForm } from '@/schemas/auth.schema';
import { RequestService } from '@/services/api/client';
import { setUser, setUserProfile } from '@/store/authslice';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from './auth.api';

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginForm) => authService.login(payload),

    onSuccess: (res) => {
      const { token, user } = res.data ?? {};

      if (token) {
        RequestService.setToken(token);
        const decoded = jwtDecode<Record<string, any>>(token);
        dispatch(setUser(decoded));
      }

      if (user) {
        dispatch(setUserProfile(user as UserI));
        persistUserProfile(user as UserI);
      }

      navigate('/my-courses', { replace: true });
    },

    onError: () => {},
  });
}

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ForgotPasswordForm) => authService.forgotPassword(payload),

    onSuccess: (_res, payload) => {
      navigate('/reset-password', { state: { email: payload.email } });
    },

    onError: () => {},
  });
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordForm & { email: string }) => authService.resetPassword(payload),

    onSuccess: () => {
      navigate('/login', { replace: true });
    },

    onError: () => {},
  });
}
