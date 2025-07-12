import { useTitle } from 'react-use';
import { Footer, Header, NavigationPanel } from '@/feature';
import { Loader } from '@/shared/ui';
import styles from './styles.module.scss';

interface PrivateLayoutProps {
  children?: React.ReactNode;
  title?: string;
  isLoading?: boolean;
}

export const PrivateLayout: React.FC<PrivateLayoutProps> = ({
  children,
  title = import.meta.env.VITE_DEFAULT_TITLE,
  isLoading,
}) => {
  useTitle(title);

  return (
    <>
      <Header />

      {isLoading && (
        <div className={styles.BaseLayout__loader}>
          <Loader />
        </div>
      )}

      {!isLoading && (
        <div className={styles.PrivateLayout}>
          <NavigationPanel className={styles.PrivateLayout__navBar} />
          {children}
        </div>
      )}

      <Footer />
    </>
  );
};
