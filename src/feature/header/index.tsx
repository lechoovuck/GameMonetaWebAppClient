import { Button, Icon, Logo } from '@/shared/ui';
import styles from './styles.module.scss';
import { ThemeToggle } from '../theme';
import { Search } from '../search';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const';
import { HeaderMenu } from './ui';
import { useWindowSize } from 'react-use';
import { useEffect, useState } from 'react';
import { useProfile } from '@/shared/api';

export const Header: React.FC = () => {
  const navigator = useNavigate();
  const { width } = useWindowSize();
  const { data } = useProfile();
  

  const [isShowBonus, setIsShowBonus] = useState(false);

  useEffect(() => {
    if (isShowBonus && width < 744) setIsShowBonus(false);
    if (!isShowBonus && width > 744) setIsShowBonus(true);
  }, [width, isShowBonus]);

  const openProfile = () => {
    navigator(AppRoute.Profile);
  };

  return (
    <div className={styles.Header}>
      <Logo className={styles.Header__logo} />
      {/* <Search />
      <ThemeToggle className={styles.Header__themeToggle} /> */}

      {isShowBonus && data?.bonuses !== undefined && (
        <div className={styles.Header__bonus}>
          {data?.bonuses} {data?.bonusesText}
          <span>
            <Icon name="gem" />
          </span>
        </div>
      )}

      <div className={styles.Header__buttons}>
        <Search />

        <Button
          color="secondary"
          isOnlyIcon
          onClick={openProfile}
          aria-label="Перейти в профиль"
        >
          <Icon name="profile" />
        </Button>

        <HeaderMenu />
      </div>

      <ThemeToggle className={styles.Header__themeToggle} />
    </div>
  );
};
