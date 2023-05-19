import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuItems from '../constants/MenuItems.constants';

const HeaderNav = () => {
  const location = useLocation();

  return (
    <ul className="flex items-center gap-6">
      {MenuItems.map((item, index) =>
        item.children && item.children.length > 0 ? (
          <li key={index}>
            <div
              className={`group font-medium py-1 block relative after:absolute after:left-0 after:top-full after:w-0 after:h-[1.2px] after:bg-primary after:effect after:duration-300 ${
                location.pathname === item.path
                  ? 'after:w-full'
                  : ' hover:after:w-full'
              }`}
            >
              <Link to={item.path}>{item.label}</Link>

              <ul className="hidden group-hover:block absolute z-30 left-0 top-full w-[280px] py-2 bg-white shadow-md rounded-b-lg mt-2 animate-top-to-bot after:absolute after:inset-x-0 after:h-2 after:-top-2 after:bg-transparent">
                {item.children.map((subItem) => (
                  <li key={subItem.path}>
                    <Link
                      to={subItem.path}
                      className="font-normal block py-2 px-4 hover:bg-secondary effect"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ) : (
          <li key={index}>
            <Link
              to={item.path}
              className={`group font-medium py-1 block relative after:absolute after:left-0 after:top-full after:w-0 after:h-[1.2px] after:bg-primary after:effect after:duration-300 ${
                location.pathname === item.path
                  ? 'after:w-full'
                  : 'hover:after:w-full'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default memo(HeaderNav);
