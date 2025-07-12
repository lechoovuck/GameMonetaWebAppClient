import React from 'react';
import { useTheme } from '../lib';
import { Toggle } from '@/shared/ui';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === 'night';

  return (
    <Toggle
      value={isDarkTheme}
      onToggle={toggleTheme}
      iconName={isDarkTheme ? 'moon' : 'sun'}
      className={className}
      // prettier-ignore
      colors={{
          bg: { active: 'var(--additional-color-night)', inactive: 'var(--additional-color-day)' },
          button: { active: 'var(--white-night)', inactive: 'var(--white-day)' },
          color: { active: 'var(--additional-color-night)', inactive: 'var(--additional-color-day)' },
        }}
    />
  );
};
