import cn from 'classnames';
import { format } from 'date-fns';
import { Order as OrderType } from '@/types/order';
import { useProductsAll } from '@/shared/api';
import { OrderCodes } from '../order-codes';
import styles from './Order.module.scss';

interface OrderProps {
  data: OrderType;
}

export const Order: React.FC<OrderProps> = ({ data }) => {
  const { data: productsData } = useProductsAll();

  const product = productsData?.products.find(
    v => v.id === data.product_id
  );

  const statusText = (() => {
    if (data.status === 'success') return 'Завершено';
    else if (data.status === 'error') return 'Ошибка';
    return 'Обработка';
  })();

  return (
    <div className={cn(styles.Order, styles[`Order_status_${data.status}`])}>
      <div className={styles.Order__header}>
        <div className={styles.Order__orderId}>
          <span>{data.order_id}</span>
        </div>
        <span>{statusText}</span>
      </div>

      <div className={styles.Order__product}>
        <img src={`/images/products/preview/${product?.name}.png`} alt="" />
        <div>
          <p className={styles.Order__productVariant}>{data.product_text}</p>
          <p className={styles.Order__productName}>{product?.name}</p>
        </div>
      </div>

      <OrderCodes codes={data.codes} />

      <div className={styles.Order__footer}>
        <time dateTime={data.date}>
          {format(data.date, 'dd.MM.yyyy hh:mm')}
        </time>
        <span>RUB {data.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
