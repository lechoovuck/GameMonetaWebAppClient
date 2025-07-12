export interface ITelegramOAuthSignInReq {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
  }

export interface ITelegramOAuthSignInRes {
    token: string; 
}

export interface ITelegramConnectOAuthReq extends ITelegramOAuthSignInReq{
  token: string | null
}

export interface ITelegramConnectOAuthRes {
  message: string;
  success: boolean;
}