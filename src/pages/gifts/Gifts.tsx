import { BaseLayout } from '../_layouts';
import styles from './styles.module.scss';
import { useGiftsAll } from '@/shared/api';
import { Gift } from '@/shared/ui';
import { BreadCrumbs } from '@/feature';

export const Gifts: React.FC = () => {

  const { data, isError, isLoading } = useGiftsAll();

  const gifts = data?.gifts;

  if (isError) return 'Error..';
  if (isLoading || !gifts) return <BaseLayout isLoading />;

  const popularProducts = gifts?.filter(v => v.name);

  if (!popularProducts.length) return null;


  return (
    <BaseLayout title="Гифты">
      <div className={styles.GiftsPage}>
        <BreadCrumbs text={"Гифты"} />
        <h3>Гифты</h3>
        <div className={styles.Gifts__products}>
          {gifts.map(v => <Gift
            name={v.name}
            id={v.id}
            imageUrl={v.image_url}
            key={v.id}
            price={v.price}
            shape='rect'
          />
          )}
        </div>

      </div>
    </BaseLayout>
  );
};
