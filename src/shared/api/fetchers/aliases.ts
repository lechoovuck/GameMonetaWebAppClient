import { ApiRoute } from '@/const';
import { api } from '../api';
import { IAliasesGetRes } from '@/types/aliases';

export const fetchAliasessAll = async () => {
  const { data } = await api.get<IAliasesGetRes>(ApiRoute.Aliases);
  return data;
};
