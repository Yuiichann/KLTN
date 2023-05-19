import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { priceOptions } from '../../constants/filterPost.constants';

interface Props {
  setRangePrice: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function choosePriceOpsLabel(val?: string) {
  const current = priceOptions.find((item) => item.value === val);

  return current ? current.label : 'Mức giá';
}

const SelectRangePrice = ({ setRangePrice }: Props) => {
  const [value, setValue] = useState<string>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setRangePrice(value);
  }, [setRangePrice, value]);

  useEffect(() => {
    // click bên ngoài dropdown thì đóng
    const handleClickOverside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as any)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOverside);

    return () => document.removeEventListener('mousedown', handleClickOverside);
  }, []);

  return (
    <div
      ref={dropDownRef}
      className="relative w-full lg:w-2/12 pl-4 pr-2 py-1 border rounded-sm"
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggleDropdown}
      >
        <span>{choosePriceOpsLabel(value)}</span>
        <MdKeyboardArrowDown className="text-xl" />
      </div>

      {isDropdownOpen && (
        <div className="z-10 animate-top-to-bot absolute overflow-hidden left-0 top-full min-w-full rounded-md shadow-md bg-white mt-2 after:absolute after:inset-x-0 after:h-2 after:bg-transparent after:-top-2 ">
          <div className="text-text-primary font-lexend">
            <h2 className="sticky top-0 left-0 bg-white border-b p-2 rounded-t-md font-medium">
              Khoảng giá
            </h2>

            <ul className="h-60 overflow-auto scrollbar-w-1 scrollbar-thumb-text-tertiary">
              <li
                className={`relative pl-4 py-1 cursor-pointer ${
                  !value ? 'bg-amber-200' : 'hover:bg-[#f2f2f2] effect'
                }`}
                onClick={() => {
                  setValue(undefined);
                  setIsDropdownOpen(false);
                }}
              >
                {!value && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2">
                    <HiCheck />
                  </div>
                )}
                <span className="pl-3">Tất cả</span>
              </li>

              {priceOptions.map((opts) => (
                <li
                  key={opts.value}
                  className={`relative pl-4 py-1 cursor-pointer ${
                    value === opts.value
                      ? 'bg-amber-200'
                      : 'hover:bg-[#f2f2f2] effect'
                  }`}
                  onClick={() => {
                    setValue(opts.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {value === opts.value && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <HiCheck />
                    </div>
                  )}
                  <span className="pl-3">{opts.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectRangePrice);
