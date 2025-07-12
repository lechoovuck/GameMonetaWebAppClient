import { RefObject } from 'react';

// Типизация для использования хуков и ссылок
type UseScrollToRefResult<T> = (ref: RefObject<T>) => void;

export function useScrollToRef<
  T extends HTMLElement,
>(): UseScrollToRefResult<T> {
  const scrollToRef = (ref: RefObject<T>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return scrollToRef;
}
