import React from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

export interface InputWrapperProps {
  id?: string;
  label?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  isError?: boolean;
  className?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({
  id,
  label,
  description,
  children,
  isError,
  className,
}) => {
  if (!label && !description) return children;

  return (
    <div
      className={cn(
        styles.InputWrapper,
        isError && styles.InputWrapper__error,
        className
      )}
    >
      {label && (
        <label className={styles.InputWrapper__label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.InputWrapper__body}>{children}</div>

      {description && (
        <div
          className={styles.InputWrapper__description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
};
