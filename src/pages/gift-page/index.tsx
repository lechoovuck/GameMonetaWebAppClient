import { useParams } from 'react-router-dom';
import { useGiftsGetById } from '@/shared/api';
import { useMediaQuery } from '@/shared/hooks';
import { BaseLayout } from '../_layouts';
import { ProductProvider } from './lib/context';
import { Bill, Card, ProductOptions, PayOptions } from './ui';
import styles from './styles.module.scss';
import { useMemo } from 'react';
import { ProductsFaq } from '@/pages/faq/ui';

export const ProductPage: React.FC = () => {
  const id = useParams().id;

  const { data, isLoading, isError } = useGiftsGetById({
    variables: { id: Number(id) },
    enabled: !isNaN(Number(id)),
  });

  const product = useMemo(() => data?.data, [data]);

  const isWideScreen = useMediaQuery('(min-width: 1032px)');

  if (isError) return 'Error..';
  if (isLoading || product === undefined) return <BaseLayout isLoading />;

  return (
    <BaseLayout title={product.name}>
      <ProductProvider>
        <div className={styles.ProductPage}>
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
