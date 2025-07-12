import { createQuery } from 'react-query-kit';
import { fetchAliasessAll } from '../fetchers/aliases';

export const useAliasesAll = createQuery({
  queryKey: ['aliasesAll'],
  fetcher: () => fetchAliasessAll(),
  staleTime: Infinity,
});
