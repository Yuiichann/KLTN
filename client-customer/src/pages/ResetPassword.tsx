import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi from '../api/modules/user.api';
import CustomPasswordWithLabel from '../custom/input/CustomPasswordWithLabel';
import { forgetPwdSchema } from '../schema/yup.schema';

interface IFormResetPassword {
  password: string;
  confirmPassword: string;
}

const initialValues: IFormResetPassword = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const [error, setError] = useState<string>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let token = searchParams.get('token');
  let userId = searchParams.get('userId');

  if (!token || !userId) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (
    values: IFormResetPassword,
    actions: FormikHelpers<IFormResetPassword>
  ) => {
    if (!token || !userId) return;

    const { response, error } = await userApi.resetPassword({
      password: values.password,
      token,
      userId,
    });

    if (error && error.message) {
      setError(error.message);
      actions.setSubmitting(false);
    }

    if (response) {
      toast.success(
        'Bạn đã thay đổi mật khẩu thành công. Vui lòng đăng nhập lại.'
      );
      navigate('/trang-dang-nhap', { replace: true });
    }
  };

  return (
    <section className="mt-8 ">
      <div className="px-4 flex items-center justify-center">
        <div className="bg-[#f2f2f2] p-8 lg:p-14 rounded-md shadow-md  md:w-[450px]">
          <h1 className="text-red-500 mb-3 text-center tracking-wide font-medium text-xl">
            Thay đổi mật khẩu
          </h1>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={forgetPwdSchema}
          >
            {(props) => (
              <Form autoComplete="off">
                <CustomPasswordWithLabel
                  id="password"
                  label="Nhập mật khẩu mới"
                  name="password"
                  placeholder=""
                />

                <CustomPasswordWithLabel
                  id="confirmPassword"
                  label="Xác nhận mật khẩu mới"
                  name="confirmPassword"
                  placeholder=""
                />

                {error && <span className="text-red-500 text-14">{error}</span>}

                {props.isSubmitting ? (
                  <button className="btn btn-primary btn-full flex items-center justify-center">
                    <AiOutlineLoading className="text-xl animate-spin" />
                  </button>
                ) : (
                  <input
                    type="submit"
                    value="Xác nhận"
                    className="btn btn-primary btn-full mt-1"
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
