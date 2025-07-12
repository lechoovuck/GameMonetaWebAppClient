import { BaseLayout } from '../_layouts';
import { AuthCover, AuthPanel } from '../sign-in/ui';
import styles from './SignUp.module.scss';

export const SignUp: React.FC = () => {
  return (
    <BaseLayout title="Регистрация" witoutFaq>
      <div className={styles.SignUp}>
        <AuthCover />
        <AuthPanel.SignUp />
      </div>
    </BaseLayout>
  );
};
