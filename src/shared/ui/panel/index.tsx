import cn from 'classnames';
import styles from './styles.module.scss';

interface PanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const Panel = ({ children, className }: PanelProps) => {
  return <div className={cn(styles.Panel, className)}>{children}</div>;
};

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <h3 className={cn(styles.Panel__title, className)}>{children}</h3>;
};

Panel.Title = Title;
