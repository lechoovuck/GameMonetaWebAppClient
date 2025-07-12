import React, { HTMLAttributes, useState, useId } from 'react';
import cn from 'classnames';
import { InputWrapper, InputWrapperProps } from '../input-wrapper';
import styles from './styles.module.scss';
import { Icon } from '@/shared/ui';

interface InputProps {
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'text' | 'email' | 'number' | 'password';
  currency?: 'rub' | 'kzt' | 'usd';
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  min?: number;
  max?: number;
  error?: string; // Можно сделать "loading" чтобы поставить иконку загрузки
  name?: string;
  onFocus?: ((value: any) => void) | undefined;
  onBlur?: ((value: any) => void) | undefined;
  isError?: boolean;
  disabled?: boolean
}

export const Input: React.FC<InputProps & InputWrapperProps> = ({
  value,
  onChange,
  type = 'text',
  currency = 'rub',
  placeholder,
  className,
  icon,
  inputProps,
  min,
  max,
  error: errorFromParent,
  name,
  onFocus,
  onBlur,
  isError = false,
  disabled,
  ...props
}) => {
  const localId = useId();
  const [localError, setError] = useState<string | null>(null);
  const error = errorFromParent || localError;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (type === 'number') {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setError(null); // Clear errors while typing
        if (onChange) {
          onChange({
            ...event,
            target: {
              ...event.target,
              value: value,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      } else {
        setError('Value must be numeric');
      }
      return;
    }

    setError(null);
    if (onChange) onChange(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;

    if (type === 'number') {
      let numericValue = value === '' ? undefined : parseFloat(value);

      if (numericValue === undefined && min !== undefined) {
        numericValue = min;
      }

      if (numericValue !== undefined) {
        if (min !== undefined && numericValue < min) {
          numericValue = min;
        }
        if (max !== undefined && numericValue > max) {
          numericValue = max;
        }
      }

      if (onChange) {
        onChange({
          ...event,
          target: {
            ...event.target,
            value: numericValue !== undefined ? numericValue.toString() : '',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      if (numericValue === undefined && value !== '') {
        setError('Value must be numeric');
      } else {
        setError(null);
      }
    }

    if (onBlur) onBlur(event);
  };

  const getMode = (): HTMLAttributes<HTMLInputElement>['inputMode'] => {
    if (type === 'number') return 'numeric';
    else if (type === 'email') return 'email';
    return undefined;
  };

  const isLoading = error === 'loading';
  return (
    <InputWrapper {...{ ...props, id: localId, isError: isError && error !== null && !isLoading }}>
      <div 
        className={cn(
          styles.Input__conteiner,
          className,
          isLoading && styles['is-loading']
        )}
      >
        <input
          id={localId}
          className={cn(styles.Input, icon && styles.Input_withIcon)}
          type={type}
          value={value}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          inputMode={getMode()}
          min={min}
          max={max}
          name={name}
          onFocus={onFocus}
          disabled={disabled || isLoading}
          {...inputProps}
        />
        {type === 'number' && (
          <span className={styles.Input__currency}>
            {currency === 'rub' && '₽'}
            {currency === 'kzt' && '₸'}
            {currency === 'usd' && '$'}
          </span>
        )}
        {icon && (
          <label className={styles.Input__icon} htmlFor={localId}>
            {icon}
          </label>
        )}
        {isLoading && (
          <div className={styles.Input__loader}>
            <Icon name="loader" spin />
          </div>
        )}
      </div>
      {!isLoading && error && <div className={styles.Input__error}>{error}</div>}
    </InputWrapper>
  );
};