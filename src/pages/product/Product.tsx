import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { BreadCrumbs } from '@/feature';
import { useProductsGetById } from '@/shared/api';
import { useMediaQuery } from '@/shared/hooks';
import { BaseLayout } from '../_layouts';
import { ProductProvider } from './lib/context';
import { Bill, Card, ProductOptions, PayOptions } from './ui';
import styles from './styles.module.scss';
import { useMemo, useEffect } from 'react';
import { ProductsFaq } from '@/pages/faq/ui';

export const Products: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currency = searchParams.get('currency') || undefined;

  const { data, isLoading, isError, error } = useProductsGetById({
    variables: { id: Number(id) },
    enabled: !isNaN(Number(id)),
  });

  const product = useMemo(() => {
    const fetchedProduct = data?.data;

    // Проверяем и изменяем структуру данных, если тип 'deposit'
    // if (
    //   fetchedProduct?.options?.type === 'deposit' &&
    //   Array.isArray(fetchedProduct.options.items)
    // ) {
    //   fetchedProduct.options.item = fetchedProduct.options.items[0] || {};
    //   delete fetchedProduct.options.items;
    // }

    // TODO: проверить насколько оно вообще надо
    // fetchedProduct?.options.forEach( opt => {})

    return fetchedProduct;
  }, [data]);

  useEffect(() => {
    if (isError && error) {
      const status = (error as any)?.response?.status || (error as any)?.status;
      if (status === 404) {
        navigate('*', { replace: true });
      }
    }
  }, [isError, error, navigate]);

  const isWideScreen = useMediaQuery('(min-width: 1032px)');

  if (isLoading || product === undefined) return <BaseLayout isLoading />;
  if (isError) return 'Error..';

  return (
    <BaseLayout title={product.name}>
      <ProductProvider>
        <div className={styles.ProductPage}>
          <BreadCrumbs
            items={[
              {
                text: `${product.subcategory?.category.name}`,
                url: `/categories/${product.subcategory?.category.id}/subcategories`,
              },
              { text: product.name },
            ]}
          />

          <div className={styles.ProductPage__content}>
            <Card
              title={product.name}
              imageUrl={product.image_url}
              descriptions={product.description}
            >
              {isWideScreen && <ProductsFaq faqData={product.faq} />}
            </Card>

            <div className={styles.ProductPage__options}>
              <ProductOptions
                productId={product.id}
                options={product.options}
                optionsText={product.options_text}
                currencies={data!.currencies}
                currency={currency as 'rub' | 'kzt' | 'usd'}
              />

              <PayOptions />

              <Bill />

              {!isWideScreen && <ProductsFaq faqData={product.faq} />}
            </div>
          </div>
        </div>
      </ProductProvider>
    </BaseLayout>
  );
};