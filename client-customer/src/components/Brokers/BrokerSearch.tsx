import React, { useCallback, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import BrokerFields from '../../constants/BrokerFields.constants';
import { IBrokerListParams } from '../../types/api.types';
import { IDistrict, IProvince } from '../../types/nhaDat.types';
import SelectDistrict from './SelectDistrict';
import SelectProvince from './SelectProvince';
import SelectTypeNhadat from './SelectTypeNhadat';

interface Props {
  handleSearchBrokers: (params: IBrokerListParams) => Promise<void>;
}

const BrokerSearch = ({ handleSearchBrokers }: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const [typeNhaDat, setTypeNhaDat] = useState(BrokerFields[0]);
  const [province, setProvince] = useState<IProvince>({
    name: 'Tỉnh/Thành phố',
    code: -1,
    districts: [],
  });
  const [district, setDistrict] = useState<IDistrict>({
    name: 'Quận/Huyện',
    code: -1,
    wards: [],
  });

  const handleSearch = useCallback(() => {
    handleSearchBrokers({
      search: encodeURI(keyword),
      fields: typeNhaDat.value || undefined,
      provCode: province.code !== -1 ? province.code : undefined,
      distCode: district.code !== -1 ? district.code : undefined,
    });
  }, [keyword, typeNhaDat, district, province, handleSearchBrokers]);

  const handleEnterInputSeach = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && keyword !== '') {
        handleSearch();
      }
    },
    [handleSearch, keyword]
  );

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded-md">
      <div className="flex gap-2 flex-col lg:flex-row">
        <h2 className="min-w-fit text-red-500 py-1 text-center">TÌM KIẾM MÔI GIỚI</h2>

        <div className="flex-1">
          {/* Search Input */}
          <div className="flex items-center gap-3 border rounded-md pl-4 pr-2 py-1 text-14">
            <input
              type="text"
              className="flex-1 outline-none border-none"
              placeholder="Nhập từ khóa tìm kiếm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleEnterInputSeach}
            />
            <div className="text-16 min-w-fit px-2 cursor-pointer hover:text-red-500 effect" onClick={handleSearch}>
              <HiSearch />
            </div>
          </div>

          {/* Filter Options */}
          <div className="flex md:items-center gap-2 mt-2 flex-col md:flex-row">
            {/* typenhadat */}
            <SelectTypeNhadat typeNhaDat={typeNhaDat} setTypeNhaDat={setTypeNhaDat} />

            {/* tinh - thanh pho */}
            <SelectProvince province={province} setProvince={setProvince} setDistrict={setDistrict} />

            {/* quan - huyen */}
            <SelectDistrict districtList={province.districts as any} district={district} setDistrict={setDistrict} />

            <button
              onClick={handleSearch}
              className="font-medium text-14 min-w-[100px] py-1 rounded-sm bg-red-500 text-white border border-red-500"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BrokerSearch);
