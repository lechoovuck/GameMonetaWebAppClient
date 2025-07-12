import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import styles from './styles.module.scss';

interface CategoryProps {
  id: number;
  name: string;
  imageUrl?: string;
  className?: string;
  shape?: 'square' | 'rect' | undefined;
}

export const Category: React.FC<CategoryProps> = ({
  id,
  name,
  imageUrl,
  className,
  shape
}) => {
  return (
    <div className={cn(styles.Category, className)}>
      <div className={shape === 'square' ? styles.Category__image_square : styles.Category__image}>
        <img src={imageUrl} />
      </div>

      <Link
        className={styles.Category__link}
        to={`${AppRoute.Categories}/${id}${AppRoute.Subcategories}`}
      >
        {name}
      </Link>
    </div>
  );
};
