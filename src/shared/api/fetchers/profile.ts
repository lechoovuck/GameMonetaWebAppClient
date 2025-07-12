import { ApiRoute } from '@/const';
import {
  IProfileChangeEmailReq,
  IProfileChangeEmailRes,
  IProfileChangeInfoReq,
  IProfileChangeInfoRes,
  IProfileMeRes,
  IProfileResetPasswordRes,
  IProfileAvatarChangeRes,
  IProfileAvatarRemoveRes,
  IProfileConnectEmailReq,
  IProfileConnectEmailRes
} from '@/types/profile';
import { api } from '../api';
import plural from 'plural-ru';


const BONUSES_TEXT = ['бонус', 'бонуса', 'бонусов'] as const;

export const fetchProfileMe = async () => {
  const { data } = await api.get<IProfileMeRes>(ApiRoute.ProfileMe);
  const bonuses = data.data.bonuses;
  data.data.bonuses = bonuses;
  data.data.bonusesText = bonuses === undefined ? undefined : plural(bonuses, ...BONUSES_TEXT);

  return data.data;
};

export const fetchProfileResetPassword = async () => {
  const { data } = await api.get<IProfileResetPasswordRes>(
    ApiRoute.ProfileResetPassword
  );
  return data;
};

export const fetchProfileChangeEmail = async (body: IProfileChangeEmailReq) => {
  const { data } = await api.post<IProfileChangeEmailRes>(
    ApiRoute.ProfileChangeEmail,
    { body }
  );
  return data;
};

export const fetchProfileConnectEmail = async (body: IProfileConnectEmailReq) => {
  const { data } = await api.post<IProfileConnectEmailRes>(
    ApiRoute.ProfileConnectEmail,
    { ...body }
  );
  return data;
};

export const fetchProfileChangeInfo = async (body: IProfileChangeInfoReq) => {
  const { data } = await api.post<IProfileChangeInfoRes>(
    ApiRoute.ProfileChangeInfo,
    body
  );
  return data;
};

export const fetchProfileAvatarChange = async (formData: FormData) => {
  const { data } = await api.post<IProfileAvatarChangeRes>(
    ApiRoute.ProfileAvatarChange,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return data;
};

export const fetchProfileAvatarRemove = async () => {
  const { data } = await api.get<IProfileAvatarRemoveRes>(
    ApiRoute.ProfileAvatarRemove
  );
  return data;
};
