import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '@/feature';
import { BaseLayout } from '../_layouts';
import styles from './styles.module.scss';
import { useProductsAll, useSubcategoriesAll } from '@/shared/api';
import { Product } from '@/shared/ui';

export const Subcategories: React.FC = () => {

  const id = useParams().id;

  const subcategory = useSubcategoriesAll({
    variables: { id: Number(id) },
  });
  const subcategories = subcategory.data?.subcategories;

  const { data, isLoading, isError } = useProductsAll();

  const products = data?.products;

  if (isError) return 'Error..';
  if (isLoading || !subcategories || !products) return <BaseLayout isLoading />;

  const popularProducts = data!.products.filter(v => v.name);

  if (!popularProducts.length) return null;


  return (
    <BaseLayout title={subcategories[0]?.category.name}>
        <div className={styles.SubcategoriesPage}>
          <BreadCrumbs text={subcategories[0]?.category.name} />

          {subcategories.map(subcategory => (
            <div className={styles.Subcategories__block} key={subcategory.id}>
              <h3>{subcategory.name}</h3>
              <div className={styles.Subcategories__products}>
                {products.map(v => {
                  if (v.subcategory.id === subcategory.id) return (
                    <Product
                      name={v.name}
                      id={v.id}
                      imageUrl={v.image_url}
                      key={v.id}
                      price={v.price}
                    />
                  );
                })}
              </div>
            </div>
          ))}

        </div>
    </BaseLayout>
  );
};
