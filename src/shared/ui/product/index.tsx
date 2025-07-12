import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import styles from './styles.module.scss';

interface ProductProps {
  id: number;
  name: string;
  imageUrl: string;
  className?: string;
  price?: number | null;
  shape?: 'square' | 'rect' | undefined;
}

export const Product: React.FC<ProductProps> = ({
  id,
  name,
  imageUrl,
  className,
  price,
  shape
}) => {
  return (
    <div className={cn(styles.Product, className)}>
      <div className={
        (shape === 'square' && styles.Product__image_square)
        || (shape === 'rect' && styles.Product__image_rect)
        || styles.Product__image} >
        <img src={imageUrl ?? `public/images/products/preview/${imageUrl}`} />
      </div>
      {price
        ? <p className={styles.Product__price}>
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
        className={styles.Product__link}
        to={`${AppRoute.Product}/${id}`}
      >
        {name}
      </Link>
    </div>
  );
};
