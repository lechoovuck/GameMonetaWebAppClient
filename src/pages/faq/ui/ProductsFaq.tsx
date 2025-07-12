import { Faq } from '@/shared/ui';
import styles from './ProductsFaq.module.scss';


export const ProductsFaq: React.FC<ProductsFaqProps> = ({ faqData }) => {
  return (
    <Faq className={styles.ProductsFaq}>
      {faqData.map((item, index) => (
        <Faq.Item key={index} question={item.question}>
          <div className={styles.ProductsFaq__answer} dangerouslySetInnerHTML={{ __html: item.answer }} />
        </Faq.Item>
      ))}
    </Faq>
  );
};