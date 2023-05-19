import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/Layout';
import Charts from '../pages/Charts';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import PropertyDetail from '../pages/PropertyDetail';
import PropertyManage from '../pages/PropertyManage';
import ReportManage from '../pages/ReportManage';
import SignIn from '../pages/SignIn';
import UserDetail from '../pages/UserDetail';
import UserManage from '../pages/UserManage';

interface IRoutesProps {
  label: string;
  path: string;
  element: () => JSX.Element;
  children?: IRoutesProps[];
}

const routes: IRoutesProps[] = [
  {
    label: 'Trang chủ',
    path: '/',
    element: Layout,
    children: [
      {
        label: 'Dashboard',
        path: '',
        element: Dashboard,
      },

      {
        label: 'Thống kế',
        path: 'thong-ke',
        element: Charts,
      },

      // ----------------- quản lý bds
      {
        label: 'Quản lý BDS',
        path: 'quan-ly-bat-dong-san/danh-sach',
        element: PropertyManage,
      },

      {
        label: 'Chi tiết bất đống sản',
        path: 'quan-ly-bat-dong-san/chi-tiet-bds/:slug',
        element: PropertyDetail,
      },

      // ------------------ quản lý reoprt
      {
        label: 'Báo cáo BDS',
        path: 'quan-ly-bat-dong-san/bao-cao',
        element: ReportManage,
      },

      // ----------------- quản lý user
      {
        label: 'Quản lý users',
        path: 'quan-ly-nguoi-dung/danh-sach',
        element: UserManage,
      },

      // ---------- user detal
      {
        label: 'Detail User',
        path: 'user/:userId',
        element: UserDetail,
      },
    ],
  },

  {
    label: 'Đăng nhập',
    path: '/dang-nhap',
    element: SignIn,
  },

  {
    label: 'Not Found',
    path: '*',
    element: NotFound,
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
