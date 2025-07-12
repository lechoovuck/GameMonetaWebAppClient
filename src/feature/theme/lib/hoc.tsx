import { ThemeProvider } from './context';

export const withTheme = (component: () => React.ReactNode) => () => {
  return <ThemeProvider>{component()}</ThemeProvider>;
};
