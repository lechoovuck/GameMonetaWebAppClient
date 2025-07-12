import { createQuery } from 'react-query-kit';
import { fetchGiftsById, fetchGiftsAll } from '../fetchers/gifts';

export const useGiftsAll = createQuery({
  queryKey: ['giftsAll'],
  fetcher: () => fetchGiftsAll(),
  staleTime: Infinity,
});

export const useGiftsGetById = createQuery({
  queryKey: ['giftsGetById'],
  fetcher: (variables: { id: number }) => fetchGiftsById(variables.id),
  staleTime: Infinity,
});
