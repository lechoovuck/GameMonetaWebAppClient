import { BaseLayout } from '../_layouts';
// import { AuthCover, AuthPanel } from '../sign-in/ui';
import { AuthPanel } from '../sign-in/ui';
import styles from './PasswordReset.module.scss';

export const PasswordReset: React.FC = () => {
  return (
    <BaseLayout title="Восстановление пароля" witoutFaq>
      <div className={styles.PasswordReset}>
        {/* <AuthCover /> */}
        <AuthPanel.PasswordReset />
      </div>
    </BaseLayout>
  );
};
