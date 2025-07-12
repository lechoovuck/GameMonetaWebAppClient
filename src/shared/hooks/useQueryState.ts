import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Типизация возвращаемых значений хука
type UseQueryStateResult<T extends string = string> = [
  T,
  (value: T) => void,
  boolean,
];

// Хук для работы с параметрами строки запроса
export function useQueryState<T extends string = string>(
  param: string,
  default_value: T
): UseQueryStateResult<T> {
  const [searchParams, setSearchParams] = useSearchParams();

  const getQueryParam = (): T => {
    return (searchParams.get(param) || default_value) as T;
  };

  const [state, setState] = useState<T>(getQueryParam);
  const [hasParam, setHasParam] = useState<boolean>(searchParams.has(param));

  useEffect(() => {
    setState(getQueryParam());
    setHasParam(searchParams.has(param));
  }, [searchParams]);

  const setQueryParam = (value: T): void => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(param, value);
    } else {
      newSearchParams.delete(param);
    }
    setSearchParams(newSearchParams);
    setState(value);
  };

  return [state, setQueryParam, hasParam];
}
