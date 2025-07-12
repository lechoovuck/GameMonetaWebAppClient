import { useEffect } from 'react';
import { useToggle, useWindowSize } from 'react-use';
import { IconX } from '@tabler/icons-react';
import { NavigationPanel } from '@/feature/navigation-panel';
import { useScrollToElement } from '@/shared/hooks';
import { Button, Icon, Overlay } from '@/shared/ui';
import styles from './HeaderMenu.module.scss';

interface HeaderMenuProps {}

export const HeaderMenu: React.FC<HeaderMenuProps> = () => {
  const [isOpen, toggle] = useToggle(false);
  const { width } = useWindowSize();
  const scrollTo = useScrollToElement();

  useEffect(() => {
    if (isOpen) scrollTo('root');
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && width > 744) toggle();
  }, [width, isOpen]);

  return (
    <>
      {isOpen && (
        <>
          <NavigationPanel className={styles.HeaderMenu} />
          <Overlay onClick={toggle} />
        </>
      )}

      <Button
        className={styles.HeaderMenu__button}
        color="secondary"
        isOnlyIcon
        aria-label="Открыть меню"
        onClick={toggle}
      >
        {!isOpen ? <Icon name="menu" /> : <IconX />}
      </Button>
    </>
  );
};
