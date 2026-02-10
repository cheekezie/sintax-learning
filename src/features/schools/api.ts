import type { ApiDataResI, CourseI } from '@/interface';
import type { CohortI } from '@/interface/cohort.interface';
import { RequestService } from '@/services';

class AuthApi {
  async login(data: object) {
    return await RequestService.post<ApiDataResI>('authentication/login', data);
  }
  async forgotPassword(data: object) {
    return await RequestService.post<ApiDataResI>('', data);
  }

  async setNewPassword(data: object) {
    return await RequestService.post<ApiDataResI>('', data);
  }
}

export default new AuthApi();
