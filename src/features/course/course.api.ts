import type { ApiDataResI, CourseI, EnrollmnentI, UserI } from '@/interface';
import type { PaginatedResponseI } from '@/interface/course.interface';
import { RequestService } from '../../services/api/client';
import { CourseEndpoints } from '../../services/api/endpoints';
import type { CohortI } from '@/interface/cohort.interface';

class CourseService {
  async getCoursePublic() {
    return await RequestService.get<ApiDataResI<{ courses: CourseI[]; cohorts: CohortI[]; nextCohort: CohortI }>>(
      CourseEndpoints.getCoursePublic
    );
  }
  async createEnquiry(data: object) {
    return await RequestService.post<ApiDataResI>(CourseEndpoints.enquiry, data);
  }

  async enrolCourse(data: object) {
    return await RequestService.post<ApiDataResI<{ enrollment: EnrollmnentI, user: UserI, token: string, refreshToken: string }>>(CourseEndpoints.enrol, data);
  }

  async getEnrollments(params?: { page?: number; limit?: number }) {
    const query = params ? `?${RequestService.constructQueryString(params)}` : '';
    return await RequestService.get<ApiDataResI<PaginatedResponseI<EnrollmnentI>>>(
      `${CourseEndpoints.enrollments}${query}`
    );
  }
}

export default new CourseService();
