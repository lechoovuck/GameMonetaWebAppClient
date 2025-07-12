export type Gender = 'male' | 'female';

export interface FullProfileInfo {
  id: number;
  email?: string;
  photo: string | null;
  name: string | null;
  gender: Gender | null;
  bonuses: number;
  telegramId?: number;
  bonusesText?: string;
}

// SERVER INTERFACES
// получение данных о себе
export interface IProfileMeRes {
  data: FullProfileInfo;
}

// обновление данных профиля
export interface IProfileChangeInfoReq {
  name: string;
  gender: Gender;
}
export interface IProfileChangeInfoRes {
  data: FullProfileInfo;
}

// сброс пароля
export interface IProfileResetPasswordRes {
  success: boolean;
}

// смена email
export interface IProfileChangeEmailReq {
  email: string;
  password: string;
}

// привязка email
export interface IProfileConnectEmailReq {
  email: string;
  password: string;
  token: string | null
}

export interface IProfileChangeEmailRes {
  data: FullProfileInfo;
}

export interface IProfileConnectEmailRes {
  message: string;
  success: boolean;
}

// загрузка нового аватара
export interface IProfileAvatarChangeRes {
  success: boolean;
}

// удаление аватара
export interface IProfileAvatarRemoveRes {
  success: boolean;
}
