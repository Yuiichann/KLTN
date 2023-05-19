import { INhaDat } from './nhaDat.types';

export interface IFormResetPassword {
  password: string;
  token: string;
  userId: string;
}

export interface IFormChangePassword {
  password: string;
  new_password: string;
  confirm_password: string;
}

export interface IFormReportProperty {
  fullName: string;
  email: string;
  phone_number: string;
  title: string;
  content: string;
  post_slug: string;
}

export interface IFormUpdateAccountInfo {
  displayName: string;
  address: string;
  gender: 'male' | 'female';
  phone_number: string;
}

// params query public nhà đất
export interface INhaDatListParams {
  demand: 'buy' | 'lease';
  search?: string;
  range_price?: string;
  range_area?: string;
  sort?: string;
  provCode?: number;
  distCode?: number;
  wardCode?: number;
  page?: number;
  type_nhadat?: string;
  num_toilets?: string;
  home_direction?: string;
}

// params query danh sách nhà đất của user
export interface INhadatListOfUserParams {
  status?: 'pending' | 'approved' | 'refuse';
  sort?: string;
  demand?: 'lease' | 'buy';
  page?: number;
  search?: string;
}

// params search broker
export interface IBrokerListParams {
  search?: string;
  page?: number;
  fields?: string;
  provCode?: number;
  distCode?: number;
}

// params get list exchange
export interface IListExchange {
  party: 'buy' | 'sell';
  status?: 'pending' | 'success' | 'cancel';
  page?: number;
  sort?: string;
  elapsed?: string;
}

// như cái tên
export interface ISignUpData {
  username: string;
  password: string;
  email: string;
  displayName: string;
  gender: 'male' | 'female';
  address: string;
  phone_number: string;
}

// như cái tên
export interface ISignInData {
  username: string;
  password: string;
}

// response của api nhà đất
export interface INhaDatListResponse {
  totalItems: number;
  totalPage: number;
  data: INhaDat[];
}
