import React, { useEffect } from 'react';

export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

interface Props {
  children?: React.ReactNode;
}

export const ButtonTelegramAuth: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'gamemoneta_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-radius', '20');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-auth-url', 'https://gamemoneta.com/profile');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="telegram-widget-container">
    { children }
  </div>;
};

/*
<script async 
  src="https://telegram.org/js/telegram-widget.js?22" 
   data-telegram-login="gamemoneta_bot" 
   data-size="large" 
   data-auth-url="https://gamemoneta.com/profile" 
   data-request-access="write">
 </script> 
*/