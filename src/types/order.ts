export type OrderStatus = 'wait' | 'success' | 'error';

export type Order = {
  order_id: string;
  status: OrderStatus;
  date: string;
  price: number;
  codes: string[] | null;
  //
  product_id: number;
  product_text: string;
};

// SERVER INTERFACES
export interface IOrdersGetReq {
  limit: number;
}
export interface IOrdersGetRes {
  orders: Order[];
  count: number;
}
