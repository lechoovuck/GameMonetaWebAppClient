import cn from 'classnames';
import styles from './Group.module.scss';

interface GroupProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Group: React.FC<GroupProps> = ({ title, children, className }) => {
  return (
    <div className={cn(styles.Group, className)}>
      <h4 className={styles.Group__title}>{title}</h4>
      <div className={styles.Group__body}>{children}</div>
    </div>
  );
};
