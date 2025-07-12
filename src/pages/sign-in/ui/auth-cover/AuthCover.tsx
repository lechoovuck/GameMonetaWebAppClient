import styles from './AuthCover.module.scss';

export const AuthCover: React.FC = () => {
  return (
    <div className={styles.AuthCover}>
      <img
        src="/images/auth_cover.png"
        srcSet="/images/auth_cover@2x.png 2x"
        alt=""
      />
    </div>
  );
};
