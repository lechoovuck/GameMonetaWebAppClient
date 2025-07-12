import React, { useEffect } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useTheme } from '@/feature/theme/lib/context.tsx';
import styles from './styles.module.scss';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();
  const logoLight = '/images/logo/logo.webp';
  const logoDark = '/images/logo/logo_dark.webp';
  const logoSrc = theme === 'night' ? logoDark : logoLight;
  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    preloadImage(logoLight);
    preloadImage(logoDark);
  }, []);

  return (
    <Link className={cn(styles.Logo, className)} to={'/'}>
      <img src={logoSrc} alt="Logo" />
      {/* <h3 className={styles.Logo__name}>{import.meta.env.VITE_LOGO_TEXT}</h3> */}
    </Link>
  );
};
