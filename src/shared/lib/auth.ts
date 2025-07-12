import { AuthStatus } from '@/const';

export const checkAuth = (authStatus: AuthStatus): boolean =>
  authStatus === AuthStatus.Auth;
