import { useEffect, useState } from 'react';
import { useTimeoutFn } from 'react-use';
import { CopyToClipboardState } from 'react-use/lib/useCopyToClipboard';
import styles from './CopyStatus.module.scss';
import cn from 'classnames';

interface CopyStatusProps {
  status: CopyToClipboardState;
  children?: React.ReactNode;
  className?: string;
}

export const CopyStatus: React.FC<CopyStatusProps> = ({
  status,
  children,
  className,
}) => {
  const [showStatus, setShowStatus] = useState(false);

  const hideStatus = () => setShowStatus(false);
  const [reset] = useTimeoutFn(hideStatus, 3000);

  useEffect(() => {
    if (status.value) {
      setShowStatus(true);
      reset();
    }
  }, [status]);

  if (!status.value || !showStatus) return children;

  return (
    <span className={cn(styles.CopyStatus, className)}>
      {status.error ? (
        <span className={styles.CopyStatus__error}>Ошибка копирования</span>
      ) : (
        <span className={styles.CopyStatus__succes}>Скопированно</span>
      )}
    </span>
  );
};
