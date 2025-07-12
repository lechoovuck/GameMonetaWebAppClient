
export const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
export const REQUEST_API_TIMEOUT = 10000; // ms, 10s

export const LOCAL_STORE_KEY_NAME = 'gamemoneta';

export const Z_INDEX__HEADER = 999;
export const Z_INDEX__MODAL = 9999;

export const STATUS_TEXT = {
  'wait': 'Ожидает оплаты',
  'paid': 'Оплачен',
  'canceled': 'Отменен',
  'refunded': 'Возвращен',
  'error': 'Ошибка создания',
  'process': 'В обработке',
  'order_ok': 'Выполнен',
  'order_error': 'Ошибка платежа',
}

export enum AppRoute {
  Root = '/',
  Product = '/product',
  Categories = '/categories',
  SteamLinkInstruction = '/steam-link-instruction',
  Gifts = '/gifts',
  Gift = '/gift',
  Subcategories = '/subcategories',
  Faq = '/faq',
  Bonus = '/bonus',

  SignIn = '/sign-in', // авторизация
  SignUp = '/sign-up', // регистраци
  OauthCallback = '/oauth_callback',

  // private routes
  Orders = '/orders',
  Prizes = '/prizes',
  Profile = '/profile',

  // static pages
  Terms = '/terms',
  Privacy = '/privacy',
  Contacts = '/contacts',

  OauthTelegramCallback = '/oauth/telegram/callback',
  OauthTelegramConnectCallback = '/oauth/telegram/callback-connect',

  OrderInvoice = '/order',

  PasswordReset = '/reset-password',
  PasswordNew = '/new-password',
  EmailNew = '/new-email'
}

export enum ApiRoute {
  ProductsAll = 'products/',
  Products = 'products/',
  Aliases = 'alias/', // @GET
  Categories = 'categories/',
  Subcategories = 'subcategories/',
  Gifts = 'gifts/',

  //
  OrdersGet = 'orders/get', // @GET {params: {limit: number}}
  //
  ProfileMe = 'profile/', // @GET
  ProfileResetPassword = 'profile/reset_password', // @GET
  ProfileChangeEmail = 'profile/change_email', // @POST
  ProfileConnectEmail = 'profile/connect_email', // @POST
  ProfileChangeInfo = 'profile/info', // @POST
  ProfileAvatarChange = 'profile/avatar_change', // @POST
  ProfileAvatarRemove = 'profile/avatar_remove', // @GET
  //
  AuthSignIn = 'auth/login', // @POST
  AuthSignUp = 'auth/register', // @POST
  AuthCheckSession = 'auth/check_session', // @GET
  AuthForgotPassword = 'auth/forgot_password', // @POST
  //
  OauthVK = 'oauth/vk', // @GET
  OauthVKConnect = 'oauth/vk-connect', // @GET
  OauthTelegram = 'oauth/telegram', // @GET
  OauthTelegramConnect = 'oauth/telegram-connect', // @GET
  OauthTelegramCallback = 'oauth/telegram/callback', // @GET
  OauthTelegramConnectCallback = 'oauth/telegram/callback-connect', // @GET
  //
  InvoiceGet = 'invoice/get', // @GET
  InvoiceCreate = 'invoice/', // @POST
  InvoiceAll = 'invoice/', // @GET
  InvoiceCheckLogin = 'invoice/check_login', // @POST
  InvoiceCheckSteamLink = 'invoice/check_steam_link', // @POST
  // 
  PasswordResetRequest = 'auth/password_reset_request', // @POST
  PasswordReset = 'auth/password_reset', // @POST
  EmailReset = 'auth/email_reset', // @POST
  CheckResetToken ='auth/check_reset_token', // @POST
}

export enum AuthStatus {
  Auth = 'auth',
  NoAuth = 'noAuth',
  Unknown = 'unknown',
}

export enum OauthMethod {
  Vk = 'vk',
  Telegram = 'telegram',
  // Gmail = "gmail"
}
