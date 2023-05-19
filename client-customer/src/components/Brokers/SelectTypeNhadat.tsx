import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import BrokerFields from '../../constants/BrokerFields.constants';

interface ITypeNhaDat {
  label: string;
  value: string;
}

interface Props {
  typeNhaDat: ITypeNhaDat;
  setTypeNhaDat: React.Dispatch<React.SetStateAction<ITypeNhaDat>>;
}

const SelectTypeNhadat = ({ setTypeNhaDat, typeNhaDat }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleSetTypeNhaDat = useCallback(
    (val: ITypeNhaDat) => {
      setTypeNhaDat(val);
      setIsMenuOpen((prev) => !prev);
    },
    [setTypeNhaDat]
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
        <span className="flex-1 line-clamp-1 text-left">{typeNhaDat.label}</span>
        <MdOutlineKeyboardArrowDown className="text-16" />
      </button>

      {isMenuOpen && (
        <ul className="absolute z-10 left-0 top-full py-2 bg-white w-full min-w-[170px] md:w-[220px] h-56 overflow-auto rounded-sm shadow-md mt-1 scrollbar-w-1 scrollbar-track-gray-300 scrollbar-thumb-text-secondary">
          {BrokerFields.map((item, index) => (
            <li
              key={index}
              className={`pl-3 py-1 hover:bg-overlay cursor-pointer line-clamp-1 ${
                item.value === typeNhaDat.value ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleSetTypeNhaDat(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(SelectTypeNhadat);
