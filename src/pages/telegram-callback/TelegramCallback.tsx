import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AppRoute } from '@/const';
import { useUserStore } from '@/store/user';
import { fetchTelegramOAuth } from '@/shared/api/fetchers/oauth';
import { ITelegramOAuthSignInReq } from '@/types/oauth';

export const TelegramCallback: React.FC = () => {
  const navigate = useNavigate();
  const { authorization } = useUserStore();
  const location = useLocation();
  const [hasAuthenticated, setHasAuthenticated] = useState(false);
  
  const params = new URLSearchParams(location.hash.substring(1));
  const tgAuthResult = JSON.parse(atob(params.get('tgAuthResult') || '')) as ITelegramOAuthSignInReq;

  const telegramAuthMutation = useMutation({
    mutationFn: fetchTelegramOAuth,
  });

  useEffect(() => {
    if (!tgAuthResult || hasAuthenticated) return;

    const authenticateWithTelegram = async () => {
      try {
        const { token } = await telegramAuthMutation.mutateAsync(tgAuthResult);
        authorization({ token });

        navigate(AppRoute.Profile); // Redirect to profile on success
      } catch (error) {
        console.error('Error during Telegram authentication', error);

        navigate(AppRoute.SignIn); // Redirect to sign-in on failure
      } finally {
        setHasAuthenticated(true); // Mark as authenticated to prevent loops
      }
    };

    authenticateWithTelegram();
  }, []);

  return null;
};
