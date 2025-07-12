import cn from 'classnames';
import styles from './styles.module.scss';

interface AlertProps {
  children?: React.ReactNode;
  color?: 'yellow' | 'red' | 'green';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, color, className }) => {
  return (
    <div
      className={cn(
        styles.Alert,
        color && styles[`Alert_color_${color}`],
        className
      )}
    >
      {children}
    </div>
  );
};
