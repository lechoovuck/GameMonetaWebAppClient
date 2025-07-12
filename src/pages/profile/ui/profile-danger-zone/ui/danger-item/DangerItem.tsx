import { Button } from '@/shared/ui';
import styles from './DangerItem.module.scss';

interface DangerItemProps {
  title: string;
  desc: React.ReactNode;
  textButton: string;
  onClick?: () => void;
}

export const DangerItem: React.FC<DangerItemProps> = ({
  title,
  desc,
  textButton,
  onClick,
}) => {
  return (
    <div className={styles.DangerItem}>
      <div className={styles.DangerItem__text}>
        <h4 className={styles.DangerItem__title}>{title}</h4>
        <div className={styles.DangerItem__desc}>{desc}</div>
      </div>
      <Button
        className={styles.DangerItem__button}
        color="dark_red"
        onClick={onClick}
      >
        {textButton}
      </Button>
    </div>
  );
};
