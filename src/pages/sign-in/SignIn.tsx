import { BaseLayout } from '../_layouts';
// import { AuthCover, AuthPanel } from './ui';
import { AuthPanel } from './ui';
import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  return (
    <BaseLayout title="Вход" witoutFaq>
      <div className={styles.SignIn}>
        {/* <AuthCover /> */}
        <AuthPanel.SignIn />
      </div>
    </BaseLayout>
  );
};
