import classNames from 'classnames';
import styles from './Group.module.scss';

interface GroupProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Group: React.FC<GroupProps> = ({
  title,
  children,
  className,
  contentClassName,
}) => {
  return (
    <div className={classNames(styles.Group, className)}>
      <h4 className={styles.Group__title}>{title}</h4>
      <div className={classNames(styles.Group__content, contentClassName)}>
        {children}
      </div>
    </div>
  );
};
