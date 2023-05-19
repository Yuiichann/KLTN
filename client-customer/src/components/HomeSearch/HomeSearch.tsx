import { memo, useCallback, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import SelectLocation from './SelectLocation';
import SelectOthers from './SelectOthers';
import SelectRangePrice from './SelectRangePrice';
import SelectionRangeArea from './SelectionRangeArea';

const HomeSearch = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');
  const [demandType, setDemandType] = useState<'buy' | 'lease'>('buy');
  const [typeNhaDat, setTypeNhaDat] = useState<string>();
  const [rangePrice, setRangePrice] = useState<string>();
  const [rangeArea, setRangeArea] = useState<string>();
  const [location, setLocation] = useState({
    province: -1,
    district: -1,
    ward: -1,
  });
  const [numToilet, setNumToilet] = useState<string>();
  const [homeDirection, setHomeDirection] = useState<string>();

  // set demand và reset type nhà đất
  const handleSetDemandType = useCallback((val: typeof demandType) => {
    setDemandType(val);

    // reset lại type  khi đổi cải kia
    setTypeNhaDat(undefined);
  }, []);

  // mọi data đề oke
  const handleSearch = () => {
    let urlQuery = `demand=${demandType}`;

    if (typeNhaDat) {
      urlQuery += `&loainhadat=${typeNhaDat}`;
    }

    // custom location
    if (location.province !== -1) {
      urlQuery += `&provCode=${location.province}`;

      if (location.district !== -1) {
        urlQuery += `&distCode=${location.district}`;

        if (location.ward !== -1) {
          urlQuery += `&wardCode=${location.ward}`;
        }
      }
    }

    if (rangePrice) {
      urlQuery += `&price=${rangePrice}`;
    }

    if (rangeArea) {
      urlQuery += `&area=${rangeArea}`;
    }

    if (numToilet) {
      urlQuery += `&toilets=${numToilet}`;
    }

    if (homeDirection) {
      urlQuery += `&direction=${homeDirection}`;
    }

    if (keyword) {
      urlQuery += `&keyword=${keyword}`;
    }

    navigate(`/tim-kiem?${urlQuery}`);
  };

  const handlePressEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <div className="lg:text-white text-14 font-roboto max-w-6xl mx-auto">
        {/* button chọn demand */}
        <div className="flex items-center gap-2">
          <button
            className={`flex-1 sm:flex-none px-4 min-w-[150px] py-2 rounded-t-md hover:font-medium ${
              demandType === 'buy' ? 'bg-neutral-700 font-medium text-white' : 'bg-overlay'
            }`}
            onClick={() => handleSetDemandType('buy')}
          >
            Nhà đất bán
          </button>
          <button
            className={`flex-1 sm:flex-none px-4 min-w-[150px] py-2 rounded-t-md hover:font-medium ${
              demandType === 'lease' ? 'bg-neutral-700 font-medium text-white' : 'bg-overlay'
            }`}
            onClick={() => handleSetDemandType('lease')}
          >
            Nhà đất cho thuê
          </button>
        </div>

        <div className="bg-neutral-700 p-4  sm:rounded-tr-md rounded-b-md">
          {/* inpunt searhc & select */}
          <div className="flex items-center gap-2 bg-white rounded-md text-text-primary py-2 px-4">
            {/* dropdown */}
            <div className="border-r-2">
              <SearchDropdown demandType={demandType} typeNhaDat={typeNhaDat} setTypeNhaDat={setTypeNhaDat} />
            </div>

            {/* input */}
            <div className="flex-1 flex items-center gap-1">
              <input
                type="text"
                className="flex-1 text-16 p-1 outline-none w-full"
                placeholder="Nhập từ khóa tìm kiếm . . ."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handlePressEnterSearch}
              />

              <button
                onClick={handleSearch}
                className="hidden md:flex items-center gap-1 bg-primary py-2 px-3 rounded-md text-white font-medium hover:bg-opacity-60"
              >
                <BiSearch />
                <span>Tìm kiếm</span>
              </button>
            </div>
          </div>

          {/* Button search in mobile */}
          <div className="mt-4 block md:hidden">
            <button
              onClick={handleSearch}
              className="w-full text-16 flex justify-center items-center gap-4 bg-primary py-2 px-3 rounded-md text-white font-medium hover:opacity-60 effect"
            >
              <BiSearch />
              <span>Tìm kiếm</span>
            </button>
          </div>

          {/* filter */}
          <div className="flex items-center gap-4 mt-4 flex-col lg:flex-row text-white">
            {/* location */}
            <SelectLocation setValue={setLocation} />

            {/* giá */}
            <SelectRangePrice setRangePrice={setRangePrice} />

            {/* diện tích */}
            <SelectionRangeArea setRangeArea={setRangeArea} />

            {/* tùy chọn */}
            <SelectOthers setToilet={setNumToilet} setDirection={setHomeDirection} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomeSearch);
