{/*import React, { useEffect, useState } from 'react';
import { Input, Panel, Tooltip } from '@/shared/ui';
import { useProductContext } from '../../lib/context';
import styles from './styles.module.scss';

interface DeliveryOptionsProps {
  data: ProductDelivery[];
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({ data }) => {
  const { setPayload } = useProductContext();

  const [email, setEmail] = useState('');
  const [otherInputs, setOtherInputs] = useState<{
    [key: string]: string | null;
  }>({});

  // Инициализация значений полей на основе данных
  useEffect(() => {
    const initialInputs = data.reduce(
      (acc, input) => {
        acc[input.key] = input.value;
        return acc;
      },
      {} as { [key: string]: string | null }
    );

    setOtherInputs(initialInputs);
  }, [data]);

  // Обновление payload при изменении email или других инпутов
  useEffect(() => {
    setPayload(os => ({
      ...os,
      delivery: {
        email,
        other: Object.keys(otherInputs).map(key => ({
          key,
          value: otherInputs[key],
        })),
      },
    }));
  }, [email, otherInputs, setPayload]);

  // Обработчик изменения значений полей
  const handleInputChange = (key: string, value: string) => {
    setOtherInputs(prev => ({
      ...prev,
      [key]: value,
    }));
  };

 return (
    <Panel className={styles.DeliveryOptions}>
      <Panel.Title>
        Получить чек{' '}
        <Tooltip
          title="Я подсказка с заголовком :)"
          content="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand the meaning, function or alt-text of an element."
        />
      </Panel.Title>

      <div className={styles.DeliveryOptions__section}>
        {data.map(input => (
          <Input
            key={input.key}
            label={
              <>
                {input.label}{' '}
                {input.tooltip && <Tooltip content={input.tooltip} />}
              </>
            }
            type={input.type}
            placeholder={input.placeholder || ''}
            description={input.description || ''}
            value={otherInputs[input.key] || ''}
            onChange={e => handleInputChange(input.key, e.target.value)}
          />
        ))}
      </div>

      <div
        className={styles.DeliveryOptions__section}
        style={{ gridTemplateColumns: '1fr' }}
      >
        <Input
          label="Получить чек"
          type="email"
          placeholder="E-mail"
          description="Пожалуйста, введите вашу электронную почту, и мы отправим вам чек"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
    </Panel>
  );

};
*/}
