import { ApiRoute } from '@/const';
import { api } from '../api';
import {
  ITelegramOAuthSignInReq,
  ITelegramOAuthSignInRes,
  ITelegramConnectOAuthReq,
  ITelegramConnectOAuthRes
} from '@/types/oauth';

export const fetchTelegramOAuth = async (body: ITelegramOAuthSignInReq) => {
  const { data } = await api.post<ITelegramOAuthSignInRes>(ApiRoute.OauthTelegramCallback, body);
  return data;
};

export const fetchTelegramConnectOAuth = async (body: ITelegramConnectOAuthReq) => {
  const { data } = await api.post<ITelegramConnectOAuthRes>(ApiRoute.OauthTelegramConnectCallback, body);
  return data;
};
