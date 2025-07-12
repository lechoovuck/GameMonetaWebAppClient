import { BaseLayout } from '../_layouts';
// import { AuthCover, AuthPanel } from '../sign-in/ui';
import { AuthPanel } from '../sign-in/ui';
import styles from './PasswordNew.module.scss';

export const PasswordNew: React.FC = () => {
  return (
    <BaseLayout title="Новый пароль" witoutFaq>
      <div className={styles.PasswordNew}>
        {/* <AuthCover /> */}
        <AuthPanel.PasswordNew />
      </div>
    </BaseLayout>
  );
};
