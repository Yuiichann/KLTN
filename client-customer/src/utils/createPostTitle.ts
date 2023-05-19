import { type_nha_dat } from '../constants/Type_NhaDat';
import formatPriceTV from './formatPriceTV';

function createPostTitle(
  pathName: string,
  type?: string,
  rangePrice?: string,
  rangeArea?: string
) {
  const demandType = pathName.includes('/ban') ? 'Bán' : 'Cho thuê';

  let typeNhaDat = '';
  let minPrice = '';
  let maxPrice = '';
  let minArea = '';
  let maxArea = '';

  if (type) {
    const currType = type_nha_dat.find(
      (item) => item.id.replaceAll('_', '-') === type
    );

    typeNhaDat = currType ? currType.label : '';
  }

  if (rangePrice) {
    const price = rangePrice.split(',');

    minPrice = formatPriceTV(parseInt(price[0])) || '';
    maxPrice = formatPriceTV(parseInt(price[1])) || '';
  }

  if (rangeArea) {
    const area = rangeArea.split(',');

    minArea = area[0];
    maxArea = area[1];
  }

  return `${demandType} ${typeNhaDat ? typeNhaDat : 'bất động sản'}${
    rangePrice ? `, giá từ ${minPrice} đến ${maxPrice}` : ''
  }${rangeArea ? `, diện tích từ ${minArea}-${maxArea} m2` : ''}`;
}

export default createPostTitle;
