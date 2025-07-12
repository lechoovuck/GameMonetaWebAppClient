const __getHtmlTag = () => document.querySelector('html')!;
const __getBodyTag = () => document.querySelector('body')!;

let isScrollBlocked = false;
let originalHtmlOverflowY: string;
let originalBodyOverflow: string;

const preventDefault = (e: any) => e.preventDefault();

export const scrollBlock = () => {
  if (isScrollBlocked) return;

  const htmlTag = __getHtmlTag();
  const bodyTag = __getBodyTag();

  originalHtmlOverflowY = htmlTag.style.overflowY;
  originalBodyOverflow = bodyTag.style.overflow;

  htmlTag.style.overflowY = 'hidden';
  bodyTag.style.overflow = 'hidden';

  window.addEventListener('touchmove', preventDefault, { passive: false });

  isScrollBlocked = true;
};

export const scrollUnblock = () => {
  if (!isScrollBlocked) return;

  const htmlTag = __getHtmlTag();
  const bodyTag = __getBodyTag();

  htmlTag.style.overflowY = originalHtmlOverflowY;
  bodyTag.style.overflow = originalBodyOverflow;

  window.removeEventListener('touchmove', preventDefault);

  isScrollBlocked = false;
};
