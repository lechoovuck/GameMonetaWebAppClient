import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import styles from './styles.module.scss';

interface GiftProps {
  id: number;
  name: string;
  imageUrl: string;
  className?: string;
  price?: number | null;
  shape?: 'square' | 'rect' | undefined;
}

export const Gift: React.FC<GiftProps> = ({
  id,
  name,
  imageUrl,
  className,
  price,
  shape
}) => {
  return (
    <div className={cn(styles.Gift, className)}>
      <div className={
        (shape === 'square' && styles.Gift__image_square)
        || (shape === 'rect' && styles.Gift__image_rect)
        || styles.Gift__image} >
        <img src={imageUrl} />
      </div>
      {price
        ? <p className={styles.Gift__price}>
          {
            new Intl.NumberFormat('ru-RU', {
              style: 'currency',
              currency: 'RUB',
              minimumFractionDigits: 0,
            }).format(price)
          }
        </p>
        : undefined}
      <Link
        className={styles.Gift__link}
        to={`${AppRoute.Gift}/${id}`}
      >
        {name}
      </Link>
    </div>
  );
};
