import { ApiRoute } from '@/const';
import { api } from '../api';
import {
  IInvoiceNewReq,
  IInvoiceGetReq,
  IInvoiceGetResp,
  IInvoicesAllResp,
  IInvoiceReq
} from '@/types/invoice';

// новый инвойс
export const fetchInvoiceNew = async (body: IInvoiceNewReq) => {
  const { data } = await api.post<{ redirect_url: string }>(ApiRoute.InvoiceCreate, body);
  return data;
};

// получить инвойс
export const fetchInvoiceGet = async (body: IInvoiceGetReq) => {
  const { data } = await api.get<IInvoiceGetResp>(ApiRoute.InvoiceGet + '/' + body.uuid);
  return data;
};

export const fetchInvoiceByUserId = async (body: IInvoiceReq) => {
  const { cursor, limit, status } = body
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor.toString());
  params.append('limit', limit.toString());
  if (status) params.append('status', status.toString());

  const { data } = await api.get<IInvoicesAllResp>(`${ApiRoute.InvoiceAll}?${params}`);
  return data;
};