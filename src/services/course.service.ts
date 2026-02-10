import type { ApiDataResI, CourseI } from '@/interface';
import { RequestService } from './api/client';
import { CourseEndpoints } from './api/endpoints';
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
    return await RequestService.post<ApiDataResI>(CourseEndpoints.enrol, data);
  }
}

export default new CourseService();
