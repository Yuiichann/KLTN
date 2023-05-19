import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import FormSignUp from '../../custom/form/FormSignUp';
import { RootState } from '../../redux/store';

const SignUp = () => {
  const { user, globalLoading } = useSelector((state: RootState) => state);

  if (globalLoading.isGlobalLoading) {
    return <Loading />;
  }

  if (user.user) {
    return <Navigate to="/trang-ca-nhan" />;
  }

  return (
    <section className="mt-20">
      <Helmet>
        <title>Đăng ký - batdongsanvn.fun</title>
      </Helmet>

      <div className="container">
        <div className="max-w-sm mx-auto mb-48">
          {/* Title */}
          <div className="mt-14">
            <p className="text-text-secondary text-18 font-medium tracking-wide mb-2">
              Xin chào bạn
            </p>
            <h4 className="text-2xl md:text-3xl text-text-primary font-semibold tracking-wide mb-6">
              Đăng ký tài khoản mới
            </h4>
          </div>

          {/* Form */}
          <FormSignUp handleCloseModal={() => {}} />

          {/* quy che */}
          <p className="mt-3 text-12 text-text-tertiary text-center">
            Bằng việc tiếp tục, bạn đồng ý với
            <a href="/#" className="pl-1 text-red-400">
              Điều khoản sử dụng
            </a>
            ,
            <a href="/#" className="pl-1 text-red-400">
              Chính sách bảo mật
            </a>
            ,
            <a href="/#" className="pl-1 text-red-400">
              Quy chế
            </a>
            ,
            <a href="/#" className="pl-1 text-red-400">
              Chính sách của chúng tôi
            </a>
            .
          </p>

          <p className="mt-3 text-14 text-center">
            Bạn đã có tài khoản?
            <Link to="/trang-dang-nhap" className="ml-1 text-red-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
