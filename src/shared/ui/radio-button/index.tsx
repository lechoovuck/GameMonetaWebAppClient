import cn from 'classnames';
import styles from './styles.module.scss';

interface RadioButtonProps {
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  icon,
  children,
  onClick,
  className,
  disabled
}) => {
  return (
    <button
      className={cn(
        styles.RadioButton,
        selected && styles.RadioButton_selected,
        className
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div className={styles.RadioButton__icon}>{icon}</div>}
      <div className={styles.RadioButton__text}>{children}</div>
    </button>
  );
};
