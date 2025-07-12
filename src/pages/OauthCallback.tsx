import { AppRoute } from '@/const';
import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParam } from 'react-use';

export const OauthCallbackPage: React.FC = () => {
  const navigator = useNavigate();
  const { authorization } = useUserStore();

  const token = useSearchParam('token');

  useEffect(() => {
    if (!token) {
      navigator(AppRoute.SignIn);
      return;
    }

    authorization({ token });
    navigator(AppRoute.Profile);
  }, [token]);

  return null;
};
