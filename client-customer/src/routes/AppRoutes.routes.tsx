import { Route, Routes } from 'react-router-dom';
import Account from '../pages/Account/Account';
import AccountNotification from '../pages/Account/AccountNotification';
import ChangePassword from '../pages/Account/ChangePassword';
import EditBroker from '../pages/Account/EditBroker';
import RegisterBroker from '../pages/Account/RegisterBroker';
import UpdateAccountInfo from '../pages/Account/UpdateAccountInfo';
import AddNewNhaDat from '../pages/AddNewNhaDat';
import BrokerDetail from '../pages/BrokerDetail';
import Brokers from '../pages/Brokers';
import Carts from '../pages/Carts';
import Exchange from '../pages/Exchange';
import ExchangeDetail from '../pages/ExchangeManage/ExchangeDetail';
import ExchangeManage from '../pages/ExchangeManage/ExchangeManage';
import RequestExchange from '../pages/ExchangeManage/RequestExchange';
import YourExchange from '../pages/ExchangeManage/YourExchange';
import LandingPage from '../pages/LandingPage';
import ForgetPassword from '../pages/Mobile/ForgetPassword';
import SignIn from '../pages/Mobile/SignIn';
import SignUp from '../pages/Mobile/SignUp';
import PageNotFound from '../pages/PageNotFound';
import PostDetail from '../pages/PostDetail';
import PostLitsManage from '../pages/PostListManage';
import PostManage from '../pages/PostManage';
import Posts from '../pages/Posts';
import PublicUser from '../pages/PublicUser';
import ResetPassword from '../pages/ResetPassword';
import Search from '../pages/Search';
import UpdateNhaDat from '../pages/UpdateNhaDat';

interface IRoute {
  label: string;
  path: string;
  element: () => JSX.Element;
  children?: IRoute[];
}

const routes: IRoute[] = [
  {
    label: '',
    path: '/',
    element: LandingPage,
  },

  {
    label: 'Chi tiết tin',
    path: '/chi-tiet/:slug',
    element: PostDetail,
  },

  {
    label: 'Giỏ hàng',
    path: '/gio-hang',
    element: Carts,
  },

  {
    label: 'Thông tin người dùng',
    path: '/u/:userId',
    element: PublicUser,
  },

  {
    label: 'Giao dịch nhà đât',
    path: '/giao-dich-nha-dat',
    element: Exchange,
  },

  {
    label: 'Trang cá nhân',
    path: '/trang-ca-nhan',
    element: Account,
    children: [
      {
        label: 'Thay đổi thông tin cá nhân',
        path: '',
        element: UpdateAccountInfo,
      },
      {
        label: 'Thay đổi password',
        path: 'doi-mat-khau',
        element: ChangePassword,
      },
      {
        label: 'Danh sách thông báo',
        path: 'thong-bao',
        element: AccountNotification,
      },
      {
        label: 'Đăng ký môi giới',
        path: 'dang-ki-moi-gioi',
        element: RegisterBroker,
      },

      {
        label: 'Chỉ sửa môi giới',
        path: 'sua-thong-tin-moi-gioi',
        element: EditBroker,
      },
    ],
  },

  {
    label: 'Quản lý tin',
    path: '/quan-ly-tin',
    element: PostManage,
    children: [
      {
        label: 'Thêm tin',
        path: 'dang-tin',
        element: AddNewNhaDat,
      },
      {
        label: 'Danh sách tin',
        path: 'danh-sach-tin',
        element: PostLitsManage,
      },
      {
        label: 'Sữa tin',
        path: 'sua-tin',
        element: UpdateNhaDat,
      },
    ],
  },

  {
    label: 'Quản lý tin',
    path: '/quan-ly-giao-dich',
    element: ExchangeManage,
    children: [
      {
        label: 'Danh sách đơn của bạn',
        path: 'don-cua-ban',
        element: YourExchange,
      },
      {
        label: 'danh sách yêu cầu mua - thuê của bạn',
        path: 'yeu-cau',
        element: RequestExchange,
      },

      {
        label: 'Chi tiết giao dịch',
        path: 'chi-tiet/:exchangeId',
        element: ExchangeDetail,
      },
    ],
  },

  {
    label: 'Danh sách môi giới',
    path: '/danh-sach-moi-gioi',
    element: Brokers,
  },

  {
    label: 'Chi tiết nhà môi giới',
    path: '/chi-tiet-moi-gioi/:brokerId',
    element: BrokerDetail,
  },

  {
    label: 'Danh sách nhà đất',
    path: '/ban',
    element: Posts,
  },

  {
    label: 'Danh sách nhà đất',
    path: '/cho-thue',
    element: Posts,
  },

  {
    label: 'Danh sách nhà đất bán',
    path: '/ban/:type',
    element: Posts,
  },

  {
    label: 'Danh sách nhà đất thuê',
    path: '/cho-thue/:type',
    element: Posts,
  },

  {
    label: 'Tìm kiếm nhà đất',
    path: '/tim-kiem',
    element: Search,
  },

  {
    label: 'Tạo lại mật khẩu',
    path: '/tao-mat-khau',
    element: ResetPassword,
  },

  // ------------- Mobile page
  {
    label: 'Trang đăng nhập',
    path: '/trang-dang-nhap',
    element: SignIn,
  },

  {
    label: 'Trang đăng ký',
    path: '/trang-dang-ky',
    element: SignUp,
  },

  {
    label: 'Trang quân mât khẩu',
    path: '/trang-quen-mat-khau',
    element: ForgetPassword,
  },

  // ----------- Mobile Page

  {
    label: 'Not Fount',
    path: '*',
    element: PageNotFound,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) =>
        route.children && route.children.length > 0 ? (
          <Route path={route.path} element={<route.element />} key={index}>
            {route.children.map((subRoute) => (
              <Route
                path={subRoute.path}
                element={<subRoute.element />}
                key={subRoute.path}
              />
            ))}
          </Route>
        ) : (
          <Route path={route.path} element={<route.element />} key={index} />
        )
      )}
    </Routes>
  );
};

export default AppRoutes;
