import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';
import {
  directionOptions,
  toiletOptions,
} from '../../constants/filterPost.constants';

interface Props {
  setToilet: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDirection: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectOthers = ({ setToilet, setDirection }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [numToilet, setNumToilet] = useState<number[]>([]);
  const [homeDirection, setHomeDirection] = useState<string[]>([]);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  // reset data
  const handleReset = useCallback(() => {
    setNumToilet([]);
    setHomeDirection([]);
  }, []);

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  // xử lý chọn toilets
  const handleClickToilet = useCallback(
    (val: number) => {
      const checkIndex = numToilet.findIndex((item) => item === val);

      if (checkIndex !== -1) {
        const arr = [...numToilet];
        arr.splice(checkIndex, 1);
        setNumToilet(arr);
      } else {
        setNumToilet([...numToilet, val]);
      }
    },
    [numToilet]
  );

  // xử lý chọn hướng nhà
  const handleClickHomeDirection = useCallback(
    (val: string) => {
      const checkIndex = homeDirection.findIndex((item) => item === val);

      if (checkIndex !== -1) {
        const arr = [...homeDirection];
        arr.splice(checkIndex, 1);
        setHomeDirection(arr);
      } else {
        setHomeDirection([...homeDirection, val]);
      }
    },
    [homeDirection]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      const value = numToilet.reduce((curr, val, index) => {
        if (index === 0) {
          curr += val;
        } else {
          curr += `,${val}`;
        }
        return curr;
      }, '');

      setToilet(value);
    }, 500);

    return () => clearTimeout(delay);
  }, [setToilet, numToilet]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const value = homeDirection.reduce((curr, val, index) => {
        if (index === 0) {
          curr += val;
        } else {
          curr += `,${val}`;
        }
        return curr;
      }, '');

      setDirection(value);
    }, 500);

    return () => clearTimeout(delay);
  }, [setDirection, homeDirection]);

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
        <span>Lọc thêm</span>
        <MdKeyboardArrowDown className="text-xl" />
      </div>

      {isDropdownOpen && (
        <div className="z-10 animate-top-to-bot absolute left-0 top-full min-w-full rounded-md shadow-md bg-white text-text-primary mt-2 after:absolute after:inset-x-0 after:h-2 after:bg-transparent after:-top-2">
          <div className="w-80 mx-auto">
            <h2 className="border-b p-2 rounded-t-md font-medium">
              Số phòng vệ sinh
            </h2>

            {/* toilets */}
            <ul className="flex flex-row flex-wrap gap-2 my-4 px-2">
              {toiletOptions.map((item) => (
                <li
                  key={item}
                  className={`p-1 text-text-primary rounded-full w-10 h-1w-10 cursor-pointer flex items-center justify-center ${
                    numToilet.includes(item)
                      ? 'bg-amber-300'
                      : 'bg-[#f2f2f2] hover:bg-gray-400 effect'
                  }`}
                  onClick={() => handleClickToilet(item)}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="border-b p-2 rounded-t-md font-medium">Hướng nhà</h2>

            {/* home direction */}
            <ul className="flex flex-row flex-wrap gap-3 my-4 px-2">
              {directionOptions.map((item) => (
                <li
                  key={item.value}
                  className={`p-1 bg-[#f2f2f2] text-text-primary rounded-md px-3 py-1 cursor-pointer ${
                    homeDirection.includes(item.value)
                      ? 'bg-amber-300'
                      : 'bg-[#f2f2f2] hover:bg-gray-400 effect'
                  }`}
                  onClick={() => handleClickHomeDirection(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="flex justify-end pb-2 pr-2">
              <button
                className="flex items-center gap-1 px-3 py-1 border border-red-500 rounded-md"
                onClick={handleReset}
              >
                <RxReset />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectOthers);
