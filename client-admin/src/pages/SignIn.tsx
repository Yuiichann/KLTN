import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import authApi from '../api/modules/auth.api';
import BackgroundSignin from '../assets/img/bg.jpg';
import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import { context } from '../context/Context';
import { signInSchema } from '../schema/yup.schema';
import { ISignInData } from '../types/api.types';

let initialValues: ISignInData = {
  username: '',
  password: '',
};

const SignIn = () => {
  const { user, setUser } = useContext(context);

  const [isShowPwd, setIsShowPwd] = useState(false);

  const handleSubmit = async (
    values: ISignInData,
    actions: FormikHelpers<ISignInData>
  ) => {
    const { response, error } = await authApi.signIn(values);

    // when error
    if (error) {
      Swal.fire({
        title: 'Đăng nhập không thành công',
        text: error.message,
        icon: 'error',
      });
      actions.setValues({ username: values.username, password: '' });
      actions.setSubmitting(false);
    }

    if (response && response.data) {
      let { accessToken, ...userInfo } = response.data;

      localStorage.setItem('actkn', accessToken);
      setUser(userInfo);

      // alert
      Swal.fire({
        title: 'Chào mừng bạn~',
        icon: 'info',
      });
    }
  };

  useEffect(() => {
    document.title = 'Đăng nhập - Batdongsanvn.fun';

    return () => {
      document.title = 'Quản lý Batdongsanvn.fun';
    };
  }, []);

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-sky-200">
      {/* background */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${BackgroundSignin})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]">
          <Logo className="mx-auto mt-12" />
        </div>
      </div>

      <div className="z-10 bg-sidebar p-8 rounded-sm shadow-md shadow-sidebar w-[370px]">
        <h1 className="text-center mb-4 text-xl text-white">Đăng nhập</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          {(props) => (
            <Form autoComplete="off">
              {/* username */}
              <div className="flex items-center gap-4 px-3 py-2 bg-white rounded-sm mb-3">
                <FaUserAlt className="min-w-[16px] block" />
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="flex-1 outline-none bg-transparent"
                />
              </div>

              {/* password */}
              <div className="flex items-center gap-4 px-3 py-2 bg-white rounded-sm mb-6">
                <FaLock className="min-w-[16px] block" />

                <div className="flex-1 flex items-center gap-1">
                  <Field
                    type={isShowPwd ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="outline-none bg-transparent flex-1"
                  />

                  <button
                    type="button"
                    onClick={() => setIsShowPwd(!isShowPwd)}
                  >
                    {isShowPwd ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-center">
                {props.isSubmitting ? (
                  <AiOutlineLoading3Quarters className="text-2xl animate-spin text-white" />
                ) : (
                  <input
                    type="submit"
                    value="Đăng nhập"
                    className="bg-white px-6 py-2 cursor-pointer hover:bg-hoverSidebar effect rounded-sm"
                  />
                )}
              </div>

              {props.errors && (
                <p className="text-14 text-red-500 text-center mt-4">
                  Vui lòng nhập đủ thông tin!
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
