import { INhaDat } from './nhaDat.types';
import { IUser } from './user.types';

export interface IExchange {
  buyer?: IUser;
  seller?: IUser;
  property?: INhaDat;
  id: string;
  price: number;
  reason_cancel: string;
  status: 'pending' | 'cancel_by_seller' | 'cancel_by_buyer' | 'success';
  createdAt: Date;
  updatedAt: Date;
  contract?: {
    contract_type: 'buy' | 'lease';
    contract_url: string;
    signed_date: Date | string;
  };
}

export interface IExchangeResponse {
  totalItems: number;
  totalPage: number;
  data: IExchange[];
}
