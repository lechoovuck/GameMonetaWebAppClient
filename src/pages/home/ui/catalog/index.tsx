import { useMemo, useState } from 'react';
import { useProductsAll } from '@/shared/api';
import { Product } from '@/shared/ui';
import styles from './styles.module.scss';

export const Catalog: React.FC = () => {
  const [category] = useState<Category>();

  const { data } = useProductsAll();

  const products = data?.products;

  const showProducts = useMemo(() => {
    return (products || []).filter(v => v.subcategory.category.id === category?.id);
  }, [products, category]);

  return (
    <div className={styles.Catalog}>
      <div className={styles.Catalog__buttons}>
        {/*
        <Button
          onClick={() => setCategory('game')}
          color={category === 'game' ? 'default' : 'secondary'}
        >
          <IconDeviceGamepad2 strokeWidth={1.5} />
          Пополнение игр
        </Button>
        */}


        {/*
        <Button
          onClick={() => setCategory('service')}
          color={category === 'service' ? 'default' : 'secondary'}
        >
          <IconBrandSteam strokeWidth={1.5} />
          Сервисы
        </Button>

        <Button
          onClick={() => setCategory('app')}
          color={category === 'app' ? 'default' : 'secondary'}
        >
          <IconBrandSkype strokeWidth={1.5} />
          Программы
        </Button>
        */}
      </div>

      <div className={styles.Catalog__products}>
        {showProducts.map(v => (
          <Product
            name={v.name}
            id={v.id}
            imageUrl={v.image_url}
            key={v.id}
          />
        ))}
      </div>
    </div>
  );
};
