import { useParams } from 'react-router-dom';
import { BreadCrumbs } from '@/feature';
import { useGiftsGetById } from '@/shared/api';
import { useMediaQuery } from '@/shared/hooks';
import { BaseLayout } from '../_layouts';
import { ProductProvider } from './lib/context';
import { Bill, Card, GiftOptions, PayOptions } from './ui';
import styles from './styles.module.scss';
import { useMemo } from 'react';
import { ProductsFaq } from '@/pages/faq/ui';

export const Gift: React.FC = () => {
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
        <div className={styles.GiftPage}>
          <BreadCrumbs items={[
            { text: `${product.subcategory?.category.name}`, url: `/gifts` },
            { text: product.name }]} />

          <div className={styles.GiftPage__content}>
            <Card
              title={product.name}
              imageUrl={product.preview_image_url ?? product.image_url}
              descriptions={product.description}
              isGift
            >
              {isWideScreen && <ProductsFaq faqData={product.faq} />}
            </Card>

            <div className={styles.GiftPage__options}>
              <GiftOptions
                productId={product.id}
                options={product.options}
                optionsText={product.options_text}
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
