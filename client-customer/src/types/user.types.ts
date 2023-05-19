import { INhadatOfPublicUser } from './nhaDat.types';

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
  locked: {
    status: boolean;
    reason: string;
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
  avatar: string;
}

export interface IPublicUserWithProperty extends IPublicUser {
  nha_dat: {
    id: string;
    items: INhadatOfPublicUser[];
    title: string;
  }[];
}
