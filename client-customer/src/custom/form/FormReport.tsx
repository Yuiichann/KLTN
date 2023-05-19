import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import reportApi from '../../api/modules/report.api';
import { RootState } from '../../redux/store';
import { formReportSchema } from '../../schema/yup.schema';
import CustomInputWithLabel from '../input/CustomInputWithLabel';
import CustomTextAreaReport from '../textarea/CustomTextAreaReport';

interface IFormReport {
  fullName: string;
  title: string;
  content: string;
  phone_number: string;
  email: string;
}

let initialValues: IFormReport = {
  fullName: '',
  content: '',
  email: '',
  phone_number: '',
  title: '',
};

interface Props {
  handleCloseModal: VoidFunction;
}

const FormReport = ({ handleCloseModal }: Props) => {
  const location = useLocation();

  const { user } = useSelector((state: RootState) => state.user);

  //   auto fill data
  if (user) {
    initialValues.fullName = user.displayName;
    initialValues.email = user.email;
    initialValues.phone_number = user.phone_number;
  }

  const handleSubmit = async (
    values: IFormReport,
    actions: FormikHelpers<IFormReport>
  ) => {
    const slug = location.pathname.replace('/chi-tiet/', '');

    const { response, error } = await reportApi.createReport({
      ...values,
      post_slug: slug,
    });

    actions.setSubmitting(false);

    if (error) {
      Swal.fire({
        title: 'Lỗi',
        icon: 'error',
        text: error.message,
      });
    }

    if (response) {
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        text: 'Báo cáo của bạn đã được ghi nhận. Chúng tôi sẽ xử lý sớm nhất có thể.',
      });
      handleCloseModal();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formReportSchema}
    >
      {(props) => (
        <Form autoComplete="off">
          <CustomInputWithLabel
            id="fullName"
            label="Họ Tên"
            name="fullName"
            placeholder=""
            type="text"
          />

          <CustomInputWithLabel
            id="email"
            label="Email"
            name="email"
            placeholder=""
            type="text"
          />

          <CustomInputWithLabel
            id="phone_number"
            label="Số điện thoại"
            name="phone_number"
            placeholder=""
            type="text"
          />

          <hr className="my-4" />

          <CustomInputWithLabel
            id="title"
            label="Tiêu đề báo cáo"
            name="title"
            placeholder=""
            type="text"
          />

          <CustomTextAreaReport />

          <input
            type="submit"
            disabled={!props.isValid && props.isSubmitting}
            value="GỬI BÁO CÁO"
            className="btn btn-primary btn-full disabled:opacity-70"
          />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(FormReport);
