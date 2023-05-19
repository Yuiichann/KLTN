import { Helmet } from 'react-helmet';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormForgetPassword from '../../custom/form/FormForgetPassword';
import { RootState } from '../../redux/store';

const ForgetPassword = () => {
  const { user, globalLoading } = useSelector((state: RootState) => state);

  if (globalLoading.isGlobalLoading) {
    return <Loading />;
  }

  if (user.user) {
    return <Navigate to="/trang-ca-nhan" />;
  }

  return (
    <section>
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>

      <div className="container">
        <div className="max-w-sm mx-auto mb-48">
          {/* Title */}
          <div className="mt-14">
            <Link
              to="/trang-dang-nhap"
              className="text-text-secondary text-14 mb-2 flex items-center gap-1"
            >
              <HiOutlineArrowSmLeft />
              <span>Quay lại</span>
            </Link>

            <p className="text-text-secondary text-xl font-medium tracking-wide mb-4">
              Quên mật khẩu
            </p>
          </div>

          <FormForgetPassword
            handleSetLoadingModal={() => {}}
            handleCloseModal={() => {}}
          />
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
