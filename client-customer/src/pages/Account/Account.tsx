import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useLocation } from 'react-router-dom';
import AccountSidebar from '../../components/Account/AccountSidebar';
import ProtectedLayout from '../../components/ProtectedLayout';

const Account = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ProtectedLayout>
      <section className="mt-12 mb-24">
        {/* helmet */}
        <Helmet>
          <title>Trang cá nhân</title>
        </Helmet>

        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto">
            {/* sidebar */}
            <AccountSidebar />

            {/* main  */}
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </ProtectedLayout>
  );
};

export default Account;
