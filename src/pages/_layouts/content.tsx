import { BreadCrumbs, Footer, Header } from '@/feature';
import { useTitle } from 'react-use';
import styles from './styles.module.scss';

interface ContentLayoutProps {
  children?: React.ReactNode;
  title?: string;
  contentTitle: string;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  children,
  title = import.meta.env.VITE_DEFAULT_TITLE,
  contentTitle,
}) => {
  useTitle(title);

  return (
    <>
      <Header />

      <div className={styles.ContentLayout}>
        <BreadCrumbs text={contentTitle} />
        <h2>{contentTitle}</h2>

        {children}
      </div>
      <Footer />
    </>
  );
};
