import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { chooseProvince } from '../../utils/chooseLocation.utils';
import SelectLocationNhaDat from '../SelectLocationNhaDat';

interface Props {
  setValue: React.Dispatch<
    React.SetStateAction<{ province: number; district: number; ward: number }>
  >;
}

const SelectLocation = ({ setValue }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState({
    province: -1,
    district: -1,
    ward: -1,
    street: '',
  });
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    setValue({
      province: location.province,
      district: location.district,
      ward: location.ward,
    });
  }, [location, setValue]);

  // xử lý dropdonw
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
        <span className="line-clamp-1">
          {chooseProvince(location.province).code === -1
            ? 'Khu vực'
            : chooseProvince(location.province).name}
        </span>
        <MdKeyboardArrowDown className="text-xl" />
      </div>

      {isDropdownOpen && (
        <div className="z-10 animate-top-to-bot absolute left-0 top-full min-w-full rounded-md shadow-md bg-white text-text-primary mt-2 after:absolute after:inset-x-0 after:h-2 after:bg-transparent after:-top-2 ">
          <div className="w-full lg:w-[350px] px-3 lg-px-2 py-4 mx-auto">
            <h2 className="text-xl font-medium mb-4">Chọn khu vực</h2>

            <SelectLocationNhaDat
              setLocation={setLocation}
              isFormSearch={true}
              responseFormUpdate={location}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SelectLocation);
