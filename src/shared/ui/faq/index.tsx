import { useState } from 'react';
import cn from 'classnames';
import AnimateHeight from 'react-animate-height';
import { Icon } from '../icon';
import styles from './styles.module.scss';

interface FaqProps {
  children: React.ReactNode;
  className?: string;
}

type FaqType = React.FC<FaqProps> & { Item: typeof Item };

export const Faq: FaqType = ({ children, className }) => {
  return <div className={cn(styles.Faq, className)}>{children}</div>;
};

interface ItemProps {
  question: string;
  children: React.ReactNode;
}

const Item: React.FC<ItemProps> = ({ question, children }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggle = () => setShowAnswer(!showAnswer);

  return (
    <div className={cn(styles.Item, showAnswer && styles.Item_active)}>
      <div className={styles.Item__question} onClick={toggle}>
        <b>{question}</b>
        <Icon name="error" className={styles.Item__ChevronIcon} />
      </div>

      <AnimateHeight duration={500} height={!showAnswer ? 0 : 'auto'}>
        <div className={styles.Item__answer}>{children}</div>
      </AnimateHeight>
    </div>
  );
};

Faq.Item = Item;
