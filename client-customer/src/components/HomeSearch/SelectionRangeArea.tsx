import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { areaOptions } from '../../constants/filterPost.constants';

interface Props {
  setRangeArea: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function chooseAreaOpsLabel(val?: string) {
  const current = areaOptions.find((item) => item.value === val);

  return current ? `${current.label} m2` : 'Diện tích';
}

const SelectionRangeArea = ({ setRangeArea }: Props) => {
  const [value, setValue] = useState<string>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      setRangeArea(value);
    }, 500);

    return () => clearTimeout(delay);
  }, [setRangeArea, value]);

  useEffect(() => {
    // click bên ngoài dropdown thì đóng
    const handleClickOverside = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as any)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOverside);

    return () => document.removeEventListener('mousedown', handleClickOverside);
  }, []);

  return (
    <div ref={dropDownRef} className="relative w-full lg:w-2/12 pl-4 pr-2 py-1 border rounded-sm">
      <div className="flex items-center justify-between cursor-pointer" onClick={handleToggleDropdown}>
        <span className="line-clamp-1">{chooseAreaOpsLabel(value)}</span>
        <MdKeyboardArrowDown className="text-xl" />
      </div>

      {isDropdownOpen && (
        <div className="z-10 overflow-hidden animate-top-to-bot absolute left-0 top-full min-w-full rounded-md shadow-md bg-white mt-2 after:absolute after:inset-x-0 after:h-2 after:bg-transparent after:-top-2 ">
          <div className="text-text-primary font-lexend">
            <h2 className="sticky top-0 left-0 bg-white border-b p-2 rounded-t-md font-medium">Diện tích</h2>

            <ul className="h-60 overflow-auto scrollbar-w-1 scrollbar-thumb-text-tertiary">
              <li
                className={`relative pl-4 py-1 cursor-pointer flex items-center gap-1 ${
                  !value ? 'bg-amber-200' : 'hover:bg-[#f2f2f2]'
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

              {areaOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={`relative pl-4 py-1 cursor-pointer flex items-center gap-1 ${
                    value === opt.value ? 'bg-amber-200' : 'hover:bg-[#f2f2f2]'
                  }`}
                  onClick={() => {
                    setValue(opt.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {value === opt.value && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2">
                      <HiCheck />
                    </div>
                  )}
                  <span className="pl-3">{opt.label}</span>
                  <div className="relative text-12">
                    <span>m</span>
                    <span className="absolute -top-1 -right-2">2</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectionRangeArea);
