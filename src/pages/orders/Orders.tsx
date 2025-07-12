import { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { OrderStatus } from '@/types/order';
import { useMutation } from '@tanstack/react-query';
import { fetchInvoiceByUserId } from '@/shared/api/fetchers/invoice';
import { Invoice } from '@/types/invoice';
import { ButtonsGroup, Panel } from '@/shared/ui';
import { PrivateLayout } from '../_layouts';
import { Order } from './ui';
import { Loader } from '@/shared/ui';
import styles from './Orders.module.scss';

export const Orders: React.FC = () => {
  const filterStatus = {
    'wait': ['wait', 'paid', 'canceled', 'refunded', 'process'],
    'success': ['order_ok'],
    'error': ['error', 'order_error'],
  }

  const limit = 5;
  const [cursor, setCursor] = useState<number | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const initialLoadRef = useRef(true);

  const invoicesLoadMutation = useMutation({
    mutationFn: fetchInvoiceByUserId,
    onError: (error) => {
      console.error('Failed to load invoices:', error);
      setIsLoading(false);
    },
  });

  const [filterValue, setFilterValue] = useState<OrderStatus | null>(null);

  const toggleFilterValue = (value: OrderStatus) =>
    setFilterValue((os) => (os === value ? null : value));

  const filteredOrders = useMemo(() => {
    return !filterValue ? invoices : invoices.filter((v) => filterStatus[filterValue].includes(v.status));
  }, [invoices, filterValue]);

  const loadMore = useCallback(async () => {
    if (filterValue != null || isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    try {
      const response = await invoicesLoadMutation.mutateAsync({ limit, cursor });
      
      if (response.data.length === 0 || response.data.length < limit) {
        setHasMore(false);
      }
      
      setInvoices(prev => [...prev, ...response.data]);
      
      if (response.data.length > 0) {
        setCursor(response.data[response.data.length - 1].id);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cursor, limit, isLoading, hasMore, invoicesLoadMutation]);

  // Handle initial load
  useEffect(() => {
    if (initialLoadRef.current) {
      loadMore();
      initialLoadRef.current = false;
    }
  }, [loadMore]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  return (
    <PrivateLayout title="Мои заказы" isLoading={isLoading && invoices.length === 0}>
      <Panel className={styles.Orders}>
        <div className={styles.Orders__header}>
          <h3>Мои заказы</h3>
          <ButtonsGroup className={styles.Orders__statusButtons}>
            <ButtonsGroup.Button
              active={filterValue === 'wait'}
              onClick={() => toggleFilterValue('wait')}
            >
              Обработка
            </ButtonsGroup.Button>
            <ButtonsGroup.Button
              active={filterValue === 'success'}
              onClick={() => toggleFilterValue('success')}
            >
              Завершено
            </ButtonsGroup.Button>
            <ButtonsGroup.Button
              active={filterValue === 'error'}
              onClick={() => toggleFilterValue('error')}
            >
              Ошибка
            </ButtonsGroup.Button>
          </ButtonsGroup>
        </div>
        <div className={styles.Orders__list}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((v) => (
              <Order data={v} key={`order_${v.id}`} />
            ))
          ) : (
            <div className={styles.Orders__empty}>
              {isLoading ? 'Загрузка...' : 'Нет заказов'}
            </div>
          )}
        </div>
        
        <div 
          ref={loaderRef} 
          className={styles.Orders__loader}
          style={{ 
            textAlign: 'center', 
            padding: '1rem', 
            opacity: isLoading && invoices.length > 0 ? 1 : 0 
          }}
        >
          {isLoading && invoices.length > 0 && <Loader />}
        </div>
      </Panel>
    </PrivateLayout>
  );
};