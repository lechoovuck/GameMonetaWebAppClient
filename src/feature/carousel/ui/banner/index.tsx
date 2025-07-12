import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';

interface BannerProps {
  data: CarouselItemParams;
}

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const [mouseDownPos, setMouseDownPos] = useState<{ x: number; y: number } | null>(null);
  const hasMovedRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    hasMovedRef.current = false;
  };

  const handleMouseMove = () => {
    if (mouseDownPos) {
      hasMovedRef.current = true;
    }
  };

  const handleMouseUp = () => {
    setMouseDownPos(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (hasMovedRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      className={styles.Banner}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img className={styles.Banner__image} src={data.image} />

      {data.url && (
        <Link
          className={styles.Banner__link}
          to={data.url}
          target={data.url_external ? '_blank' : undefined}
          onClick={handleClick}
        />
      )}
    </div>
  );
};