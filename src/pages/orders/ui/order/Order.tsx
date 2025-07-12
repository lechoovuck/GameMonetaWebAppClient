import cn from 'classnames';
// import { OrderCodes } from '../order-codes';
import styles from './Order.module.scss';
import { Invoice } from '@/types/invoice';
import { STATUS_TEXT } from '@/const'
// import { useNavigate } from 'react-router-dom';
// import { AppRoute } from '@/const';

interface OrderProps {
  data: Invoice;
}

export const Order: React.FC<OrderProps> = ({ data }) => {
  const statusText = (() => STATUS_TEXT[data.status])();
  // const navigator = useNavigate();
  const onClick = () => {
    switch (data.status) {
      case "order_ok":
        window.location.href = (`/order?uuid=${data?.uuid}`);
        break;
      default:
        if (data?.product.subcategory.id === 1) window.location.href = (`https://pay.gamemoneta.com/?uuid=${data?.uuid}`);
        else window.location.href = (`/order?uuid=${data?.uuid}`);
        break;

    }
  }

  return (
    <div className={cn(styles.Order, styles[`Order_status_${data.status}`])} onClick={onClick}>
      <div className={styles.Order__header}>
        <div className={styles.Order__orderId}>
          <span>{data.uuid}</span>
        </div>
        <span>{statusText}</span>
      </div>

      <div className={styles.Order__product}>
        <img src={data.product.image_url} alt="" />
        <div>
          <p className={styles.Order__productVariant}>{data.product.name}</p>
          <p className={styles.Order__productName}>{data?.product.subcategory.category.name} - {data?.product.subcategory.name}
            {data?.order_info?.robux && (' - ' + data?.order_info?.robux.label)}
            {data?.order_info?.pubg_uc && (' - ' + data?.order_info?.pubg_uc.label)}
          </p>
        </div>
      </div>

      {/* <OrderCodes codes={data.codes} /> */}

      <div className={styles.Order__footer}>
        <time dateTime={data.created_at}>
          {data?.created_at
            ? (() => {
              const utcDate = new Date(data?.created_at);
              const localOffset = new Date().getTimezoneOffset() * 60 * 1000;
              const localTime = new Date(utcDate.getTime() - localOffset);

              return localTime.toLocaleString("ru-RU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
            })()
            : "Дата и время не указаны"
          }
        </time>
        {
          data?.order_info?.robux && <span>{data?.order_info?.robux.price} ₽</span>
        }
        {
          data?.order_info?.pubg_uc && <span>{data?.order_info?.pubg_uc.price} ₽</span>
        }
        {data?.product.id === 1 && <>
          {
            data?.order_info?.amount && <span>{data?.order_info?.amount}
              {data?.order_info?.region == 'ru' && ' ₽'}
              {data?.order_info?.region == 'kz' && ' ₸'}
              {data?.order_info?.region == 'cis' && ' $'} </span>
          }
          {data?.order_info?.steam_deposit_amount_rub && <span>{data?.order_info?.steam_deposit_amount_rub} ₽</span>}
          {data?.order_info?.steam_deposit_amount_kzt && <span>{data?.order_info?.steam_deposit_amount_kzt} ₸</span>}
          {data?.order_info?.steam_deposit_amount_usd && <span>{data?.order_info?.steam_deposit_amount_usd} $</span>}
        </>}

      </div>
    </div>
  );
};
