import { IDistrict, INhadatOfPublicUser, IProvince } from './nhaDat.types';
import { IPublicUser } from './user.types';

export interface ICreateBroker {
  introduce: string;
  fields: {
    field_code: string;
    province: number;
    district: number;
  }[];
}

export interface IBroker {
  id: string;
  broker_name: string;
  introduce: string;
  createdAt: Date | string;
  user: IPublicUser;
  fields: {
    field_name: string;
    field_code: string;
    location: {
      province: {
        code: number;
        name: string;
      };
      district: {
        code: number;
        name: string;
      };
    };
  }[];
}

export interface IBrokerWithProperty extends IBroker {
  properties: INhadatOfPublicUser[];
}

export interface IResponseBroker {
  totalPage: number;
  totalItems: number;
  data: IBroker[];
}

export interface IFieldBroker {
  field: {
    label: string;
    value: string;
  };
  province: IProvince;
  district: IDistrict;
}

export interface ITopBrokers {
  id: string;
  count: number;
  displayName: string;
  avatar: string;
  address: string;
  phone_number: string;
}
