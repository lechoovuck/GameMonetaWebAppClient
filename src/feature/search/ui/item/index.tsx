import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute } from '@/const';
import styles from './styles.module.scss';

interface ItemProps {
  data: Product;
  isFocus?: boolean;
}

export const Item: React.FC<ItemProps> = ({ data, isFocus }) => {
  return (
    <div className={cn(styles.Item, isFocus && styles.Item_focus)}>
      <div className={styles.Item__image}>
        <img src={`${data.image_url}`} />
      </div>

      <div>
        <Link
          className={styles.Item__link}
          to={`${AppRoute.Product}/${data.id}`}
        >
          {data.name}
        </Link>
      </div>
    </div>
  );
};
