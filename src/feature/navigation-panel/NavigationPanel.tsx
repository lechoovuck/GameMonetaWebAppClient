import cn from 'classnames';
import { AppRoute } from '@/const';
import { Panel, Tooltip } from '@/shared/ui';
import { Group, Item } from './ui';
import styles from './NavigationPanel.module.scss';
import { useProfile } from '@/shared/api';

interface NavigationPanelProps {
  className?: string;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  className,
}) => {
  const { data } = useProfile();

  return (
    <Panel className={cn(styles.NavigationPanel, className)}>
      <Group title="Навигация">
        <Item iconName="profile" to={AppRoute.Profile}>
          Мой профиль
        </Item>
        <Item iconName="coupon" to={AppRoute.Prizes}>
          Мои призы
        </Item>
        <Item iconName="house" to="/">
          Активировать ваучер
        </Item>
        <Item iconName="order" to={AppRoute.Orders}>
          Мои заказы
        </Item>
      </Group>

      {data?.bonuses !== undefined && (
        <Group
          title="Бонусы"
          className={styles.NavigationPanel__bonusContainer}
        >
          <div className={styles.NavigationPanel__bonus}>
            <Item iconName="gem">
              {data?.bonuses} {data?.bonusesText}
            </Item>
            <Tooltip content="Ознакомьтесь с бонусной системой на главной странице" />
          </div>
        </Group>
      )}
    </Panel>
  );
};
