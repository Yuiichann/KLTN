import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/ExchangeManage/Sidebar';
import ProtectedLayout from '../../components/ProtectedLayout';

const ExchangeManage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <ProtectedLayout>
      <section className="bg-secondary mt-1">
        {/* Hemlmet */}
        <Helmet>
          <title>Quản lý giao dịch</title>
        </Helmet>

        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* OUTLET */}
          <div className="flex-grow pb-12">
            <Outlet />
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default ExchangeManage;
