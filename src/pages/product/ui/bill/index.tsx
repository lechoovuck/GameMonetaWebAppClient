import { Button, Panel, Icon, Grid, Modal } from '@/shared/ui';
import { useMutation } from '@tanstack/react-query';
import styles from './styles.module.scss';
import { useProductContext } from '../../lib/context';
import { useScrollToElement } from '@/shared/hooks';
import { fetchInvoiceNew } from '@/shared/api/fetchers/invoice';
import { useToggle } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/const';
import { Link } from 'react-router-dom';
import { useProfile } from '@/shared/api';

interface BillProps { }

export const Bill: React.FC<BillProps> = () => {
  const { data, isFetched } = useProfile();

  const [isShowLogInModal, toggleIsShowLogInModal] = useToggle(false);
  const navigate = useNavigate();

  const invoiceNewMutation = useMutation({
    mutationFn: fetchInvoiceNew,
    onError: (error) => {
      console.error('Failed to create invoice:', error);
    },
  });

  const scrollTo = useScrollToElement();
  const { totalPrice, payload, isValidForm, validatorShowAllErrors, bonus, paymentSystem } =
    useProductContext();

  let payment_method: PayMethod, price = totalPrice;

  let tax_percent = import.meta.env.VITE_CURRENCIES_COMMISSION
  const order_info = payload.options.reduce((acc: Record<string, string[] | string | number | boolean>, option) => {
    acc[option.option_id] = option.value;
    return acc;
  }, {});

  if (order_info.region) {
    order_info.region == 'cis' || order_info.region == 'kz' ? tax_percent = import.meta.env.VITE_CURRENCIES_COMMISSION :
    tax_percent = import.meta.env.VITE_SITE_COMMISSION
  }
  const commission = totalPrice * (tax_percent / 100);

  if (paymentSystem == 'profitable') {
    payment_method = 'сбп'
    price += commission
  } else {
    payment_method = 'lava'
  }

  const amount = data && typeof bonus === 'number' && bonus < 0
    ? (price - (bonus < 0 ? Math.abs(bonus) : 0)).toFixed(2)
    : (price).toFixed(2)

  const send = async () => {
    if (!isFetched || !data) toggleIsShowLogInModal()
    if (!isValidForm) {
      validatorShowAllErrors();
      scrollTo('product-options');
      return;
    }

    const order_info = payload.options.reduce((acc: Record<string, string[] | string | number | boolean>, option) => {
      acc[option.option_id] = option.value;
      return acc;
    }, {});

    const dataToSend = {
      product_id: payload.product_id,
      payment_method: payment_method,
      delivery_email: payload.options.find((op) => op.option_id === 'email')!.value as string,
      order_info: order_info,
      amount: Number(amount),
      payment_system: paymentSystem
    };

    await invoiceNewMutation.mutateAsync(dataToSend)
      .then(response => window.location.href = response.redirect_url)
      .catch(error => console.error('Error creating invoice:', error));
  };

  return (
    <Panel className={styles.Bill}>
      <Panel.Title>К оплате</Panel.Title>
      <ul className={styles.Bill__list}>
        <li>
          <b>Сумма</b>
          <span>{totalPrice.toFixed(2)} ₽</span>
        </li>
        {payment_method == 'сбп' && (
          <li>
            <b>Комиссия сервиса</b>
            <span>{commission.toFixed(2)} ₽</span>
          </li>
        )}
        {isFetched && data && typeof bonus === 'number' && (
          <li>
            <b>Бонусы:</b>
            {bonus > 0 ? (
              <span>+ {bonus} <Icon name="gem" /></span>
            ) : (
              <span>- {Math.abs(bonus)} <Icon name="gem" /></span>
            )}
          </li>
        )}
        <li>
          <b>Итого</b>
          <span>{amount} ₽</span>
        </li>
      </ul>
      <Button
        className={styles.Bill__button}
        onClick={data ? send : toggleIsShowLogInModal}
        disabled={invoiceNewMutation.isPending}
      >
        {invoiceNewMutation.isPending ? (
          <Icon name="loader" spin />
        ) : (
          `Оплатить ${amount} ₽`
        )}
      </Button>

      <Modal
        isOpen={isShowLogInModal}
        onClose={toggleIsShowLogInModal}
        title={'Используем бонусную систему?'}
      >
        <div>
          <p>
            <Link to={AppRoute.Bonus}>
              Бонусная система
            </Link>
            &nbsp;
            предусмотрена только для авторизованных пользователей
          </p>

          <Grid cols={2} colsMd={1}>
            <Button
              color="default"
              isOutline
              onClick={() => navigate(AppRoute.SignIn)}
            >
              Войти в профиль
            </Button>

            <Button color="danger" isOutline onClick={send}>
              Нет, оплатить
            </Button>
          </Grid>
        </div>
      </Modal>

    </Panel>
  );
};