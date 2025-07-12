import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AppRoute } from '@/const';
import { fetchTelegramConnectOAuth } from '@/shared/api/fetchers/oauth';
import { ITelegramConnectOAuthReq } from '@/types/oauth';
import { getLocalStore } from '@/store/local';

export const TelegramConnectCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const params = new URLSearchParams(location.hash.substring(1));
  const tgAuthResult = JSON.parse(atob(params.get('tgAuthResult') || '')) as ITelegramConnectOAuthReq;

  const telegramConnectMutation = useMutation({
    mutationFn: fetchTelegramConnectOAuth,
  });

  useEffect(() => {
    const { token } = getLocalStore();
    tgAuthResult.token = token;

    const authenticateWithTelegram = async () => {
      const telegramConnectResponse = await telegramConnectMutation.mutateAsync(tgAuthResult);
      // console.log(telegramConnectResponse)
      navigate(AppRoute.Profile, { state: { telegramConnectResponse: telegramConnectResponse } });
    };

    authenticateWithTelegram();
  }, []);

  return null;
};
