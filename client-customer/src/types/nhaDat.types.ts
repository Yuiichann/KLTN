export interface ICreateNhatDat {
  contact_name: string;
  contact_phone: string;
  contact_address: string;
  contact_email: string;
  title: string;
  demand: 'buy' | 'lease';
  type_nhadat: string;
  price: number;
  price_unit: 'vnd' | 'per_area' | 'custom';
  area: number;
  description: string;
  province: number;
  district: number;
  ward: number;
  street: string;
  num_floors?: number;
  num_bedroom?: number;
  home_direction:
    | 'none'
    | 'dong'
    | 'tay'
    | 'nam'
    | 'bac'
    | 'dong-bac'
    | 'tay-nam'
    | 'tay-bac'
    | 'đong-nam';
  utillities: 'full' | 'basic' | 'none';
  legal: 'so_do' | 'hop_dong' | 'dang_cho_so';
}

export interface ITypeNhaDat {
  id: string;
  label: string;
}

export interface ILocationNhaDat {
  province: number;
  district: number;
  ward: number;
  street: string;
}

export interface IProvince {
  code: number;
  name: string;
  districts: IDistrict[];
}

export interface IDistrict {
  code: number;
  name: string;
  wards: IWard[];
}

export interface IWard {
  code: number;
  name: string;
}

export interface ISort {
  value: string;
  label: string;
}

export interface IPhapLy {
  value: 'so_do' | 'hop_dong' | 'dang_cho_so' | 'other';
  label: string;
}

export interface IUtillitiesOpts {
  value: 'full' | 'basic' | 'none';
  label: string;
}

export interface IOptionsNhaDat {
  num_toilets: number;
  num_bedrooms: number;
  num_floors: number;
  utillities: string;
  home_direction: string;
  legal: string;
}

// main

export interface INhaDat {
  _id: string;
  id: string;
  area: number;
  collections: string[];
  contact: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  description: string;
  home_direction:
    | 'none'
    | 'dong'
    | 'tay'
    | 'nam'
    | 'bac'
    | 'dong-bac'
    | 'tay-nam'
    | 'tay-bac'
    | 'đong-nam';
  utillities: 'full' | 'basic' | 'none';
  legal: 'so_do' | 'hop_dong' | 'dang_cho_so' | 'other';
  location: {
    province: {
      code: number;
      name: string;
    };
    district: {
      code: number;
      name: string;
    };
    ward: {
      code: number;
      name: string;
    };
    street: string;
  };
  num_bedrooms: number;
  num_toilets: number;
  num_floors: number;
  price: number;
  price_unit: 'vnd' | 'per_area' | 'custom';
  reason_refuse: string;
  slug: string;
  title: string;
  demand: 'buy' | 'lease';
  status: 'approved' | 'pending' | 'refuse' | 'deleted';
  type_nhadat: string;
  user_id: string;
  createdAt: string;
}

export interface IFilterOptions {
  range_price: string;
  range_area: string;
  sort: string;
}

export interface INhadatOfPublicUser {
  id: string;
  price: number;
  price_unit: 'custom' | 'vnd' | 'per_area';
  slug: string;
  title: string;
  area: number;
  collections: string[];
  location: INhaDat['location'];
  createdAt: string | Date;
}
