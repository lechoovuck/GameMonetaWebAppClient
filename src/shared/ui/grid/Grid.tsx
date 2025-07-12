import styles from './Grid.module.scss';

interface GridProps {
  children?: React.ReactNode;
  cols: number;
  colsMd?: number;
  colsSm?: number;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols,
  colsMd,
  colsSm,
}) => {
  const listCols = {
    '--cols-lg': cols,
    '--cols-md': colsMd || cols,
    '--cols-sm': colsSm || colsMd || cols,
  } as React.CSSProperties;

  return (
    <div className={styles.Grid} style={listCols}>
      {children}
    </div>
  );
};
