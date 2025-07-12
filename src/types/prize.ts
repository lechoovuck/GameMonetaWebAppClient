export type PrizeType = 'coupon' | 'gift';

export type Prize = {
  id: number;
  title: string;
  type: PrizeType;
  //
  product_id: number;
};

// SERVER INTERFACES
export interface IPrizesAllRes {
  prizes: Prize[];
}

export interface IPrizesUseReq {
  id: Prize['id'];
}
export interface IPrizesUseRes {
  success: boolean;
}
