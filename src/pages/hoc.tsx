import { BrowserRouter } from 'react-router-dom';
import React from 'react';

/**
 * @hoc Инициализация роутера
 */
export const withRouter = (component: () => React.ReactNode) => () => {
  return <BrowserRouter>{component()}</BrowserRouter>;
};
