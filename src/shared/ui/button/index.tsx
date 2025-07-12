import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

interface ButtonProps {
  color?: 'default' | 'secondary' | 'danger' | 'dark_white' | 'dark_red';
  children?: React.ReactNode;
  className?: string;
  href?: string;
  target?: React.HTMLAttributeAnchorTarget;
  isOnlyIcon?: boolean;
  isOutline?: boolean;
}

export const Button: React.FC<
  ButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'target'>
> = ({
  color = 'default',
  href,
  target,
  className,
  isOnlyIcon,
  isOutline,
  type = 'button',
  ...props
}) => {
  const classes = cn(
    styles.Button,
    styles[`Button_color_${color}`],
    isOnlyIcon && styles.Button_onlyIcon,
    isOutline && styles.Button_outline,
    className
  );

  if (href) {
    return (
      <a href={href} target={target} className={classes}>
        {props.children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {props.children}
    </button>
  );
};
