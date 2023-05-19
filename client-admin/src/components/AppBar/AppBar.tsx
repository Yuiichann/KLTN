import { memo, useContext } from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
  menuClasses,
  useProSidebar,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import SidebarConstants from '../../constants/Sidebar.constants';
import { context } from '../../context/Context';

// defaut theme sidebar
const theme = {
  sidebar: {
    backgroundColor: '#0b2948',
    color: '#8ba1b7',
  },
  menu: {
    menuContent: '#082440',
    icon: '#59d0ff',
    hover: {
      backgroundColor: '#00458b',
      color: '#b6c8d9',
    },
    disabled: {
      color: '#3e5e7e',
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const AppBar = () => {
  const { collapsed, toggleSidebar, collapseSidebar } = useProSidebar();
  const { setUser, setIsGlobalLoading } = useContext(context);

  // styles
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '15px',
      fontWeight: 400,
    },
    icon: {
      color: theme.menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: theme.menu.disabled.color,
      },
      fontSize: '18px',
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(theme.menu.menuContent, !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: theme.menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(theme.menu.hover.backgroundColor, 1),
        color: theme.menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div className="h-full overflow-auto font-lexend">
      <Sidebar
        backgroundColor={hexToRgba(theme.sidebar.backgroundColor, 1)}
        rootStyles={{
          color: theme.sidebar.color,
        }}
        className="h-full"
      >
        <div className="flex flex-col h-full justify-between py-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="px-4 block">
              <Logo className="w-full" />
            </Link>

            <Menu menuItemStyles={menuItemStyles}>
              {SidebarConstants.map((item, index) =>
                item.children ? (
                  <SubMenu key={index} label={item.label} icon={<item.icon />}>
                    {item.children.map((subItem) => (
                      <MenuItem
                        key={subItem.path}
                        icon={<subItem.icon />}
                        component={<Link to={subItem.path} />}
                      >
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={index}
                    icon={<item.icon />}
                    component={<Link to={item.path} />}
                  >
                    {item.label}
                  </MenuItem>
                )
              )}
            </Menu>
          </div>

          <div>
            {/* button collapsed */}
            <div className="flex justify-center">
              <button
                onClick={() => collapseSidebar()}
                className="flex justify-center p-4 rounded-full hover:bg-[#00458b] effect"
              >
                {collapsed ? (
                  <IoMdArrowRoundForward className="text-xl" />
                ) : (
                  <IoMdArrowRoundBack className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default memo(AppBar);
