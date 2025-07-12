import React, { useEffect, useState, useMemo } from 'react';
import { Panel } from '@/shared/ui';
import cn from 'classnames';

import { BaseLayout } from '../_layouts';
import styles from './OrderInvoice.module.scss';

import { useInvoiceGet } from '@/shared/api';

import { Invoice, PaymentInvoice } from '@/types/invoice.ts'
import { STATUS_TEXT } from '@/const'

export const OrderInvoice: React.FC = () => {
  const uuid = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('uuid');
  }, []);

  if (!uuid) return <BaseLayout isLoading />;

  const { data, isLoading } = useInvoiceGet({
    variables: { uuid: uuid },
  })

  const [invoiceData, setInvoiceData] = useState<Invoice>();
  const [paymentInvoiceData, setPaymentInvoiceData] = useState<PaymentInvoice>();

  const [invoiceDate, setInvoiceDate] = useState<string>();

  useEffect(() => {
    const date = data?.data.created_at
      ? (() => {
        const utcDate = new Date(data?.data.created_at);
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
      : "Дата и время не указаны";
    setInvoiceDate(date)

    setInvoiceData(data?.data)
    setPaymentInvoiceData(data?.payment_invoice)

  }, [data, setInvoiceDate]);

  if (isLoading || !data) return <BaseLayout isLoading />;
  return (
    <BaseLayout title={'Инвойс'}>
      <div className={styles.Invoice__container}>
        <Panel className={styles.Invoice}>
          <div className={styles.Invoice__header}>
            <h3>Заказ {uuid}</h3>
          </div>
          <div className={styles.Invoice__info}>
            {invoiceData?.user && <>
              {
                (invoiceData?.order_info?.login || invoiceData?.login) &&
                <div className={styles.Invoice__field}>
                  <label>Логин:</label>
                  <p>{invoiceData?.order_info?.login}</p>
                </div>
              }
              <div className={styles.Invoice__field}>
                <label>Почта:</label>
                <p>{invoiceData?.delivery_email}</p>
              </div>
            </>}
            <div className={styles.Invoice__field}>
              <label>Товар:</label>
              <p>{invoiceData?.product.name}</p>
            </div>
            <div className={styles.Invoice__field}>
              <label>Сумма к оплате:</label>
              <p>{paymentInvoiceData?.amount 
              || invoiceData?.order_info?.steam_deposit_amount_rub
              || invoiceData?.order_info?.steam_deposit_amount_kzt
              || invoiceData?.order_info?.team_deposit_amount_usd}
                {invoiceData?.order_info?.region == 'ru' && ' ₽'}
                {invoiceData?.order_info?.region == 'kz' && ' ₸'}
                {invoiceData?.order_info?.region == 'cis' && ' $'}
              </p>
            </div>
            <div className={styles.Invoice__field}>
              <label>Дата создания:</label>
              <p>{invoiceDate}</p>
            </div>
            {invoiceData?.status &&
              <div className={styles.Invoice__field}>
                <label>Статус:</label>
                <p className={cn(styles.Invoice__field__status, styles[invoiceData?.status])}>{invoiceData?.status && STATUS_TEXT[invoiceData?.status]}</p>
              </div>
            }
          </div>
        </Panel>
      </div>
    </BaseLayout>
  );
};
