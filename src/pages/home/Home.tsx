import { useProductsAll } from '@/shared/api';
import { Loader } from '@/shared/ui';
import { BaseLayout } from '../_layouts';
import { MainSlider, Categories, Bonus, InfiniteScrollBlock } from './ui';
import styles from './styles.module.scss';

const SEOdata = {
  h1: 'Система пополнения счета Steam аккаунта',
  p: 'Моментально получите средства на аккаунт Steam любым удобным для Вас способом. Даем возможность для наших клиентов сделать все игры доступными!',
};

export const Home: React.FC = () => {
  const { isLoading, data } = useProductsAll();

  return (
    <BaseLayout>
      <MainSlider />
      <h1 className={styles.seoHidden}>{SEOdata.h1}</h1>
      <p className={styles.seoHidden}>{SEOdata.p}</p>

      <div className={styles.HomePage}>
        {isLoading ? (
          <Loader />
        ) : <Categories />}
      </div>

      <Bonus />
      {data?.products && <InfiniteScrollBlock products={data.products} />}
    </BaseLayout>
  );
};
