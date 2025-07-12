import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute, AuthStatus } from '@/const';
import { useAuth } from '@/shared/hooks';

type RedirectRouteProps = {
  checkStatus: AuthStatus;
  redirectPage: AppRoute;
};

export function RedirectRoute({
  checkStatus,
  redirectPage,
}: RedirectRouteProps): JSX.Element {
  const authStatus = useAuth({ checkStatus });

  return authStatus ? <Outlet /> : <Navigate to={redirectPage} />;
}
