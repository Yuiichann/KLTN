import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import userApi from '../../api/modules/user.api';
import CustomInput from '../../components/Account/CustomInput';
import UploadAvatar from '../../components/Account/UploadAvatar';
import { setUser } from '../../redux/features/user.slice';
import { AppDispath, RootState } from '../../redux/store';
import { updateAccountInfoSchema } from '../../schema/yup.schema';
import { IFormUpdateAccountInfo } from '../../types/api.types';

let initialValues: IFormUpdateAccountInfo = {
  displayName: '',
  address: '',
  gender: 'male',
  phone_number: '',
};

const UpdateAccountInfo = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispath>();

  const handleUpdateAccountInfo = async (values: IFormUpdateAccountInfo, actions: FormikHelpers<IFormUpdateAccountInfo>) => {
    if (!user) return;

    // kiem tra thong tin da co thay doi chua. neu có mới update
    if (
      values.displayName === user.displayName &&
      values.address === user.address &&
      values.gender === user.gender &&
      values.phone_number === user.phone_number
    ) {
      toast.info('Chưa có sự thay đổi đối với thông tin của bạn');
      return;
    }

    const { response, error } = await userApi.updateAccountInfo(values);

    if (error) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: error.message,
      });
    }

    if (response) {
      dispatch(setUser(response.data));
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        text: 'Cập nhật thông tin thành công!',
      });
    }

    actions.setSubmitting(false);
  };

  if (!user) {
    return <Navigate to="/" />;
  } else {
    initialValues.displayName = user.displayName;
    initialValues.address = user.address;
    initialValues.gender = user.gender;
    initialValues.phone_number = user.phone_number;
  }

  return (
    <div className="pb-8 border-b-2">
      <h3 className="uppercase font-roboto pl-3 py-2 text-white font-medium text-14 bg-account-page-main">
        Thay đổi thông tin cá nhân
      </h3>

      {/* Form change Info */}
      <div className="my-4 px-4">
        <Formik initialValues={initialValues} onSubmit={handleUpdateAccountInfo} validationSchema={updateAccountInfoSchema}>
          {(props) => (
            <Form autoComplete="off" className="text-14">
              {/* email */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="displayName" className="min-w-[130px]">
                  Email
                </label>
                <input
                  type="text"
                  value={user.email}
                  disabled={true}
                  className="px-2 py-1 text-14 bg-transparent outline-none border rounded-sm min-w-[267.6px] disabled:opacity-70"
                />
              </div>

              {/* displayname */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="displayName" className="min-w-[130px]">
                  Tên hiển thị
                </label>
                <CustomInput type="text" name="displayName" id="displayName" className="" />
              </div>

              {/* address */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="address" className="min-w-[130px]">
                  Địa chỉ
                </label>
                <CustomInput type="text" name="address" id="address" className="" />
              </div>

              {/* phone number */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="phone_number" className="min-w-[130px]">
                  Số điện thoại
                </label>
                <CustomInput type="text" name="phone_number" id="phone_number" className="" />
              </div>

              {/* gender */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                <label htmlFor="displayName" className="min-w-[130px]">
                  Giới tính
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Field type="radio" id="gender_male" value="male" name="gender" />
                    <label htmlFor="gender_male" className="cursor-pointer">
                      Nam
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <Field type="radio" id="gender_female" value="female" name="gender" />
                    <label htmlFor="gender_female" className="cursor-pointer">
                      Nữ
                    </label>
                  </div>
                </div>
              </div>

              {/* button */}
              <div className="flex justify-center mt-8">
                <input
                  type="submit"
                  value={props.isSubmitting ? 'Đang xử lý...' : 'Xác nhận'}
                  disabled={props.isSubmitting || !props.isValid}
                  className="cursor-pointer bg-account-page-main px-6 rounded-sm py-2 text-14 text-white uppercase hover:bg-opacity-70 disabled:opacity-60"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className="my-4 h-[1px] bg-account-page-main" />

      <h3 className="uppercase font-roboto pl-3 py-2 text-white font-medium text-14 bg-account-page-main">Đổi ảnh đại diện</h3>

      <div className="my-4 px-4">
        <UploadAvatar />
      </div>
    </div>
  );
};

export default UpdateAccountInfo;
