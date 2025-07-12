import { BaseLayout } from '../_layouts';
// import { AuthCover, AuthPanel } from '../sign-in/ui';
import { AuthPanel } from '../sign-in/ui';
import styles from './EmailNew.module.scss';

export const EmailNew: React.FC = () => {
  return (
    <BaseLayout title="Новая почта" witoutFaq>
      <div className={styles.EmailNew}>
        {/* <AuthCover /> */}
        <AuthPanel.EmailNew />
      </div>
    </BaseLayout>
  );
};
