import { Form, Formik, FormikHelpers } from 'formik';
import { memo, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import authApi from '../../api/modules/auth.api';
import { setUser } from '../../redux/features/user.slice';
import { AppDispath } from '../../redux/store';
import { signUpSchema } from '../../schema/yup.schema';
import CustomCheckboxGender from '../input/CustomCheckboxGender';
import CustomInputWithLabel from '../input/CustomInputWithLabel';
import CustomPasswordWithLabel from '../input/CustomPasswordWithLabel';

interface IFormSignUp {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  displayName: string;
  phone_number: string;
  gender: 'male' | 'female';
  address: string;
}

const initialValues: IFormSignUp = {
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone_number: '',
  displayName: '',
  gender: 'male',
  address: '',
};

interface Props {
  handleCloseModal: VoidFunction;
}

const FormSignUp = (props: Props) => {
  const dispath = useDispatch<AppDispath>();
  const [error, setError] = useState<string>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleSignUp = async (values: IFormSignUp, actions: FormikHelpers<IFormSignUp>) => {
    const { confirmPassword, ...formData } = values;
    setIsLoadingSubmit(true);

    const { response, error } = await authApi.signUp(formData);

    if (error && error.message) {
      setError(error.message);
      actions.setFieldTouched('password', false);
      actions.setFieldTouched('confirmPassword', false);
      actions.setValues({ ...formData, password: '', confirmPassword: '' });

      // loading false
      setIsLoadingSubmit(false);
    } else {
      setError(undefined);

      const { accessToken, ...userInfo } = response?.data;

      localStorage.setItem('actkn', accessToken);

      dispath(setUser(userInfo));
      toast.success('Đăng ký thành công!!!');
      props.handleCloseModal();
    }
  };

  return (
    <div className="font-lexend">
      <Formik initialValues={initialValues} onSubmit={handleSignUp} validationSchema={signUpSchema}>
        {(formikProps) => (
          <Form autoComplete="off">
            <CustomInputWithLabel
              type="text"
              name="username"
              id="username"
              label="Tên tài khoản"
              autoCapitalize={true}
              placeholder="VD: batdongsanvn1705, ..."
            />

            <CustomPasswordWithLabel label="Mật khẩu" placeholder="Nhập password ..." id="pwd" name="password" />

            <CustomPasswordWithLabel
              label="Xác nhận mật khẩu"
              placeholder="Xác nhận Password..."
              id="confirm_pwd"
              name="confirmPassword"
            />

            <CustomInputWithLabel
              type="text"
              name="email"
              id="email"
              label="Email"
              placeholder="VD: batdongsanvn@gmail.com, ..."
            />

            <CustomInputWithLabel
              type="text"
              name="displayName"
              id="displayName"
              label="Tên đầy đủ"
              placeholder="VD: Phàm Trần, ..."
            />

            <CustomInputWithLabel
              type="text"
              name="phone_number"
              id="phone_number"
              label="Số điện thoại"
              placeholder="VD: 0944821102"
            />

            <CustomCheckboxGender />

            <CustomInputWithLabel
              type="text"
              name="address"
              id="address"
              label="Địa chỉ"
              placeholder="VD: Quận 7, TP.Hồ Chí Minh, ..."
            />

            {isLoadingSubmit ? (
              <button className="btn btn-primary btn-full">
                <div className="font-medium text-xl flex items-center justify-center">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
              </button>
            ) : (
              <input type="submit" value="Đăng Ký" className="btn btn-primary btn-full" />
            )}

            {error && <p className="my-2 text-red-500 text-14 text-center">{error}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(FormSignUp);
