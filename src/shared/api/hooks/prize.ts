import { createQuery } from 'react-query-kit';
import { fetchPrizesAll } from '../fetchers/prize';

export const usePrizesAll = createQuery({
  queryKey: ['prizesAll'],
  fetcher: () => fetchPrizesAll(),
  staleTime: Infinity,
});
