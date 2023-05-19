import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Provinces from '../../constants/provinces.json';
import { IDistrict, IProvince } from '../../types/nhaDat.types';

interface Props {
  province: IProvince;
  setProvince: React.Dispatch<React.SetStateAction<IProvince>>;
  setDistrict: React.Dispatch<React.SetStateAction<IDistrict>>;
}

const SelectProvince = ({ province, setProvince, setDistrict }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleSetProvince = useCallback(
    (prov: (typeof Provinces)[0]) => {
      setProvince({
        name: prov.name,
        code: prov.code,
        districts: prov.districts,
      });

      setDistrict({
        name: 'Quận/Huyện',
        code: -1,
        wards: [],
      });

      setIsMenuOpen((prev) => !prev);
    },
    [setProvince, setDistrict]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as any)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="text-14 relative" ref={menuRef}>
      <button
        onClick={handleToggleMenu}
        className="flex justify-between items-center gap-2 pl-3 pr-1 py-1 w-full md:w-[150px] border rounded-sm hover:border-black"
      >
        <span className="flex-1 line-clamp-1 text-left">{province.name}</span>
        <MdOutlineKeyboardArrowDown className="text-16" />
      </button>

      {isMenuOpen && (
        <ul className="absolute z-10 left-0 top-full py-2 bg-white w-full min-w-[170px] md:w-[220px] h-56 overflow-auto rounded-sm shadow-md mt-1 scrollbar-w-1 scrollbar-track-gray-300 scrollbar-thumb-text-secondary">
          {/* button set defaut */}
          <li
            className="pl-3 py-1 hover:bg-overlay cursor-pointer line-clamp-1"
            onClick={() =>
              handleSetProvince({
                name: 'Tỉnh/Thành phố',
                code: -1,
                districts: [],
              } as any)
            }
          >
            Tỉnh/Thành phố
          </li>

          {/* líst tỉnh thành phố */}
          {Provinces.map((item, index) => (
            <li
              key={index}
              className={`pl-3 py-1 hover:bg-overlay cursor-pointer line-clamp-1 ${
                item.code === province.code ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSetProvince(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(SelectProvince);
