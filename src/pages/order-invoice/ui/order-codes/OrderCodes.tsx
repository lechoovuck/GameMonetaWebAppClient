import plural from 'plural-ru';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Order } from '@/types/order';
import { Button, CopyStatus, Icon } from '@/shared/ui';
import styles from './OrderCodes.module.scss';

// '1 код', '2 кода', '10 кодов'
const CODES_TEXT = ['код', 'кода', 'кодов'] as const;

interface OrderCodesProps {
  codes: Order['codes'];
}

export const OrderCodes: React.FC<OrderCodesProps> = ({ codes }) => {
  const [status, copy] = useCopyToClipboard();
  const [open, setOpen] = useState(false);

  if (!codes || !codes.length) return null;
  const amount = codes.length;

  return (
    <div className={styles.OrderCodes}>
      <h4 className={styles.OrderCodes__header}>
        {amount > 1
          ? `Ваши ${amount} ${plural(amount, ...CODES_TEXT)} пополнения:`
          : 'Ваш код пополнения:'}
      </h4>

      {open && (
        <div className={styles.OrderCodes__list}>
          {codes.map(code => (
            <div className={styles.OrderCodes__item}>
              <code>
                <span>{code}</span>
              </code>
              <CopyButton code={code} />
            </div>
          ))}
        </div>
      )}

      {!open && (
        <Button
          className={styles.OrderCodes__showCodeButton}
          onClick={() => setOpen(true)}
        >
          {amount > 1 ? 'Показать все коды' : 'Показать код'}
        </Button>
      )}

      {amount > 1 && open && (
        <CopyStatus status={status}>
          <Button onClick={() => copy(codes.join('\n'))}>
            Скорпировать все
          </Button>
        </CopyStatus>
      )}
    </div>
  );
};

interface CopyButtonProps {
  code: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ code }) => {
  const [status, copy] = useCopyToClipboard();

  return (
    <div className={styles.CopyButton}>
      <CopyStatus status={status} className={styles.CopyButton__status}>
        <Button color="secondary" onClick={() => copy(code)}>
          <Icon name="copy" />
        </Button>
      </CopyStatus>
    </div>
  );
};
