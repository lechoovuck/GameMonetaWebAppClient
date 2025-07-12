import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClickAway } from 'react-use';
import cn from 'classnames';
import { IconSearch, IconX } from '@tabler/icons-react';
import { Button, Input, Loader } from '@/shared/ui';
import { Item } from './ui';
import styles from './styles.module.scss';
import { useProductsAll, useAliasesAll } from '@/shared/api';

interface SearchProps {}

export const Search: React.FC<SearchProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [isShow, setIsShow] = useState(false);

  const toggleIsShow = () => {
    setValue('');
    setIsShow(os => !os);
  };

  useEffect(() => {
    if (inputRef.current && isShow) {
      inputRef.current.focus();
    }
  }, [isShow]);

  const [isFocus, setIsFocus] = useState(false);
  const [isForceHideResults, setIsForceHideResults] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const hideTimeoutRef = useRef<number | undefined>(undefined);

  const { data, isLoading } = useProductsAll({
    enabled: isShow,
  });
  const products = data?.products;

  const { data: aliasArray} = useAliasesAll()
  const aliases = aliasArray?.aliases

  const results = useMemo(() => {
    if (value.length < 2 || !products) return [];
    // console.log('value input', value)

    const regexp = new RegExp(value, 'gi');
    const results = aliases?.filter(({ alias }) => alias.search(regexp) !== -1).map(alias => alias.product);

    return results?.slice(0, 6) ?? [];
  }, [value, data]);
  // console.log(results)

  useEffect(() => {
    setHighlightedIndex(null);
  }, [results]);

  const isShowResults = () => {
    if (results.length !== 0) return true;
    return isFocus;
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setValue('');
    setIsShow(false);
  }, [location]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(prev =>
          prev === null || prev === results.length - 1 ? 0 : prev + 1
        );
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHighlightedIndex(prev =>
          prev === null || prev === 0 ? results.length - 1 : prev - 1
        );
        e.preventDefault();
        break;
      case 'Enter':
        if (highlightedIndex !== null) {
          navigate('/product/' + results[highlightedIndex].id);
        } else {
          if (results.length === 1) {
            navigate('/product/' + results[0].id);
          }
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isFocus) {
      hideTimeoutRef.current = window.setTimeout(() => {
        setIsForceHideResults(true);
      }, 200);
    } else {
      setIsForceHideResults(false);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isFocus]);

  const componentRef = useRef<HTMLDivElement>(null);
  useClickAway(componentRef, () => {
    setIsShow(false);
  });

  return (
    <div
      className={cn(
        styles.Search,
        isShow ? styles.Search_show : styles.Search_hide
      )}
      ref={componentRef}
    >
      <div className={styles.Search__body}>
        <Input
          className={styles.Search__input}
          placeholder="Поиск"
          value={value}
          onChange={e => setValue(e.target.value)}
          icon={<IconSearch />}
          inputProps={{
            onFocus: () => setIsFocus(true),
            onBlur: () => setIsFocus(false),
            onKeyDown: handleKeyDown,
            ref: inputRef,
          }}
        />

        {!isForceHideResults && isShowResults() && (
          <div
            className={styles.Search__results}
            onMouseEnter={() => setHighlightedIndex(null)}
          >
            {!results.length &&
              (value.length < 2 ? (
                <div className={styles.Search__noResults}>
                  <b>✍</b>
                  Начните вводить текст
                </div>
              ) : (
                <div className={styles.Search__noResults}>
                  {isLoading && <Loader />}
                  {!isLoading && !results.length && (
                    <>
                      <b>😢</b>
                      Ничего не найдено
                    </>
                  )}
                </div>
              ))}

            {results.map((v, index) => (
              <Item
                data={v}
                isFocus={index === highlightedIndex}
                key={v.id}
              />
            ))}
          </div>
        )}
      </div>

      <Button
        className={styles.Search__button}
        color="secondary"
        isOnlyIcon
        onClick={toggleIsShow}
      >
        {isShow ? <IconX /> : <IconSearch />}
      </Button>
    </div>
  );
};
