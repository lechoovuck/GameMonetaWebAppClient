import { useMemo } from 'react';
import { useCategoriesAll } from '@/shared/api';
import { Category, Gifts } from '@/shared/ui';
import styles from './styles.module.scss';

export const Categories: React.FC = () => {
  const { data } = useCategoriesAll();

  const categories = data?.categories;

  const showProducts = useMemo(() => {
    return (categories || []).filter(v => v.id !== 2);
  }, [categories]);

  return (
    <div className={styles.Categories}>
      <div className={styles.Popular__title}>
        <h2>Категории</h2>
      </div>

      <div className={styles.Categories__buttons}>
        {/*
        <Button
          onClick={() => setCategory('game')}
          color={category === 'game' ? 'default' : 'secondary'}
        >
          <IconDeviceGamepad2 strokeWidth={1.5} />
          Пополнение игр
        </Button>

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

      <div className={styles.Categories__products}>
        {showProducts.map(v => (
          <Category
            name={v.name}
            id={v.id}
            imageUrl={v.image_url}
            key={v.id}
            shape={'square'}
          />
        ))}
        <Gifts />
      </div>
    </div>
  );
};
