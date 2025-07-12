import { Link } from 'react-router-dom';
// import { Button, Logo } from '@/shared/ui';
import { AppRoute } from '@/const';
import { Logo } from '@/shared/ui';
import styles from './styles.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.Footer__brand}>
        <Logo className={styles.Footer__logo} />
        {/*
        <div className={styles.Footer__buttons}>
          <Button
            href="#"
            target="_blank"
            color="secondary"
            isOnlyIcon
            isOutline
          >
            <IconBrandTelegram strokeWidth={1.5} />
          </Button>

          <Button
            href="#"
            target="_blank"
            color="secondary"
            isOnlyIcon
            isOutline
          >
            <IconBrandVk strokeWidth={1.5} />
          </Button>

          <Button
            href="#"
            target="_blank"
            color="secondary"
            isOnlyIcon
            isOutline
          >
            <IconBrandDiscord strokeWidth={1.5} />
          </Button>
        </div>
        */}
        <div className={styles.Footer__links}>
          <Link to={AppRoute.Contacts}>Контакты</Link>
          <Link to={AppRoute.Faq}>FAQ</Link>
          <Link to={AppRoute.Privacy}>Политика конфиденциальности</Link>
          <Link to={AppRoute.Terms}>Публичная оферта</Link>
        </div>
      </div>

      <div className={styles.Footer__copyright}>
        ©2025 GameMoneta. Все права защищены.
      </div>
    </div>
  );
};
