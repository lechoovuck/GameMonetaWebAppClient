import { ApiRoute } from '@/const';
import { api } from '../api';
import { ICategoryAllRes, ICategoryByIdRes } from '@/types/categories.ts';

export const fetchCategoriesAll = async () => {
  const { data } = await api.get<ICategoryAllRes>(ApiRoute.Categories);
  return data;
};

export const fetchCategoriesById = async (id: number) => {
  const { data } = await api.get<ICategoryByIdRes>(ApiRoute.Categories + '/' + id);
  return data;
};
