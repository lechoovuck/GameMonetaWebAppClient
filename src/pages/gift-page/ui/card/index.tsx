import styles from './styles.module.scss';

interface CardProps {
  title: string;
  descriptions?: string;
  imageUrl: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  descriptions,
  imageUrl,
  children
}) => {
  return (
    <div className={styles.Card}>
      <h1 className={styles.Card__title}>{title}</h1>
      <div className={styles.Card__cover}>
        <img src={imageUrl} />
      </div>

      <div>
        

        {descriptions && (
          <p className={styles.Card__description}>{descriptions}</p>
        )}
      </div>

      {children}
      
    </div>
  );
};
