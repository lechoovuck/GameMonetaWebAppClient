import { createQuery } from 'react-query-kit';
import { fetchInvoiceNew, fetchInvoiceGet, fetchInvoiceByUserId } from '../fetchers/invoice';
import {
  IInvoiceNewReq,
  IInvoiceGetReq,
  IInvoiceReq,
} from '@/types/invoice';

export const useInvoiceNew = createQuery({
  queryKey: ['invoiceNew'],
  fetcher: (variables: IInvoiceNewReq) => fetchInvoiceNew(variables),
  staleTime: Infinity,
});


export const useInvoiceGet = createQuery({
  queryKey: ['invoiceGet'],
  fetcher: (variables: IInvoiceGetReq) => fetchInvoiceGet(variables),
  staleTime: Infinity,
});


export const useInvoiceByUserId = createQuery({
  queryKey: ['invoiceAll'],
  fetcher: (variables:  IInvoiceReq) => fetchInvoiceByUserId(variables),
  staleTime: Infinity,
});
