const priceOptions = [
  {
    value: '0,1000000',
    label: 'Dưới 1 triệu',
  },
  {
    value: '1000000,3000000',
    label: '1 - 3 triệu',
  },
  {
    value: '3000000,5000000',
    label: '3 - 5 triệu',
  },
  {
    value: '5000000,10000000',
    label: '5 - 10 triệu',
  },

  {
    value: '10000000,20000000',
    label: '10 - 20 triệu',
  },

  {
    value: '20000000,100000000',
    label: '20 - 100 triệu',
  },
  {
    value: '100000000,500000000',
    label: '100 - 500 triệu',
  },
  {
    value: '500000000,1000000000',
    label: '500 triệu - 1 tỉ',
  },
  {
    value: '1000000000,2000000000',
    label: '1 - 2 tỉ',
  },
  {
    value: '2000000000,3000000000',
    label: '2 - 3 tỉ',
  },

  {
    value: '3000000000,5000000000',
    label: '3 - 5 tỉ',
  },

  {
    value: '5000000000,7000000000',
    label: '5 - 7 tỉ',
  },

  {
    value: '7000000000,10000000000',
    label: '7 - 10 tỉ',
  },

  {
    value: '10000000000,20000000000',
    label: '10 - 20 tỉ',
  },
  {
    value: '20000000000,30000000000',
    label: '20 - 30 tỉ',
  },
  {
    value: '30000000000,40000000000',
    label: '30 - 40 tỉ',
  },
  {
    value: '40000000000,50000000000',
    label: '40 - 50 tỉ',
  },
  {
    value: '50000000000,99000000000',
    label: 'Trên 50 tỉ',
  },
];

const priceLeaseOptions = [
  {
    value: '0,1000000',
    label: 'Dưới 1 triệu',
  },
  {
    value: '1000000,3000000',
    label: '1 triệu - 3 triệu',
  },
  {
    value: '3000000,5000000',
    label: '3 triệu - 5 triệu',
  },
  {
    value: '5000000,10000000',
    label: '5 triệu - 10 triệu',
  },

  {
    value: '10000000,20000000',
    label: '10 - 20 triệu',
  },

  {
    value: '20000000,900000000',
    label: 'Trên 20 triệu',
  },
];

const areaOptions = [
  {
    label: 'Duới 30',
    value: '0,30',
  },

  {
    label: '30 - 50',
    value: '30,50',
  },

  {
    label: '50 - 80',
    value: '50,80',
  },

  {
    label: '80 - 100',
    value: '80,100',
  },

  {
    label: '100 - 150',
    value: '100,150',
  },

  {
    label: '150 - 200',
    value: '150,200',
  },

  {
    label: '200 - 300',
    value: '200,300',
  },

  {
    label: '300 - 500',
    value: '300,500',
  },

  {
    label: 'Trên 500',
    value: '500,9999',
  },
];

const toiletOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const directionOptions = [
  {
    label: 'Đông',
    value: 'dong',
  },
  {
    label: 'Tây',
    value: 'tay',
  },
  {
    label: 'Nam',
    value: 'nam',
  },
  {
    label: 'Bắc',
    value: 'bac',
  },
  {
    label: 'Đông-Bắc',
    value: 'dong-bac',
  },
  {
    label: 'Tây-Bắc',
    value: 'tay-bac',
  },
  {
    label: 'Đông-Nam',
    value: 'dong-nam',
  },
  {
    label: 'Tây-Nam',
    value: 'tay-nam',
  },
];

const sortOptions = [
  {
    label: 'Tin mới nhất',
    value: 'createdAt,desc',
  },
  {
    label: 'Tin cũ nhất',
    value: 'createdAt,asc',
  },
  {
    label: 'Giá từ thấp đến cao',
    value: 'price,asc',
  },
  {
    label: 'Giá từ cao đến thấp ',
    value: 'price,desc',
  },
  {
    label: 'Diện tích từ bé tới lớn',
    value: 'area,asc',
  },
  {
    label: 'Diện tích từ lớn tới bé',
    value: 'area,desc',
  },
];

const exchangeSortOptions = [
  {
    label: 'Mới nhất',
    value: 'createdAt,desc',
  },
  {
    label: 'Giá từ thấp đến cao',
    value: 'price,asc',
  },
  {
    label: 'Giá từ cao đến thấp ',
    value: 'price,desc',
  },
];

const exchangeElapsedSortOptions = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Trong tuần',
    value: 'week',
  },
  {
    label: 'Trong tháng',
    value: 'month',
  },
];

export {
  priceOptions,
  priceLeaseOptions,
  areaOptions,
  toiletOptions,
  directionOptions,
  sortOptions,
  exchangeSortOptions,
  exchangeElapsedSortOptions,
};
