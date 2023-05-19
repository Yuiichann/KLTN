import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import userApi from './api/modules/user.api';
import ButtonScrollTop from './components/ButtonScrollTop';
import Footer from './components/Footer';
import GlobalLoading from './components/GlobalLoading';
import Header from './components/Header';
import { setGlobalLoading } from './redux/features/globalLoading.slice';
import { setUser } from './redux/features/user.slice';
import { AppDispath } from './redux/store';
import AppRoutes from './routes/AppRoutes.routes';

const App = () => {
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    const checkUserLogged = async () => {
      const actkn = localStorage.getItem('actkn');

      if (actkn) {
        const { response, error } = await userApi.getPrivateInfo();

        // nếu xảy ra lỗi ở đây là do refreshToken hết hạn
        // người dùng phải đăng nhập lại
        if (error && error.message) {
          localStorage.removeItem('actkn');
          console.error({ error: 'User not sign in !!!!!' });
        }

        // pass thì lấy thông tin user và lưu vào redux
        if (response && response.data) {
          dispatch(setUser(response.data));
        }
      }
      dispatch(setGlobalLoading(false));
    };

    checkUserLogged();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Helmet>
        <title>
          Bất động sản VN - Website số 1 từ dưới lên về bất động sản sản
        </title>
      </Helmet>

      {/* GlobalLoading */}
      <GlobalLoading />

      <div id="app">
        <Header />

        <main>
          <AppRoutes />
        </main>

        <Footer />
      </div>

      <div>
        <ButtonScrollTop />
        <ToastContainer
          autoClose={3500}
          position="top-center"
          limit={5}
          bodyClassName="text-center text-14 text-text-primary"
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
