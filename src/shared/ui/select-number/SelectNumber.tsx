import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { Button } from '../button';
import { useState, useEffect, useCallback } from 'react';
import styles from './SelectNumber.module.scss';

interface SelectNumberProps {
  value: number;
  onChange?: React.Dispatch<React.SetStateAction<number | undefined>>;
  min?: number;
  max?: number;
}

export const SelectNumber: React.FC<SelectNumberProps> = ({
  value,
  onChange,
  min = 0,
  max,
}) => {
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const changeValue = useCallback(
    (to: number) => {

        if (onChange)
        onChange(os => {
          let newValue = (os || 0) + to;

          if (newValue < min) newValue = min;
          if (max !== undefined && newValue > max) newValue = max;

          return newValue;
        });
    },
    [value, min, max, onChange]
  );

  const handleStart = useCallback(
    (to: number, skipFirstInc?: boolean) => {
      if (!skipFirstInc) changeValue(to);

      const timeoutId = setTimeout(() => {
        const id = setInterval(() => {
          changeValue(to);
        }, 150); // Change the value every 100ms
        setIntervalId(id);
      }, 300); // Start changing the value continuously after 300ms

      setIntervalId(timeoutId);
    },
    [changeValue]
  );

    const handleTouchStart = (to: number) => {
    handleStart(to, true);
  };


  const handleEnd = useCallback(() => {
    if (intervalId) {
      clearTimeout(intervalId);
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className={styles.SelectNumber}>
      <Button
        onMouseDown={() => handleStart(-1)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={() => handleTouchStart(-1)}
        onTouchEnd={handleEnd}
        color="secondary"
        isOnlyIcon
      >
        <IconChevronLeft />
      </Button>

      <div className={styles.SelectNumber__value}>{value}</div>

      <Button
        onMouseDown={() => handleStart(+1)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={() => handleTouchStart(+1)}
        onTouchEnd={handleEnd}
        color="secondary"
        isOnlyIcon
      >
        <IconChevronRight />
      </Button>
    </div>
  );
};