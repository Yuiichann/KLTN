import { INhaDat } from './nhaDat.types';

export interface IUser {
  id: string;
  username: string;
  displayName: string;
  email: string;
  phone_number: string;
  gender: 'male' | 'female';
  address: string;
  avatar: string;
  isBroker: boolean;
  createdAt: Date;
  locked: {
    status: boolean;
    reason: string;
    lock_by?: {
      id: string;
      username: string;
      displayName: string;
    };
  };
}

export interface IUserSlice {
  user: IUser | null;
}

export interface IPublicUser {
  id: string;
  displayName: string;
  phone_number: string;
  isBroker: boolean;
  address: string;
  email: string;
}

export interface IPublicUserWithProperty extends IPublicUser {
  nha_dat: {
    id: string;
    items: INhaDat[];
    title: string;
  }[];
}

export interface IUsersResposne {
  totalItem: number;
  totalPage: number;
  data: IUser[];
}

export interface IUserDetailResponse {
  user: IUser;
  properties: {
    id: string;
    label: string;
    items: INhaDat[];
  }[];
}
