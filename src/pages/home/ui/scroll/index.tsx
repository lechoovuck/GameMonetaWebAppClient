import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { Icon } from '@/shared/ui';

interface Props {
  products: Product[];
}

export const InfiniteScrollBlock: React.FC<Props> = ({ products }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState([products[0]]);
  const [visibleCount, setVisibleCount] = useState(0);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [itemsPerRow, setItemsPerRow] = useState(1);
  const initialRows = 1;

  const navigate = useNavigate();

  const calculateItemsPerRow = () => {
    if (gridRef.current) {
      const gridWidth = gridRef.current.clientWidth;
      const itemWidth = 100;
      return Math.floor(gridWidth / itemWidth) || 1;
    }
    return 1;
  };

  const loadMoreProducts = (newItemsPerRow: number) => {
    const nextBatch = products.slice(visibleCount, visibleCount + newItemsPerRow);
    setLoadedProducts((prev) => [...prev, ...nextBatch]);
    setVisibleCount((prev) => prev + newItemsPerRow);
  };

  useEffect(() => {
    const updateGrid = () => {
      const newItemsPerRow = calculateItemsPerRow();
      setItemsPerRow(newItemsPerRow);

      const initialCount = newItemsPerRow * initialRows;
      setLoadedProducts(products.slice(0, initialCount));
      setVisibleCount(initialCount);
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  const handleExpand = () => {
    loadMoreProducts(itemsPerRow);
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    const initialCount = itemsPerRow * initialRows;
    setLoadedProducts(products.slice(0, initialCount));
    setVisibleCount(initialCount);
  };

  return (
    <div className={styles.InfiniteScroll}>
      <div ref={gridRef} className={`${styles.InfiniteScroll__Grid} ${isExpanded ? styles.expanded : ''}`}>
        {loadedProducts.map((product) => (
          <div
            key={product.id}
            className={styles.InfiniteScroll__GridItem}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.image_url && <img src={product.preview_image_url || product.image_url || '/images/products/preview/in-development-lot.webp'} alt={product.name} className={styles.GridItem__Image} />}
            <p className={styles.GridItem__Name}>{product.name}</p>
          </div>
        ))}
      </div>
      {/* {(visibleCount < products.length || !isExpanded) && <div className={styles.InfiniteScroll__FadeEffect}></div>} */}
      <div className={styles.InfiniteScroll__ExpandControl}>
        {isExpanded
          ? <div className={`${styles.ExpandControl__ExpandArrow} ${styles.ExpandArrow__Up}`} onClick={handleCollapse}>
            <Icon name="arrow" />
          </div>
          :  (
            <div className={styles.ExpandControl__ExpandArrow} onClick={handleExpand}>
              <Icon name="arrow" />
            </div>
          )
        }
      </div>
    </div>
  );
};
