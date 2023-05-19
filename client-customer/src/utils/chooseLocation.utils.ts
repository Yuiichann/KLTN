// các hàm chọn ra vị trí tỉnh, quận, huyện, phường xã khi
// sử dụng đối với form update sản phẩm
import Provinces from '../constants/provinces.json';

function chooseProvince(code?: number) {
  if (!code) {
    return { code: -1, name: '--Chọn Tỉnh/Thành phố--', districts: [] };
  }

  const current = Provinces.find((item) => item.code === code);

  return current
    ? { code: current.code, name: current.name, districts: current.districts }
    : {
        code: -1,
        name: '--Chọn Tỉnh/Thành phố--',
        districts: [],
      };
}

function chooseDistrict(provCode?: number, distCode?: number) {
  if (!distCode) {
    return {
      code: -1,
      name: '--Chọn Quận/Huyện--',
      wards: [],
    };
  }

  const province = chooseProvince(provCode);

  if (province.code === -1) {
    return {
      code: -1,
      name: '--Chọn Quận/Huyện--',
      wards: [],
    };
  }

  const currentDistrict = province.districts.find(
    (item) => item.code === distCode
  );

  return currentDistrict
    ? {
        code: currentDistrict.code,
        name: currentDistrict.name,
        wards: currentDistrict.wards,
      }
    : { code: -1, name: '--Chọn Quận/Huyện--', wards: [] };
}

function chooseWard(provCode?: number, distCode?: number, wardCode?: number) {
  if (!wardCode) {
    return {
      code: -1,
      name: '--Chọn Phường/Xã--',
    };
  }

  const district = chooseDistrict(provCode, distCode);

  if (district.code === -1) {
    return {
      code: -1,
      name: '--Chọn Phường/Xã--',
    };
  }

  const currentWard = district.wards.find((item) => item.code === wardCode);

  return currentWard
    ? {
        code: currentWard.code,
        name: currentWard.name,
      }
    : {
        code: -1,
        name: '--Chọn Phường/Xã--',
      };
}

export { chooseProvince, chooseDistrict, chooseWard };
