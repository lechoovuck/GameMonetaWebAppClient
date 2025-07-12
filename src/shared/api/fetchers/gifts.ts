import { ApiRoute } from '@/const';
import { api } from '../api';
import { IGiftsAllRes, IGiftsByIdRes } from '@/types/gifts';

export const fetchGiftsAll = async () => {
  const { data } = await api.get<IGiftsAllRes>(ApiRoute.Gifts);
  return data;
};

export const fetchGiftsById = async (id: number) => {
  const { data } = await api.get<IGiftsByIdRes>(ApiRoute.Gifts + '/' + id);
  return data;
};
