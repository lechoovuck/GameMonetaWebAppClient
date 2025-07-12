import { useEffect, useState } from 'react';
import { Panel, RadioButton } from '@/shared/ui';
import styles from './styles.module.scss';
import { useProductContext } from '../../lib/context';

interface PayOptionsProps {}

export const PayOptions: React.FC<PayOptionsProps> = () => {
  const { payload, setPayload } = useProductContext();

  const [payMethod, setPayMethod] = useState(() => payload.pay_options.method);

  useEffect(() => {
    setPayload(os => ({
      ...os,
      pay_options: { method: payMethod },
    }));
  }, [payMethod, setPayload]);

  return (
    <Panel className={styles.PayOptions}>
      <Panel.Title>Способ оплаты</Panel.Title>
      <div className={styles.PayOptions__buttons}>
        <RadioButton
          onClick={() => setPayMethod('сбп')}
          selected={payMethod === 'сбп'}
          icon={<img src="/images/icons/pay1.png" />}
        >
          СБП
        </RadioButton>
      {/*

        <RadioButton
          onClick={() => setPayMethod('card')}
          selected={payMethod === 'card'}
          icon={<img src="/images/icons/pay2.png" />}
        >
          Карта
        </RadioButton>

        <RadioButton
          onClick={() => setPayMethod('webmoney')}
          selected={payMethod === 'webmoney'}
          icon={<img src="/images/icons/pay3.png" />}
        >
          Webmoney
        </RadioButton>

        <RadioButton
          onClick={() => setPayMethod('usdt')}
          selected={payMethod === 'usdt'}
          icon={<img src="/images/icons/pay4.png" />}
        >
          USDT
        </RadioButton>
        */}
      </div>
      {/*
      <Panel.Title>Регион аккаунта</Panel.Title>
      <div className={styles.PayOptions__buttons}>
        <RadioButton
          onClick={() => setPayRegion('any')}
          selected={payRegion === 'any'}
        >
          Любой
        </RadioButton>

        <RadioButton
          onClick={() => setPayRegion('снг')}
          selected={payRegion === 'снг'}
        >
          СНГ
        </RadioButton>

      </div>
      */}
    </Panel>
  );
};
