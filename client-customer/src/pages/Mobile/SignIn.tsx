import { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormSignIn from '../../custom/form/FormSignIn';
import { RootState } from '../../redux/store';

const SignIn = () => {
  const { user, globalLoading } = useSelector((state: RootState) => state);

  const handleIsSubmitting = useCallback((value: boolean) => {}, []);

  if (globalLoading.isGlobalLoading) {
    return <Loading />;
  }

  if (user.user) {
    return <Navigate to="/trang-ca-nhan" />;
  }

  return (
    <section className="mt-20">
      <Helmet>
        <title>Đăng nhập - batdongsanvn.fun</title>
      </Helmet>

      <div className="container">
        <div className="max-w-sm mx-auto mb-48">
          {/* Title */}
          <div className="mt-14">
            <p className="text-text-secondary text-18 font-medium tracking-wide mb-2">
              Xin chào bạn
            </p>
            <h4 className="text-2xl md:text-3xl text-text-primary font-semibold tracking-wide mb-6">
              Đăng nhập để tiếp tục
            </h4>
          </div>

          {/* Form */}
          <FormSignIn
            handleCloseModal={() => {}}
            handleSetLoadingModal={handleIsSubmitting}
          />

          {/* Quen mat khau */}
          <div className="mt-2 flex justify-end">
            <Link
              to="/trang-quen-mat-khau"
              className="block text-14 text-red-500 hover:opacity-70"
            >
              Quên mật khẩu ?
            </Link>
          </div>

          <p className="mt-4 text-14">
            Chưa có tài khoản?
            <Link to="/trang-dang-ky" className="ml-1 text-red-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
