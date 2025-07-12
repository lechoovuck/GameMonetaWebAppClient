import { ApiRoute } from '@/const';
import { api } from '../api';
import { ISubcategoryByIdRes, ISubcategoryRes } from '@/types/subcategories.ts';

export const fetchSubcategoriesAll = async (id: number) => {
  const { data } = await api.get<ISubcategoryRes>(
    ApiRoute.Subcategories + '/' + id + '/' + ApiRoute.Subcategories);
  return data;
};

export const fetchSubcategoriesById = async (id: number) => {
  const { data } = await api.get<ISubcategoryByIdRes>(
    ApiRoute.Subcategories + '/' + id);
  return data;
};
