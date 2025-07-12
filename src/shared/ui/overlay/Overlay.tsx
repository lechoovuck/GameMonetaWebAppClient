import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { scrollBlock, scrollUnblock } from '@/shared/lib';
import styles from './Overlay.module.scss';

interface OverlayProps {
  onClick?: () => void;
  zIndex?: number;
}

export const Overlay: React.FC<OverlayProps> = ({ onClick, zIndex = 999 }) => {
  useEffect(() => {
    scrollBlock();
    return () => scrollUnblock();
  }, []);

  return createPortal(
    <div className={styles.Overlay} onClick={onClick} style={{ zIndex }} />,
    document.getElementById('overlay_portal')!
  );
};
