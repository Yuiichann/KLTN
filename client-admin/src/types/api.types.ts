import { INhaDat } from './nhaDat.types';

export interface IFormResetPassword {
  password: string;
  token: string;
  userId: string;
}

export interface IPropertiesParams {
  status?: 'pending' | 'approved' | 'refuse';
  search?: string;
  demand: 'buy' | 'lease';
  page?: number;
  sort?: string;
  elapsed?: string;
}

export interface IPayloadUpdateStatus {
  status: 'approved' | 'refuse';
  reason_refuse: string;
}

export interface ISignInData {
  username: string;
  password: string;
}

export interface INhaDatListResponse {
  totalItems: number;
  totalPage: number;
  data: INhaDat[];
}
export interface IDashboardResponse {
  users?: {
    totalUsers: number;
    totalBrokers: number;
  };
  report?: {
    count: number;
    status: 'pending' | 'confirm' | 'refuse';
    label: string;
  }[];

  exchange: {
    total?: {
      count: number;
      status: 'pending' | 'cancel' | 'success';
      title: string;
    }[];

    this_month?: {
      count: number;
      status: 'pending' | 'cancel' | 'success';
      title: string;
    }[];

    this_week?: {
      count: number;
      status: 'pending' | 'cancel' | 'success';
      title: string;
    }[];
  };

  property: {
    total?: {
      count: number;
      status: 'pending' | 'approved' | 'refuse';
      title: string;
    }[];
    this_month?: {
      count: number;
      status: 'pending' | 'approved' | 'refuse';
      title: string;
    }[];
    this_week?: {
      count: number;
      status: 'pending' | 'approved' | 'refuse';
      title: string;
    }[];
  };
}

export interface IRequestLockUser {
  reason: string;
}
