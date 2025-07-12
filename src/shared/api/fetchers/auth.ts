import { ApiRoute } from '@/const';
import { api } from '../api';
import {
  IAuthCheckSessionRes,
  IAuthForgotPasswordReq,
  IAuthForgotPasswordRes,
  IAuthSignInReq,
  IAuthSignInRes,
  IAuthSignUpReq,
  IAuthSignUpRes,
  IAuthPasswordResetReq,
  IAuthPasswordResetRes,
  IAuthEmailResetReq,
  IAuthEmailResetRes
} from '@/types/auth';

// авторизация
export const fetchAuthSignIn = async (body: IAuthSignInReq) => {
  const { data } = await api.post<IAuthSignInRes>(ApiRoute.AuthSignIn, body);
  return data;
};

// регистрация
export const fetchAuthSignUp = async (body: IAuthSignUpReq) => {
  const { data } = await api.post<IAuthSignUpRes>(ApiRoute.AuthSignUp, body);
  return data;
};

// проверка сессии
export const fetchAuthCheckSession = async () => {
  const { data } = await api.get<IAuthCheckSessionRes>(ApiRoute.AuthCheckSession);
  return data.success;
};

// забыл пароль
export const fetchAuthForgotPassword = async (body: IAuthForgotPasswordReq) => {
  const { data } = await api.post<IAuthForgotPasswordRes>(ApiRoute.PasswordResetRequest, body);
  return data;
};

export const fetchAuthResetPassword = async (body: IAuthPasswordResetReq) => {
  const { data } = await api.post<IAuthPasswordResetRes>(ApiRoute.PasswordReset, body);
  return data;
};

export const fetchAuthResetEmail = async (body: IAuthEmailResetReq) => {
  const { data } = await api.post<IAuthEmailResetRes>(ApiRoute.EmailReset, body);
  return data;
};


export const fetchCheckResetToken = async (token: string) => {
  const response = await api.post(ApiRoute.CheckResetToken, { token });
  return response.data;
};