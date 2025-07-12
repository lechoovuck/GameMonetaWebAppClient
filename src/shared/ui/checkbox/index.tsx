import cn from 'classnames';
import { IconCheck, IconMinus } from '@tabler/icons-react';
import styles from './styles.module.scss';

interface CheckboxProps {
  selected?: boolean;
  variant?: 'check' | 'minus';
  size?: 'sm' | 'md';
  disabled?: boolean;
  label?: React.ReactNode;
  onToggle?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  selected = false,
  variant = 'check',
  size = 'md',
  disabled = false,
  label,
  onToggle,
}) => {
  const toggle = () => {
    if (onToggle && !disabled) {
      onToggle();
    }
  };

  return (
    <div className={styles.Checkbox__body}>
      <div
        className={cn(
          styles.Checkbox,
          styles[`Checkbox_size_${size}`],
          disabled && styles.Checkbox_disabled,
          selected && styles.Checkbox_selected
        )}
        onClick={toggle}
      >
        {/* <input type="checkbox" checked={selected} disabled={disabled} /> */}
        <CheckboxIcon variant={variant} isShow={selected} />
      </div>
      {label && (
        <label
          className={cn(
            styles.Checkbox__label,
            disabled && styles.Checkbox__label_disabled
          )}
          onClick={toggle}
        >
          {label}
        </label>
      )}
    </div>
  );
};

// ==============

interface CheckboxIconProps {
  variant: CheckboxProps['variant'];
  isShow: boolean;
}

const CheckboxIcon: React.FC<CheckboxIconProps> = ({ variant, isShow }) => {
  if (!isShow) return null;

  if (variant === 'minus') return <IconMinus />;
  if (variant === 'check') return <IconCheck />;
};
