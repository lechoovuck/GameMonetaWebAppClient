// SERVER INTERFACES
export interface IProductsAllRes {
  products: Product[];
  success: boolean;
}

export interface IProductsByIdRes {
  data: ProductFull;
  success: boolean;
  currencies: Currencies;
}
