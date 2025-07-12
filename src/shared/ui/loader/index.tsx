import styles from './styles.module.scss';

export const Loader = () => {
  return (
    <div className={styles.Loader__container}>
      <div className={styles.Loader}></div>
      <h5 className={styles.Loader__text}> Загрузка..</h5>
    </div>
  );
};
