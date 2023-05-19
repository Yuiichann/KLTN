import Tippy from '@tippyjs/react';
import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { IoPushOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from '../../api/modules/auth.api';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { setGlobalLoading } from '../../redux/features/globalLoading.slice';
import { setUser } from '../../redux/features/user.slice';
import { AppDispath, RootState } from '../../redux/store';
import NoneAvatar from '../NoneAvatar';
import Navbar from './Navbar';
import NotifyButton from './NotifyButton';

const MenuMobile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispath>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // handle signout
  const handleSignOut = useCallback(() => {
    dispatch(setGlobalLoading(true));
    authApi.signOut().then(() => {
      toast.success('Đăng xuất thành công');
      localStorage.removeItem('actkn');

      dispatch(setUser(null));
      dispatch(setGlobalLoading(false));

      setIsMenuOpen(false);
    });
  }, [dispatch]);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleResize = useCallback(() => {
    window.innerWidth > 1024 && setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex items-center gap-1 lg:hidden absolute top-1/2 -translate-y-1/2 right-0">
        {/* Button Menu */}
        <button onClick={() => setIsMenuOpen(true)} className="btn-icon">
          <AiOutlineMenu className="text-xl" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed z-10 top-0 left-0 w-screen h-screen">
          {/* overlay */}
          <div onClick={handleCloseMenu} className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>

          <div className="absolute flex flex-col justify-between gap-12 top-0 right-0 w-4/6 h-full overflow-y-auto scrollbar-w-0 pt-2 bg-white animate-memuMobile-in">
            {/* menu lumlala */}
            <div>
              {/* button đăng nhập đăng kí */}
              {user ? (
                <div className="px-2 sm:px-6">
                  <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-8">
                    {/* Link trang ca nhan */}
                    <Link to="/trang-ca-nhan" onClick={handleCloseMenu} className="flex items-center gap-2">
                      {/* avatar */}
                      <div className="min-w-fit">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.displayName}
                            className="w-12 h-12 object-cover rounded-full shadow-md"
                          />
                        ) : (
                          <NoneAvatar character={user.displayName.charAt(0)} />
                        )}
                      </div>

                      {/* name */}
                      <h3 className="font-medium text-16 line-clamp-1">{user.displayName}</h3>
                    </Link>

                    {/* btn signout */}
                    <div className="flex items-center gap-1">
                      {/* Button notify */}
                      <div onClick={handleCloseMenu}>
                        <NotifyButton />
                      </div>

                      <Tippy content="Đăng xuất" animation="fade">
                        <button className="btn-icon" onClick={handleSignOut}>
                          <FaSignOutAlt className="text-xl" />
                        </button>
                      </Tippy>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-2 sm:px-6 pt-4">
                  <Link to="/trang-dang-nhap" className="flex-1 btn btn-primary btn-full btn-sm" onClick={handleCloseMenu}>
                    Đăng nhập
                  </Link>
                  <Link to="/trang-dang-ky" className="flex-1 btn btn-primary btn-full btn-sm" onClick={handleCloseMenu}>
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* button Gio hàng */}
              <div className="px-2 sm:px-6 mt-5 mb-6">
                <Link
                  onClick={handleCloseMenu}
                  to="/gio-hang"
                  className="flex justify-center items-center gap-4 w-full py-2 border border-[#009BA1] text-[#009BA1] rounded-md"
                >
                  <FaShoppingCart />
                  <span>Giỏ hàng</span>
                </Link>
              </div>

              {/* Button đăng tin */}
              <div className="px-2 sm:px-6 mb-2">
                {user ? (
                  <Link
                    to="/quan-ly-tin/dang-tin"
                    onClick={handleCloseMenu}
                    className="flex items-center justify-center gap-4 w-full text-red-500 py-2 rounded-md border border-red-500"
                  >
                    <IoPushOutline />
                    <span>Đăng tin</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => toast.warn('Vui lòng đăng nhập!')}
                    className="flex items-center gap-4 justify-center w-full text-red-500 py-2 rounded-md border border-red-500"
                  >
                    <IoPushOutline />
                    <span>Đăng tin</span>
                  </button>
                )}
              </div>

              {/* Button quản lý tin đăng & quản lý đơn hàng */}
              {user && (
                <div className="flex items-center gap-1 px-2 sm:px-6 mb-2 text-14">
                  <div className="flex-1">
                    <Link
                      onClick={handleCloseMenu}
                      to="/quan-ly-tin/danh-sach-tin"
                      className="block w-full text-center py-2 border border-[#009BA1] text-[#009BA1] rounded-md"
                    >
                      QL. Bài đăng
                    </Link>
                  </div>

                  <div className="flex-1">
                    <Link
                      onClick={handleCloseMenu}
                      to="/quan-ly-giao-dich/don-cua-ban"
                      className="block w-full text-center py-2 border border-[#009BA1] text-[#009BA1] rounded-md"
                    >
                      QL. Giao dịch
                    </Link>
                  </div>
                </div>
              )}

              {/* Menu here */}
              <Navbar handleCloseMenu={handleCloseMenu} />
            </div>

            {/* logo */}
            <Link to="/" className="flex justify-center">
              <Logo className="w-3/4 px-4 py-2" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(MenuMobile);
