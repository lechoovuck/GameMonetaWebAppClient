import { ApiRoute } from '@/const';
import { api } from '../api';
import { IProductsAllRes, IProductsByIdRes } from '@/types/product';

export const fetchProductsAll = async () => {
  const { data } = await api.get<IProductsAllRes>(ApiRoute.ProductsAll);
  return data;
};

export const fetchProductsById = async (id: number) => {
  const { data } = await api.get<IProductsByIdRes>(ApiRoute.Products + '/' + id);
  return data;
};
