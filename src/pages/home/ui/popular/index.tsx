import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useProductsAll } from '@/shared/api';
import { Button, Product } from '@/shared/ui';

import styles from './styles.module.scss';
import 'swiper/css';
import { useWindowSize } from 'react-use';

export const Popular: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const { width } = useWindowSize();

  const { data } = useProductsAll();
  const popularProducts = data!.products.filter(v => v.name);

  if (!popularProducts.length) return null;

  return (
    <div className={styles.Popular}>
      <div className={styles.Popular__title}>
        <h2>Популярное</h2>
        <Button
          color="secondary"
          onClick={() => swiperRef.current?.slidePrev()}
          isOnlyIcon
        >
          <IconChevronLeft />
        </Button>
        <Button
          color="secondary"
          onClick={() => swiperRef.current?.slideNext()}
          isOnlyIcon
        >
          <IconChevronRight />
        </Button>
      </div>

      {width > 375 ? (
        <Swiper
          spaceBetween={12}
          slidesPerView={3.2}
          // onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            744: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
          }}
        >
          {popularProducts.map(v => (
            <SwiperSlide>
              <Product
                id={v.id}
                name={v.name}
                imageUrl={v.image_url}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.Popular__grid}>
          {popularProducts.map(v => (
            <Product
              id={v.id}
              name={v.name}
              imageUrl={v.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};
