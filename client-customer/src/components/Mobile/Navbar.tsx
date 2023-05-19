import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuItems from '../../constants/MenuItems.constants';
import NavbarItem from './NavbarItem';

interface Props {
  handleCloseMenu: VoidFunction;
}

const Navbar = ({ handleCloseMenu }: Props) => {
  const location = useLocation();

  return (
    <ul className="text-16">
      {MenuItems.map((item, index) =>
        item.children ? (
          <NavbarItem
            key={index}
            item={item}
            handleCloseMenu={handleCloseMenu}
          />
        ) : (
          <li key={index}>
            <Link
              to={item.path}
              className={`pl-4 py-2 border-b h-[58px] flex items-center ${
                location.pathname.includes(item.path)
                  ? 'text-red-500 font-medium'
                  : ''
              }`}
              onClick={handleCloseMenu}
            >
              {item.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default memo(Navbar);
