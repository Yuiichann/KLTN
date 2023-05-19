export interface IMenuItems {
  label: string;
  path: string;
  children?: IMenuItems[];
}

const MenuItems: IMenuItems[] = [
  {
    label: 'Nhà đất bán',
    path: '/ban',
    children: [
      {
        path: '/ban/can-ho-chung-cu',
        label: 'Căn hộ chung cư',
      },
      {
        path: '/ban/nha-rieng',
        label: 'Nhà riêng',
      },
      {
        path: '/ban/nha-biet-thu',
        label: 'Nhà biệt thự',
      },
      {
        path: '/ban/nha-mat-pho',
        label: 'Nhà mặt phố',
      },
      {
        path: '/ban/shophouse',
        label: 'Shophouse, nhà phố thương mại',
      },
      {
        path: '/ban/dat-nen-du-an',
        label: 'Đất nền dự án',
      },
      {
        path: '/ban/dat',
        label: 'Đất',
      },
      {
        path: '/ban/trang-trai',
        label: 'Trang trại',
      },
      {
        path: '/ban/khu-nghi-duong',
        label: 'Khu nghỉ dưỡng',
      },
      {
        path: '/ban/condohel',
        label: 'Condohel',
      },
      {
        path: '/ban/kho-nha-xuong',
        label: 'Kho, nhà xưởng',
      },
      {
        path: '/ban/bat-dong-san-khac',
        label: 'Bất động sản khác',
      },
    ],
  },
  {
    label: 'Nhà đất thuê',
    path: '/cho-thue',
    children: [
      {
        path: '/cho-thue/can-ho-chung-cu',
        label: 'Căn hộ chung cư',
      },
      {
        path: '/cho-thue/nha-rieng',
        label: 'Nhà riêng',
      },
      {
        path: '/cho-thue/nha-biet-thu',
        label: 'Nhà biệt thự',
      },
      {
        path: '/cho-thue/nha-mat-pho',
        label: 'Nhà mặt phố',
      },
      {
        path: '/cho-thue/shophouse',
        label: 'Shophouse, nhà phố thương mại',
      },
      {
        path: '/cho-thue/nha-tro-phong-tro',
        label: 'Nhà trọ, phòng trọ',
      },
      {
        path: '/cho-thue/van-phong',
        label: 'Văn phòng',
      },
      {
        path: '/cho-thue/cua-hang',
        label: 'Cửa hàng',
      },
      {
        path: '/cho-thue/bat-dong-san-khac',
        label: 'Bất động sản khác',
      },
    ],
  },
  {
    label: 'Môi giới',
    path: '/danh-sach-moi-gioi',
  },
];

export default MenuItems;
