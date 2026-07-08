import { useQuery } from '@tanstack/react-query';
import paymentApi from './payment.api';


export function useGetBilling() {
  return useQuery({
    queryKey: ['billing'],
    queryFn: () => paymentApi.getBilling(),

  });
}
