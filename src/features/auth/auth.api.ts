import type { ApiDataResI } from '@/interface';
import type { ForgotPasswordForm, LoginForm, ResetPasswordForm } from '@/schemas/auth.schema';
import { RequestService } from '@/services/api/client';
import { AuthEndpoints } from '@/services/api/endpoints';

export interface LoginResponseData {
  token: string;
  refreshToken?: string;
  user?: Record<string, any>;
}

class AuthService {
  async login(payload: LoginForm) {
    return RequestService.post<ApiDataResI<LoginResponseData>>(AuthEndpoints.login, payload);
  }

  async forgotPassword(payload: ForgotPasswordForm) {
    return RequestService.post<ApiDataResI<{ message: string }>>(AuthEndpoints.forgotPassword, payload);
  }

  async resetPassword(payload: ResetPasswordForm & { email: string }) {
    return RequestService.post<ApiDataResI<{ message: string }>>(AuthEndpoints.resetPassword, payload);
  }
}

export default new AuthService();
