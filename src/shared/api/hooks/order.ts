import { createQuery } from 'react-query-kit';
import { fetchOrdersGet } from '../fetchers/order';
import { IOrdersGetReq } from '@/types/order';

export const useOrdersGet = createQuery({
  queryKey: ['ordersGet'],
  fetcher: (variables: IOrdersGetReq) => fetchOrdersGet(variables.limit),
  staleTime: Infinity,
});
