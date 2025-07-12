// SERVER INTERFACES
export interface IGiftsAllRes {
  gifts: Product[];
  success: boolean;
}

export interface IGiftsByIdRes {
  data: ProductFull;
  success: boolean;
  currencies: Currencies;
}
