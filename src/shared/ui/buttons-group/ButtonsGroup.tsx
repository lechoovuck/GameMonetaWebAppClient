import cn from 'classnames';
import styles from './ButtonsGroup.module.scss';

/**
 * =================
 * MARK: Group
 * =================
 */
interface ButtonsGroupProps {
  className?: string;
  children?: React.ReactNode;
}
type ButtonsGroupType = React.FC<ButtonsGroupProps> & { Button: typeof Button };

export const ButtonsGroup: ButtonsGroupType = ({ className, children }) => {
  return <div className={cn(styles.ButtonsGroup, className)}>{children}</div>;
};

/**
 * =================
 * MARK: Button
 * =================
 */
interface ButtonsProps {
  onClick?: () => void;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
}
const Button: React.FC<ButtonsProps> = ({
  className,
  children,
  onClick,
  active = false,
}) => {
  return (
    <button
      className={cn(styles.Button, className)}
      onClick={onClick}
      data-active={active}
      type="button"
    >
      {children}
    </button>
  );
};

ButtonsGroup.Button = Button;
