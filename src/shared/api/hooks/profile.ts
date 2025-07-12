import { createQuery } from 'react-query-kit';
import { fetchProfileMe } from '../fetchers/profile';
import { useQueryClient } from '@tanstack/react-query';

export const useProfile = createQuery({
  queryKey: ['ProfileMe'],
  fetcher: () => fetchProfileMe(),
  staleTime: Infinity,
});

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ['ProfileMe'] });
};
