import { type_nha_dat } from '../constants/Type_NhaDat';

function getTypeNhaDatLabel(type: string) {
  const current = type_nha_dat.find((item) => item.id === type);

  return current ? current.label : '';
}

export default getTypeNhaDatLabel;
