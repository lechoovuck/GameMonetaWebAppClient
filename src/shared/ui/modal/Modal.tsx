import { createPortal } from 'react-dom';
import { Icon } from '../icon';
import styles from './Modal.module.scss';
import { Overlay } from '../overlay';
import { Z_INDEX__MODAL } from '@/const';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.Modal__wrapper}>
      <Overlay onClick={onClose} zIndex={Z_INDEX__MODAL} />

      <div className={styles.Modal}>
        <button className={styles.Modal__close} onClick={onClose}>
          <Icon name="error" width={32} height={32} />
        </button>
        <div className={styles.Modal__title}>{title}</div>
        <div className={styles.Modal__body}>{children}</div>
      </div>
    </div>,
    document.querySelector('#modals_portal')!
  );
};
