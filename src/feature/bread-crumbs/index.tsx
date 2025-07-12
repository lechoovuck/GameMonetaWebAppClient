import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import { Icon } from '@/shared/ui';
import styles from './styles.module.scss';
import React from 'react';

interface BreadcrumbItem {
  text: string;
  url?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsWithText {
  text: string;
  items?: never;
}

interface BreadcrumbsWithItems {
  items: BreadcrumbItem[];
  text?: never;
}

type BreadCrumbsProps = BreadcrumbsWithText | BreadcrumbsWithItems;

/**
 * Компонент для отображения хлебных крошек.
 * Позволяет передать либо текст, либо массив пунктов, но не оба одновременно.
 *
 * @component
 * @param {BreadCrumbsProps} props - Свойства компонента.
 *
 * @example Пример использования с текстом:
 * <BreadCrumbs text="Категория" />
 *
 * @example Пример использования с массивом элементов:
 * <BreadCrumbs
 *   items={[
 *     { text: 'Категория', url: '/category' },
 *     { text: 'Товар' },
 *   ]}
 * />
 */
export const BreadCrumbs: React.FC<BreadCrumbsProps> = (props: BreadCrumbsProps) => {
  return (
    <div className={styles.BreadCrumbs}>
      <Item text="Главная" url={AppRoute.Root} icon={<Icon name="rect" />} />
      <Separator />
      {'items' in props && props.items
        ? props.items.map((item, index) => (
          <React.Fragment key={index}>
            <Item text={item.text} url={item.url} icon={item.icon} />
            {index < props.items.length - 1 && <Separator />}
          </React.Fragment>
        ))
        : 'text' in props && <Item text={props.text} />}
    </div>
  );
};


// ======================

interface ItemProps {
  text: string;
  url?: string;
  icon?: React.ReactNode;
}

/**
 * Компонент для отображения одного элемента хлебных крошек.
 * @param {ItemProps} props - Свойства элемента.
 *
 */
const Item: React.FC<ItemProps> = ({ text, url, icon }: ItemProps) => {
  const isLink = url !== undefined;

  if (isLink)
    return (
      <Link className={styles.BreadCrumbs__item} to={url}>
        {icon}
        <span className={styles.BreadCrumbs__text}>{text}</span>
      </Link>
    );

  return (
    <span className={styles.BreadCrumbs__item}>
      {icon}
      <span className={styles.BreadCrumbs__text}>{text}</span>
    </span>
  );
};

// ======================

const Separator: React.FC = () => {
  return <Icon className={styles.BreadCrumbs__separator} name="arrow" />;
};
