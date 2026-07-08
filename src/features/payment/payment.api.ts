import type { ApiDataResI, CourseI, EnrollmnentI, UserI } from '@/interface';
import { RequestService } from '../../services/api/client';
import { CourseEndpoints } from '../../services/api/endpoints';
import type { CohortI } from '@/interface/cohort.interface';
import type { BillingI, TransactionI } from './payment.type';

class PaymentApi {
  async getBilling() {
    return await RequestService.get<ApiDataResI<{ billing: BillingI[]; transactions: TransactionI[]; nextCohort: CohortI }>>(
      '/payment/billing'
    );
  }
  async myTransactions(data: object) {
    return await RequestService.post<ApiDataResI<TransactionI[]>>('payment/transactions', data);
  }

  async invoice(data: object) {
    return await RequestService.post<ApiDataResI<{ enrollment: EnrollmnentI, user: UserI, token: string, refreshToken: string }>>(CourseEndpoints.enrol, data);
  }
}

export default new PaymentApi();
