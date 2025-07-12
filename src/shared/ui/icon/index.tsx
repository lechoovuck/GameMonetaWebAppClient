import classNames from 'classnames';
import React from 'react';
import SVG, { Props as InlineSvgProp } from 'react-inlinesvg';
import styles from './Icon.module.scss';

import CheckmarkIcon from '@/assets/icons/check-mark.svg';
import EditIcon from '@/assets/icons/edit.svg';
import ErrorIcon from '@/assets/icons/error.svg';
import OkIcon from '@/assets/icons/okey.svg';
import TelegramIcon from '@/assets/icons/telegram.svg';
import TimeIcon from '@/assets/icons/time.svg';
import ArrowIcon from '@/assets/icons/arrow.svg';
import RectsIcon from '@/assets/icons/rects.svg';
import MoneyIcon from '@/assets/icons/money.svg';
import MoonIcon from '@/assets/icons/moon.svg';
import sunIcon from '@/assets/icons/sun.svg';
import copyIcon from '@/assets/icons/copy.svg';
import couponIcon from '@/assets/icons/coupon.svg';
import googleIcon from '@/assets/icons/google.svg';
import menuIcon from '@/assets/icons/menu.svg';
import orderIcon from '@/assets/icons/order.svg';
import vkIcon from '@/assets/icons/vk.svg';
import gemIcon from '@/assets/icons/gem.svg';
import profileIcon from '@/assets/icons/profile.svg';
import houseIcon from '@/assets/icons/house.svg';
import loaderIcon from '@/assets/icons/loader.svg';
import emailIcon from '@/assets/icons/email.svg';

const icons = {
  check: CheckmarkIcon,
  edit: EditIcon,
  error: ErrorIcon,
  ok: OkIcon,
  telegram: TelegramIcon,
  time: TimeIcon,
  arrow: ArrowIcon,
  rect: RectsIcon,
  money: MoneyIcon,
  moon: MoonIcon,
  copy: copyIcon,
  sun: sunIcon,
  coupon: couponIcon,
  google: googleIcon,
  menu: menuIcon,
  order: orderIcon,
  vk: vkIcon,
  gem: gemIcon,
  profile: profileIcon,
  house: houseIcon,
  loader: loaderIcon,
  email: emailIcon
} as const;

export interface IconProps {
  name: keyof typeof icons;
  spin?: boolean;
}

export const Icon: React.FC<IconProps & Omit<InlineSvgProp, 'src'>> = ({
  name,
  spin,
  className,
  ...props
}) => {
  const iconSrc = icons[name];
  if (!iconSrc) return null;

  return (
    <SVG
      {...props}
      src={iconSrc}
      className={classNames(className, spin && styles.spin)}
    />
  );
};
