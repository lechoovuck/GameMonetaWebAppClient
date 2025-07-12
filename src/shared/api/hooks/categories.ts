import { createQuery } from 'react-query-kit';
import { fetchCategoriesById, fetchCategoriesAll } from '../fetchers/categories';

export const useCategoriesAll = createQuery({
  queryKey: ['categoriesAll'],
  fetcher: () => fetchCategoriesAll(),
  staleTime: Infinity,
});

export const useCategoriesGetById = createQuery({
  queryKey: ['categoriesGetById'],
  fetcher: (variables: { id: number }) => fetchCategoriesById(variables.id),
  staleTime: Infinity,
});
