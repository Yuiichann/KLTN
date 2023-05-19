import Tippy from '@tippyjs/react';
import { useContext } from 'react';
import { AiFillBell } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { Navigate, Outlet } from 'react-router-dom';
import authApi from '../api/modules/auth.api';
import AppBar from '../components/AppBar/AppBar';
import NoneAvatar from '../components/NoneAvatar';
import { context } from '../context/Context';
import Footer from '../components/Footer';

interface Props {
  children: JSX.Element;
}

const Layout = () => {
  const { user, setUser, setIsGlobalLoading } = useContext(context);

  // handle signout
  const handleSignout = () => {
    setIsGlobalLoading(true);

    authApi
      .signOut()
      .then(() => {
        localStorage.removeItem('actkn');
        setUser(null);
        setIsGlobalLoading(false);
      })
      .catch(() => {
        setIsGlobalLoading(false);
      });
  };

  if (!user) {
    return <Navigate to="/dang-nhap" />;
  }

  return (
    <>
      <div className="h-screen hidden lg:flex">
        <div className="min-w-fit">
          <AppBar />
        </div>

        {/* main */}
        <main className="flex-grow h-full overflow-auto bg-whiteSmoke px-6 pt-12 scrollbar-w-2 scrollbar-thumb-hoverSidebar scrollbar-track-slate-200 relative">
          <div className="min-h-[calc(100vh-48px)]">
            <Outlet />
          </div>

          {/* user  */}
          <div className="absolute top-2 right-5">
            <div className="flex items-center gap-3">
              <Tippy content="Thông báo">
                <button className="p-3 text-xl hover:bg-overlay rounded-full effect">
                  <AiFillBell />
                </button>
              </Tippy>

              <div className="flex items-center gap-2">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.displayName} />
                ) : (
                  <NoneAvatar character={user.displayName.charAt(0)} />
                )}
              </div>

              <Tippy content="Đăng xuất">
                <button
                  className="p-3 hover:bg-overlay rounded-full effect"
                  onClick={handleSignout}
                >
                  <FaSignOutAlt />
                </button>
              </Tippy>
            </div>
          </div>

          <Footer />
        </main>
      </div>

      <div className="flex lg:hidden w-screen h-screen items-center justify-center px-4">
        <h1 className="text-2xl text-center font-semibold tracking-wider">
          Trang chưa hỗ trợ RESPONSIVE!!!
        </h1>
      </div>
    </>
  );
};

export default Layout;
