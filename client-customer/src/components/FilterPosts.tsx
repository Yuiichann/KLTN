import { memo, useCallback } from 'react';
import {
  areaOptions,
  priceLeaseOptions,
  priceOptions,
} from '../constants/filterPost.constants';

interface Props {
  rangePrice?: string;
  rangeArea?: string;
  setRangePrice: React.Dispatch<React.SetStateAction<string | undefined>>;
  setRangeArea: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const FilterPosts = (props: Props) => {
  const { rangeArea, rangePrice, setRangeArea, setRangePrice } = props;

  //   click 2 lần để hủy
  const handleSetRangePrice = useCallback(
    (val: string) => {
      if (val === rangePrice) {
        setRangePrice(undefined);
      } else {
        setRangePrice(val);
      }
    },
    [rangePrice, setRangePrice]
  );

  const handleSetRangeArea = useCallback(
    (val: string) => {
      if (val === rangeArea) {
        setRangeArea(undefined);
      } else {
        setRangeArea(val);
      }
    },
    [rangeArea, setRangeArea]
  );

  return (
    <div className="select-none">
      <div className="py-4 px-3 border rounded-md">
        <h3 className="font-medium tracking-wide">Lọc theo khoảng giá</h3>

        <ul className="mt-1 text-text-secondary">
          {priceOptions.map((opts) => (
            <li
              key={opts.value}
              className={`pl-3 pt-2 cursor-pointer hover:opacity-80 ${
                rangePrice === opts.value ? 'font-medium text-red-500' : ''
              }`}
              onClick={() => handleSetRangePrice(opts.value)}
            >
              {opts.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 py-4 px-3 border rounded-md">
        <h3 className="font-medium tracking-wide">Lọc theo diện tích</h3>

        <ul className="mt-1 text-text-secondary">
          {areaOptions.map((opts) => (
            <li
              key={opts.value}
              className={`pl-3 pt-2 cursor-pointer hover:opacity-80 flex items-center gap-1 ${
                rangeArea === opts.value ? 'font-medium text-red-500' : ''
              }`}
              onClick={() => handleSetRangeArea(opts.value)}
            >
              {opts.label}
              {opts.value && (
                <div className="relative text-14">
                  <span>m</span>
                  <span className="absolute -top-1 -right-2 text-12">2</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 py-4 px-3 border rounded-md bg-secondary">
        <h3 className="font-medium tracking-wide">Mua bán nhà đất</h3>
      </div>
    </div>
  );
};

export default memo(FilterPosts);
