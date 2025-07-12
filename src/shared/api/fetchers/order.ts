import { ApiRoute } from '@/const';
import { IOrdersGetRes } from '@/types/order';
import { api } from '../api';

export const fetchOrdersGet = async (limit: number) => {
  const { data } = await api.get<IOrdersGetRes>(ApiRoute.OrdersGet, {
    params: { limit },
  });
  return data;
};
