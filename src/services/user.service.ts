import type { ApiDataResI, CourseI } from '@/interface';
import { RequestService } from './api/client';
import { CourseEndpoints } from './api/endpoints';

class UserService {
  async register(payload: any) {
    return await RequestService.post<ApiDataResI<CourseI>>(CourseEndpoints.getCoursePublic, payload);
  }
}

export default new UserService();
