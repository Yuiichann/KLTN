import React, { useRef, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { IMenuItems } from '../../constants/MenuItems.constants';

interface Props {
  item: IMenuItems;
  handleCloseMenu: VoidFunction;
}

const NavbarItem = ({ item, handleCloseMenu }: Props) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const subMenuRef = useRef<HTMLUListElement | null>(null);

  const handleToogleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="border-b">
      <div className="pl-4 py-2 flex items-center justify-between h-[58px]">
        <Link
          className={`flex-1 ${
            location.pathname.includes(item.path)
              ? 'text-red-500 font-medium'
              : ''
          }`}
          to={item.path}
          onClick={handleCloseMenu}
        >
          {item.label}
        </Link>

        <button
          className={`pr-2 rounded-full text-2xl effect ${
            isOpen ? 'rotate-90  pl-2' : 'rotate-0 pl-8'
          }`}
          onClick={handleToogleSubMenu}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>

      <div
        className={`overflow-y-hidden effect`}
        style={{
          height: isOpen ? subMenuRef.current?.offsetHeight : 0,
        }}
      >
        <ul ref={subMenuRef} className="ml-4 text-14">
          {item.children &&
            item.children.map((subItem, index) => (
              <li key={index}>
                <Link
                  to={subItem.path}
                  className="pl-2 line-clamp-1 py-2 border-b"
                  onClick={handleCloseMenu}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </li>
  );
};

export default React.memo(NavbarItem);
