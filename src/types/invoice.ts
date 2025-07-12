// SERVER INTERFACES
import { FullProfileInfo } from '@/types/profile';

// инвойс
export interface IInvoiceNewReq {
  product_id: number;
  payment_method: PayMethod;
  delivery_email: string;
  order_info: any;
  amount: number;
}

export interface Invoice {
  product: Product;
  uuid: string,
  amount: number,
  bonus: number,
  status: PayStatus;
  id: number;
  payment_method: PayMethod;
  region: PayRegion;
  created_at: string;
  order_info?: {[key: string]: any};
  user?: FullProfileInfo;
  delivery_email?: string,
  login?: string;
}

export interface IInvoiceGetReq {
  uuid: string;
}

export interface PaymentInvoice {
  id: number;
  payment_datetime: Date;
  gamemoneta_invoice_uuid: string;
  service_payment_id: string;
  code_url: string;
  status: PayStatus;
  amount: number;
}

export interface IInvoiceGetResp {
  data: Invoice;
  payment_invoice: PaymentInvoice;
  success: boolean;
}


export interface IInvoiceReq {
  cursor?: number | null;
  limit: number;
  status?: PayStatus[] | null;
}

export interface IInvoicesAllResp {
  data: Invoice[];
  success: boolean
}
