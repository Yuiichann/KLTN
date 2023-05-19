import React, { memo, useEffect, useState } from 'react';
import DistrictsCombobox from '../custom/combobox/DistrictsCombobox';
import ProvincesCombobox from '../custom/combobox/ProvincesCombobox';
import WardCombobox from '../custom/combobox/WardCombobox';
import {
  IDistrict,
  ILocationNhaDat,
  IProvince,
  IWard,
} from '../types/nhaDat.types';
import {
  chooseDistrict,
  chooseProvince,
  chooseWard,
} from '../utils/chooseLocation.utils';

interface Props {
  isFormSearch?: boolean;
  setLocation: React.Dispatch<React.SetStateAction<ILocationNhaDat>>;
  responseFormUpdate?: ILocationNhaDat;
}

const SelectLocationNhaDat = ({
  isFormSearch,
  setLocation,
  responseFormUpdate,
}: Props) => {
  const [province, setProvince] = useState<IProvince>(() =>
    chooseProvince(responseFormUpdate?.province)
  );
  const [district, setDistrict] = useState<IDistrict>(() =>
    chooseDistrict(responseFormUpdate?.province, responseFormUpdate?.district)
  );
  const [ward, setWard] = useState<IWard>(() =>
    chooseWard(
      responseFormUpdate?.province,
      responseFormUpdate?.district,
      responseFormUpdate?.ward
    )
  );
  const [street, setStreet] = useState(() =>
    responseFormUpdate ? responseFormUpdate.street : ''
  );

  useEffect(() => {
    if (responseFormUpdate) return;

    setDistrict({
      code: -1,
      name: '---Chọn Quận/Huyện---',
      wards: [],
    });
  }, [province, responseFormUpdate]);

  useEffect(() => {
    if (responseFormUpdate) return;

    setWard({
      code: -1,
      name: '---Chọn Phường/Xã---',
    });
  }, [district, responseFormUpdate]);

  // OK!
  useEffect(() => {
    // -1 nghĩ là nó chưa có chọn
    const handleSetLocation = setTimeout(() => {
      setLocation({
        province: province.code,
        district: district.code,
        ward: ward.code,
        street: street,
      });
    }, 400);

    return () => clearTimeout(handleSetLocation);
  }, [province, district, ward, street, setLocation]);

  return (
    <div>
      {/* hang 1 */}
      <div
        className={`flex items-center gap-3 ${
          isFormSearch ? 'flex-col' : 'flex-col lg:flex-row'
        }`}
      >
        <ProvincesCombobox province={province} setProvince={setProvince} />
        <DistrictsCombobox
          district={district}
          setDistrict={setDistrict}
          districtList={province && province.districts}
        />
      </div>

      {/* hang 2 */}
      <div className="mt-4 flex items-center gap-3 flex-col lg:flex-row">
        <WardCombobox
          ward={ward}
          setWard={setWard}
          wardList={district && district.wards}
        />

        {!isFormSearch && (
          <div className="flex-1 w-full">
            <label className="mb-2 block font-medium">
              Địa chỉ <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              className="w-full py-2 px-2 rounded-md shadow-md outline-none text-14"
              placeholder="Nhập số nhà, đường, ngõ, hẻm, ..."
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SelectLocationNhaDat);
