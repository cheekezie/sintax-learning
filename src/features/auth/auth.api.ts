import type { ApiDataResI } from '@/interface';
import type { LoginForm } from '@/schemas/auth.schema';
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
}

export default new AuthService();
