import { createQuery } from 'react-query-kit';
import { fetchProductsAll, fetchProductsById } from '../fetchers/product';

export const useProductsAll = createQuery({
  queryKey: ['productsAll'],
  fetcher: () => fetchProductsAll(),
  staleTime: Infinity,
});

export const useProductsGetById = createQuery({
  queryKey: ['productsGetById'],
  fetcher: (variables: { id: number }) => fetchProductsById(variables.id),
  staleTime: Infinity,
});
