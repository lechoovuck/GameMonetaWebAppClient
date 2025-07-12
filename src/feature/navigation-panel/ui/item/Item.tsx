import { NavLink } from 'react-router-dom';
import styles from './Item.module.scss';
import { Icon, IconProps } from '@/shared/ui';
import classNames from 'classnames';

interface ItemProps {
  iconName: IconProps['name'];
  children: React.ReactNode;
  to?: string;
}

export const Item: React.FC<ItemProps> = ({ iconName, children, to }) => {
  if (to) {
    return (
      <NavLink
        className={({ isActive }) =>
          classNames(styles.Item, isActive && styles.Item_active)
        }
        to={to!}
      >
        <div className={styles.Item__iconContainer}>
          <Icon name={iconName} className={styles.Item__icon} />
        </div>
        <span>{children}</span>
      </NavLink>
    );
  }

  return (
    <div className={styles.Item}>
      <div className={styles.Item__iconContainer}>
        <Icon name={iconName} className={styles.Item__icon} />
      </div>
      <span>{children}</span>
    </div>
  );
};
