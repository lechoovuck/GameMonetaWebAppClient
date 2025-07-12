import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import styles from './styles.module.scss';
import 'react-tooltip/dist/react-tooltip.css';
import { IconHelp } from '@tabler/icons-react';

interface TooltipProps {
  title?: string;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ title, content }) => {
  const id = useId();

  return (
    <>
      <span data-tooltip-id={id} className={styles.Tooltip__icon}>
        <IconHelp />
      </span>

      <ReactTooltip
        id={id}
        className={styles.Tooltip}
        border="1px solid var(--additional-text-color)"
        offset={8}
      >
        {title && <div className={styles.Tooltip__title}>{title}</div>}
        <p>{content}</p>
      </ReactTooltip>
    </>
  );
};
