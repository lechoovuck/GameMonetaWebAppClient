import styles from './styles.module.scss';

interface CardProps {
  title: string;
  descriptions?: string;
  imageUrl: string;
  children?: React.ReactNode;
  isGift?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  descriptions,
  imageUrl,
  children,
  isGift,
}) => {
  return (
    <div className={styles.Card}>
      <h1 className={styles.Card__title}>{title}</h1>
      <div className={isGift ? styles.Card__cover_gift : styles.Card__cover}>
        <img src={imageUrl} />
      </div>



      {descriptions && (
        <p className={styles.Card__description}>{descriptions}</p>
      )}

      {children}

    </div>
  );
};