import { useCallback, useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@/shared/ui';
import { Banner } from './ui';
import styles from './styles.module.scss';

const AUTO_SLIDE_TIME = (import.meta.env.VITE_CAROUSEL_TIMER_SEC || 5) * 1000;

interface CarouselProps {
  className?: string;
  slides: React.ReactNode[];
}

export const Carousel: React.FC<CarouselProps> & { Banner: typeof Banner } = ({
  className,
  slides,
}) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const wasDraggedRef = useRef(false);

  const getIndex = useCallback(
    (offset: number) => {
      const n = slides.length;
      const index = (page + offset) % n;
      return (index + n) % n;
    },
    [slides, page]
  );

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setPage(getIndex(-1));
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setPage(getIndex(1));
  };

  const goToPage = (newPage: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      next();
    }, AUTO_SLIDE_TIME);
  };

  const handleTouchStart = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTouchEnd = () => {
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [page]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      scale: 0.8,
      opacity: 0
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      scale: 0.8,
      opacity: 0,
    }),
  };

  const backSlideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%',
      scale: 0.8,
      opacity: 0,
    }),
    center: {
      x: 0,
      scale: 0.8,
      opacity: 0.5,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-50%' : '50%',
      scale: 0.8,
      opacity: 0,
    }),
  };


  return (
    <div
      className={cn(styles.Carousel, className)}
      onMouseEnter={() => clearInterval(timerRef.current!)}
      onMouseLeave={resetTimer}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.Carousel__slides}>
        <AnimatePresence initial={false} custom={direction}>
          {/* Main Slide */}
          <motion.div
            key={`mainSlide__${getIndex(0)}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={styles.Carousel__mainSlide}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onAnimationComplete={() => setIsAnimating(false)}
            onDragStart={() => {
              wasDraggedRef.current = false;
            }}
            onDrag={(_, data) => {
              if (Math.abs(data.offset.x) > 5) {
                wasDraggedRef.current = true;
              }
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;

              if (swipe < -1000) {
                next();
              } else if (swipe > 1000) {
                prev();
              }
            }}
            onClick={e => {
              if (wasDraggedRef.current) {
                e.preventDefault();
              }
            }}
          >
            {slides[getIndex(0)]}
          </motion.div>

          {/* Previous Slide */}
          <motion.div
            key={`secondarySlide1__${getIndex(-1)}`}
            custom={direction}
            variants={backSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              styles.Carousel__backSlide,
              styles.Carousel__backSlide_prev
            )}
          >
            {slides[getIndex(-1)]}
          </motion.div>

          {/* Next Slide */}
          <motion.div
            key={`secondarySlide2__${getIndex(1)}`}
            custom={direction}
            variants={backSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className={cn(
              styles.Carousel__backSlide,
              styles.Carousel__backSlide_next
            )}
          >
            {slides[getIndex(1)]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.Carousel__nav}>
        <div
          className={styles.Carousel__navButton}
          style={{ transform: 'rotate(180deg)' }}
          onClick={prev}
          onMouseEnter={() => clearInterval(timerRef.current!)}
          onMouseLeave={resetTimer}
        >
          <Icon name="arrow" />
        </div>

        <div className={styles.Carousel__points}>
          {slides.map((_, i) => (
            <span
              key={`Carousel__points_${i}`}
              className={cn(
                styles.Carousel__point,
                i === page && styles.Carousel__point_active,
              )}
              onClick={() => goToPage(i)}
              onMouseEnter={() => clearInterval(timerRef.current!)}
              onMouseLeave={resetTimer}
            />
          ))}
        </div>

        <div
          className={styles.Carousel__navButton}
          onClick={next}
          onMouseEnter={() => clearInterval(timerRef.current!)}
          onMouseLeave={resetTimer}
        >
          <Icon name="arrow" />
        </div>
      </div>
    </div>
  );
};

Carousel.Banner = Banner;
