import { ApiRoute, BACKEND_URL, OauthMethod } from '@/const';
import { Button, Icon } from '@/shared/ui';
import styles from './Oauth.module.scss';
// import { ButtonTelegramAuth } from './components/ButtonTelegramAuth.tsx';

export const Oauth: React.FC = () => {
  const startAuthWith = (method: OauthMethod) => {
    let redirectUrl = BACKEND_URL + '/';

    switch (method) {
      case OauthMethod.Vk: {
        redirectUrl += ApiRoute.OauthVK;
        window.location.href = redirectUrl;
        break;
      }
      case OauthMethod.Telegram: {
        redirectUrl += ApiRoute.OauthTelegram;
        // window.open(
        //   redirectUrl,
        //   'TelegramAuth',
        //   'width=600,height=400,menubar=no,toolbar=no,resizable=yes,scrollbars=yes'
        // );
        window.location.href = redirectUrl
        break;
      }
      default: {
        throw Error(
          'Для одного или более метода OAUTH не определен redirect_url'
        );
      }
    }
  };

  return (
    <div className={styles.Oauth__column}>
      <div className={styles.Oauth__column__button} onClick={() => startAuthWith(OauthMethod.Telegram)}>
        <span>Войти через Telegram</span>
        <Button
          color="dark_white"
          isOnlyIcon
          aria-label="Привязывание аккаунта с входом через telegram"
          title="Авторизация через telegram"
        >
          <Icon name="telegram" />
        </Button>
      </div>
    </div>
  );
};
