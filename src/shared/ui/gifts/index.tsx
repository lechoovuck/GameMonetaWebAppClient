import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import styles from './styles.module.scss';


interface GiftsProps {
  imageUrl?: string;
  className?: string; // 'square'
}

export const Gifts: React.FC<GiftsProps> = ({
  className,
}) => {
  return (
    <div className={cn(styles.Category, className)}>
      <div className={styles.Category__image_square}>
        <img src={"/images/products/preview/in-development-category.webp"} />
      </div>

      <Link
        className={styles.Category__link}
        to={AppRoute.Gifts}
      >
        Гифты
      </Link>
    </div>
  );
};
