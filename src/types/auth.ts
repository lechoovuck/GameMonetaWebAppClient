// SERVER INTERFACES
// авторизация
export interface IAuthSignInReq {
  email: string;
  password: string;
}
export interface IAuthSignInRes {
  token?: string;
  error?: string;
}

// регистрация
export interface IAuthSignUpReq {
  name: string;
  email: string;
  password: string;
}
export interface IAuthSignUpRes {
  token?: string;
  error?: string;
}

// проверка сессии
export interface IAuthCheckSessionRes {
  success: boolean;
}

// забыл пароль
export interface IAuthForgotPasswordReq {
  email: string;
}

export interface IAuthForgotPasswordRes {
  reset_token: string;
  message: string;
}

// сброс пароля
export interface IAuthPasswordResetReq {
  token: string;
  new_password: string;
}

export interface IAuthPasswordResetRes {
  message: string;
  success: boolean;
}


//смена email
export interface IAuthEmailResetReq {
  token: string;
  new_email: string;
}

export interface IAuthEmailResetRes {
  message: string;
  success: boolean;
}
