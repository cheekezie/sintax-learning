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
}

export default new CourseService();
