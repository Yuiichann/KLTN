import { memo } from 'react';
import {
  AiFillLock,
  AiOutlineUnorderedList,
  AiOutlineUser,
} from 'react-icons/ai';
import { CgList } from 'react-icons/cg';
import { MdKeyboardArrowDown, MdOutlineLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../api/modules/auth.api';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { setGlobalLoading } from '../redux/features/globalLoading.slice';
import { setUser } from '../redux/features/user.slice';
import { AppDispath, RootState } from '../redux/store';
import AuthButtonsGroup from './AuthButtonsGroup';
import ButtonCart from './Cart/ButtonCart';
import HeaderNav from './HeaderNav';
import ImageLazyLoading from './ImageLazyLoading';
import MenuMobile from './Mobile/MenuMobile';
import NoneAvatar from './NoneAvatar';
import ButtonNotify from './Notification/ButtonNotify';

const Header = () => {
  const dispatch = useDispatch<AppDispath>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleSignOut = async () => {
    dispatch(setGlobalLoading(true));
    const { error } = await authApi.signOut();

    if (error && error.message) {
      console.error(error);
    } else {
      localStorage.removeItem('actkn');
      toast.success('Đăng xuất thành công!');
      dispatch(setUser(null));
    }
    dispatch(setGlobalLoading(false));
  };

  return (
    <header className="shadow-md">
      <div className="px-4 max-w-[1536px] mx-auto font-lexend text-14">
        <div className="flex items-center justify-center h-header-mobile lg:justify-between lg:h-header-desktop py-2 relative">
          {/* left header */}
          <div className="flex items-center gap-2 lg:gap-8">
            {/* Logo */}
            <div>
              <Link to="/">
                <Logo className="w-[120px] h-header-mobile lg:w-40 lg:h-header-desktop" />
              </Link>
            </div>

            {/* menu */}
            <div className="hidden lg:block">
              <HeaderNav />
            </div>
          </div>

          {/* right header */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                {/* notifications */}
                <div className="relative">
                  <ButtonNotify />
                </div>

                <div className="relative">
                  <ButtonCart />
                </div>

                {/* user menu */}
                <div className="group relative">
                  <Link to="/trang-ca-nhan" className="flex items-center gap-1">
                    {user.avatar ? (
                      <ImageLazyLoading
                        src={user.avatar}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                      />
                    ) : (
                      <NoneAvatar character={user.displayName.charAt(0)} />
                    )}
                    <span className="max-w-[100px] line-clamp-1">
                      {user.displayName}
                    </span>
                    <MdKeyboardArrowDown className="text-xl" />
                  </Link>

                  {/* dropdown menu */}
                  <ul className="hidden group-hover:block animate-top-to-bot absolute z-10 overflow-hidden -left-1/4 top-full pt-2 rounded-md shadow-md w-[200px] bg-white">
                    <li>
                      <Link
                        to="/quan-ly-tin/danh-sach-tin"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-secondary effect"
                      >
                        <AiOutlineUnorderedList />
                        <span>Quản lý tin đăng</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/quan-ly-giao-dich/don-cua-ban"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-secondary effect"
                      >
                        <CgList />
                        <span>Quản lý giao dịch</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/trang-ca-nhan"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-secondary effect"
                      >
                        <AiOutlineUser />
                        <span>Thông tin cá nhân</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/trang-ca-nhan/doi-mat-khau"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-secondary effect"
                      >
                        <AiFillLock />
                        <span>Thay đổi mật khẩu</span>
                      </Link>
                    </li>

                    <li
                      onClick={handleSignOut}
                      className="flex items-center gap-2 mt-1 px-4 py-2 hover:bg-secondary effect cursor-pointer border-t"
                    >
                      <MdOutlineLogout />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <AuthButtonsGroup />
                </div>

                <div className="relative">
                  <ButtonCart />
                </div>
              </>
            )}

            {user ? (
              <Link
                to="/quan-ly-tin/dang-tin"
                className="btn btn-secondary tracking-wide font-medium"
              >
                Đăng tin
              </Link>
            ) : (
              <button
                className="btn btn-secondary tracking-wide font-medium"
                onClick={() => toast.info('Vui lòng đăng nhập để thực hiện')}
              >
                Đăng tin
              </button>
            )}
          </div>

          {/* button menu in mobile absolute */}
          <MenuMobile />
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
