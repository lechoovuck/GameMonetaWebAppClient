import { Footer, Header } from '@/feature';
import { Faq, Loader } from '@/shared/ui';
import { useTitle } from 'react-use';
import styles from './styles.module.scss';

interface BaseLayoutProps {
  children?: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  witoutFaq?: boolean;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  title = import.meta.env.VITE_DEFAULT_TITLE,
  isLoading,
  witoutFaq,
}) => {
  useTitle(title);

  return (
    <>
      <Header />

      {isLoading && (
        <div className={styles.BaseLayout__loader}>
          <Loader />
        </div>
      )}

      {!isLoading && children}

      {!witoutFaq && (
        <GlobalFaq />
      )}

      <Footer />
    </>
  );
};

const GlobalFaq: React.FC = () => {
  return (
    <div className={styles.GlobalFaq}>
      <h2>Вопросы и ответы</h2>

      <Faq>
        <Faq.Item question="С каких карт можно пополнять игровые кошельки?">
          С любых российских банковских карт.
        </Faq.Item>

        <Faq.Item question="Что такое ваучер?">
          Вaучер — уникaльнaя комбинaция из цифр и букв. У вaучера есть денежный
          номинaл, который зачисляется на игровой кошелек при активации.
        </Faq.Item>

        <Faq.Item question="Как получить ваучер после оплаты?">
          Ваучер и инструкцию по активации пришлём в течение 15 минут после
          оплаты на ваш e‑mail.
        </Faq.Item>

        <Faq.Item question="Что делать, если не пришло письмо с ваучером?">
          Проверьте в почте папку Спам, если письмо не пришло, напишите на
          support@gamemoneta.com.
        </Faq.Item>

        <Faq.Item question="Можно ли вернуть деньги за ваучер после покупки?">
          К сожалению, нет. Ваучер невозвратный.
        </Faq.Item>
      </Faq>
    </div>
  );
};
