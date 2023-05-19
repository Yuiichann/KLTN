import { Form, Formik, FormikHelpers } from 'formik';
import { memo, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { toast } from 'react-toastify';
import userApi from '../../api/modules/user.api';
import CustomInputWithLabel from '../input/CustomInputWithLabel';

interface IFormForget {
  username: string;
}

const initialValues: IFormForget = {
  username: '',
};

interface Props {
  handleSetLoadingModal: (val: boolean) => void;
  handleCloseModal: VoidFunction;
}

const FormForgetPassword = (props: Props) => {
  const [error, setError] = useState<string>();

  const handleSubmit = async (
    values: IFormForget,
    actions: FormikHelpers<IFormForget>
  ) => {
    if (!values.username) {
      setError('Vui lòng nhập tên tài khoản.');
      return;
    }

    // call api here
    props.handleSetLoadingModal(true);

    const { response, error } = await userApi.forgetPassword(values);

    if (error && error.message) {
      setError(error.message);
      props.handleSetLoadingModal(false);
    }

    if (response) {
      setError(undefined);
      const res: any = { ...response };
      toast.success(res.message);
      actions.resetForm();
      props.handleSetLoadingModal(false);
      props.handleCloseModal();
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form autoComplete="off">
          <CustomInputWithLabel
            id="username"
            name="username"
            label="Nhập tên tài khoản"
            placeholder=""
            type="text"
          />

          {error && <span className="text-red-500 text-14">{error}</span>}

          {formikProps.isSubmitting ? (
            <button
              type="button"
              className="btn btn-primary btn-full mt-2 mb-8 flex items-center justify-center"
            >
              <AiOutlineLoading className="text-xl animate-spin" />
            </button>
          ) : (
            <input
              type="submit"
              value="Xác nhận"
              className="btn btn-primary btn-full mt-2 mb-8"
            />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default memo(FormForgetPassword);
