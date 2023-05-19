import { Form, Formik, FormikHelpers } from 'formik';
import Swal from 'sweetalert2';
import userApi from '../../api/modules/user.api';
import CustomPassword from '../../components/Account/CustomPassword';
import { changePwdSchema } from '../../schema/yup.schema';

interface IFormikValueChangePwd {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: IFormikValueChangePwd = {
  confirmNewPassword: '',
  newPassword: '',
  oldPassword: '',
};

const ChangePassword = () => {
  // handle change password
  const handleSubmit = async (
    values: IFormikValueChangePwd,
    actions: FormikHelpers<IFormikValueChangePwd>
  ) => {
    const { response, error } = await userApi.changePassword({
      password: values.oldPassword,
      new_password: values.newPassword,
      confirm_password: values.confirmNewPassword,
    });

    // error
    if (error) {
      actions.setSubmitting(false);
      actions.resetForm();
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: error.message,
      });
      return;
    }

    // success
    if (response) {
      actions.setSubmitting(false);
      actions.resetForm();
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        text: 'Thay đổi mật khẩu thành công!',
      });
      return;
    }
  };

  return (
    <div className="pb-8 border-b-2">
      <h3 className="uppercase font-roboto pl-3 py-2 text-white font-medium text-14 bg-account-page-main">
        Thay đổi Mật khẩu
      </h3>

      {/* form */}
      <div className="my-4 px-4">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={changePwdSchema}
        >
          {(props) => (
            <Form className="text-14" autoComplete="off">
              {/* old */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="oldPwd" className="min-w-[200px]">
                  Nhập mật khẩu hiện tại:
                </label>
                <CustomPassword id="oldPwd" name="oldPassword" className="" />
              </div>

              {/* new */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="newPwd" className="min-w-[200px]">
                  Nhập mật khẩu mới:
                </label>
                <CustomPassword id="newPwd" name="newPassword" className="" />
              </div>

              {/* confirm new */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="confirm" className="min-w-[200px]">
                  Nhập lại mật khẩu mới:
                </label>
                <CustomPassword
                  id="confirm"
                  name="confirmNewPassword"
                  className=""
                />
              </div>

              {/* button */}
              <div className="flex justify-center mt-8">
                <input
                  type="submit"
                  value={props.isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
                  disabled={props.isSubmitting}
                  className="cursor-pointer bg-account-page-main px-6 rounded-sm py-2 text-14 text-white uppercase hover:bg-opacity-70 disabled:opacity-60"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
