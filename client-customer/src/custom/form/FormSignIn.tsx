import { Form, Formik, FormikHelpers } from 'formik';
import { memo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import authApi from '../../api/modules/auth.api';
import { setUser } from '../../redux/features/user.slice';
import { AppDispath } from '../../redux/store';
import { signInSchema } from '../../schema/yup.schema';
import { ISignInData } from '../../types/api.types';
import CustomInput from '../input/CustomInput';
import CustomPassword from '../input/CustomPassword';

const initialValues: ISignInData = {
  username: '',
  password: '',
};

interface Props {
  handleCloseModal: VoidFunction;
  handleSetLoadingModal: (value: boolean) => void;
}

const FormSignIn = (props: Props) => {
  const dispatch = useDispatch<AppDispath>();
  const [error, setError] = useState<string>();

  const handleSignIn = async (
    values: ISignInData,
    actions: FormikHelpers<ISignInData>
  ) => {
    props.handleSetLoadingModal(true);

    const { response, error } = await authApi.signIn(values);

    if (error && error.message) {
      // login fail
      setError(error.message);
      actions.setFieldTouched('password', false);
      actions.setValues({ username: values.username, password: '' });

      // loading false
      props.handleSetLoadingModal(false);
    } else {
      // login success
      setError(undefined);

      const { accessToken, ...userInfo } = response?.data;
      localStorage.setItem('actkn', accessToken); // save accessToken local
      dispatch(setUser(userInfo)); // set info user to redux
      toast.info(`Hello, ${userInfo.displayName}`);

      props.handleCloseModal();
    }
  };

  return (
    <div className="font-lexend">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignIn}
        validationSchema={signInSchema}
      >
        {(formikProps) => (
          <Form>
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              icon="user"
            />

            <CustomPassword placeholder="Password" name="password" />

            <span
              className={`text-14 text-red-500 ${
                error ? 'visible' : 'invisible'
              }`}
            >
              {error}
            </span>

            {formikProps.isSubmitting ? (
              <button
                type="button"
                className="btn btn-primary btn-full mt-6 flex items-center justify-center"
              >
                <AiOutlineLoading className="text-xl animate-spin" />
              </button>
            ) : (
              <input
                type="submit"
                value="Đăng nhập"
                className="btn btn-primary btn-full mt-6"
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default memo(FormSignIn);
