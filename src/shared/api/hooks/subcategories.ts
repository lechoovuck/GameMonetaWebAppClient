import { createQuery } from 'react-query-kit';
import { fetchSubcategoriesById, fetchSubcategoriesAll } from '../fetchers/subcategories';

export const useSubcategoriesAll = createQuery({
  queryKey: ['categoriesAll'],
  fetcher: (variables: { id: number }) => fetchSubcategoriesAll(variables.id),
  staleTime: Infinity,
});

export const useSubcategoriesGetById = createQuery({
  queryKey: ['categoriesGetById'],
  fetcher: (variables: { id: number }) => fetchSubcategoriesById(variables.id),
  staleTime: Infinity,
});
