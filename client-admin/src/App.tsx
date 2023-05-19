import { useContext, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import 'tippy.js/dist/tippy.css';
import userApi from './api/modules/user.api';
import { context } from './context/Context';
import AppRoutes from './routes/AppRoutes.routes';

const App = () => {
  const { isGlobalLoading, setIsGlobalLoading, setUser } = useContext(context);

  useEffect(() => {
    const checkUserLogged = async () => {
      const actkn = localStorage.getItem('actkn');

      if (actkn) {
        const { response, error } = await userApi.getPrivateInfo();

        // nếu xảy ra lỗi ở đây là do refreshToken hết hạn
        // người dùng phải đăng nhập lại
        if (error && error.message) {
          localStorage.removeItem('actkn');
          console.error({ error: 'Not LOGIN!' });
        }

        // pass thì lấy thông tin user và lưu vào redux
        if (response && response.data) {
          setUser(response.data);
        }
      }
    };

    checkUserLogged();
    // delay chuts
    setTimeout(() => {
      setIsGlobalLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {/* globalLoading */}
      {isGlobalLoading ? (
        <div className="fixed inset-0 bg-sidebar flex flex-col gap-8 items-center justify-center text-white">
          <AiOutlineLoading3Quarters className="text-5xl animate-spin" />
          <h1 className="text-3xl tracking-wider text-center">VUI LÒNG ĐỢI</h1>
        </div>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
};

export default App;
