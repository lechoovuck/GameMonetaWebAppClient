import cn from 'classnames';
import { Icon, IconProps } from '../icon';
import styles from './styles.module.scss';

interface ToggleProps {
  label?: React.ReactNode;
  colors?: {
    bg: Record<'active' | 'inactive', string>;
    button: Record<'active' | 'inactive', string>;
    color: Record<'active' | 'inactive', string>;
  };
  size?: 'sm' | 'md';
  value: boolean;
  onToggle: () => void;
  iconName?: IconProps['name'];
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  value,
  onToggle,
  iconName,
  colors,
  size = 'md',
  className,
}) => {
  const getStyles = () => {
    if (!colors) return undefined;

    return {
      '--bg-active': colors.bg.active,
      '--bg-inactive': colors.bg.inactive,
      '--button-active': colors.button.active,
      '--button-inactive': colors.button.inactive,
      '--color-active': colors.color.active,
      '--color-inactive': colors.color.inactive,
    } as React.CSSProperties;
  };

  return (
    <div className={cn(styles.Toggle__container, className)}>
      <div
        className={cn(
          styles.Toggle,
          value && styles.Toggle_active,
          size !== 'md' && styles[`Toggle_size_${size}`]
        )}
        onClick={onToggle}
        style={getStyles()}
      >
        <div className={styles.Toggle__button}>
          {iconName && <Icon name={iconName} />}
        </div>
      </div>

      {label && (
        <span className={styles.Toggle__label} onClick={onToggle}>
          {label}
        </span>
      )}
    </div>
  );
};
