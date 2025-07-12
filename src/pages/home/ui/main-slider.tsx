import { Carousel } from '@/feature';

export const MainSlider: React.FC = () => {
  // можно получать с сервера для изменения слайдов без изменения "клиента"
  const slidesData: CarouselItemParams[] = [
    {
      image: '/images/carousel/steam_top_up_banner.webp',
      url: 'product/1'
    },
    {
      image: '/images/carousel/contest_banner.webp',
    },
  ];

  return (
    <Carousel
      slides={slidesData.map(v => (
        <Carousel.Banner data={v} />
      ))}
    />
  );
};
