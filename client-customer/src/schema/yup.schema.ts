import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  username: yup.string().required('Bắt buộc.'),
  password: yup.string().required('Bắt buộc.'),
});

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, 'Username phải có ít nhất 8 kí tự')
    .matches(/^[a-z0-9_]*$/, 'Chỉ được sử dụng kí tự thường và số.')
    .required('Bắt buộc nhập'),
  password: yup
    .string()
    .min(8, 'Có ít nhất 8 kí tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu phải có ít nhất 1 kí tự hoa, thường, số và đặc biệt.'
    )
    .required('Bắt buộc nhập'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password không trùng khớp')
    .required('Bắt buộc nhập'),
  email: yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
  displayName: yup.string().required('Bắt buộc nhập'),
  phone_number: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    )
    .required('Bắt buộc nhập'),
  gender: yup.string().oneOf(['male', 'female']).required('Bắt buộc nhập'),
  address: yup.string().required('Bắt buộc nhập'),
});

export const createNhaDatSchema = yup.object().shape({
  title: yup
    .string()
    .min(30, 'Tiêu đề chưa đủ 30 kí tự')
    .max(99, 'Tiêu đề vượt quá 99 kí tự')
    .required('Bắt buộc nhập'),
  description: yup
    .string()
    .min(30, 'Mô tả chưa đủ 30 kí tự')
    .max(3000, 'Mô tả vượt quá 3000 kí tự')
    .required('Bắt buộc nhập'),
  area: yup
    .number()
    .min(10, 'Diện tích ít nhất là 10')
    .max(100000, 'Diện tích tối đa là 990000 (99ha)')
    .required('Bắt buộc nhập'),
  price_unit: yup.string().oneOf(['vnd', 'per_area', 'custom']).required(),
  price: yup
    .number()
    .integer('Giá không hợp lệ')
    .min(0, 'Gía trị phải lón hơn 0.')
    .max(99999999999, 'Giá lớn nhất là 99 tỉ')
    .required('Bắt buộc nhập'),
  contact_name: yup.string().required('Bắt buộc nhập'),
  contact_email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Bắt buộc nhập'),
  contact_address: yup.string().required('Bắt buộc nhập'),
  contact_phone: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    )
    .required('Bắt buộc nhập'),
});

export const forgetPwdSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, 'Có ít nhất 8 kí tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu phải có ít nhất 1 kí tự hoa, thường, số và đặc biệt.'
    )
    .required('Bắt buộc nhập'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password không trùng khớp')
    .required('Bắt buộc nhập'),
});

export const changePwdSchema = yup.object().shape({
  oldPassword: yup.string().required('Bắt buộc nhập.'),
  newPassword: yup
    .string()
    .min(8, 'Có ít nhất 8 kí tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Mật khẩu phải có ít nhất 1 kí tự hoa, thường, số và đặc biệt.'
    )
    .required('Bắt buộc nhập'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Password không trùng khớp')
    .required('Bắt buộc nhập'),
});

export const updateAccountInfoSchema = yup.object().shape({
  displayName: yup.string().required('Bắt buộc nhập'),
  phone_number: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    )
    .required('Bắt buộc nhập'),
  gender: yup.string().oneOf(['male', 'female']).required('Bắt buộc nhập'),
  address: yup.string().required('Bắt buộc nhập'),
});

export const formReportSchema = yup.object().shape({
  fullName: yup.string().required('Bắt buộc nhập.'),
  email: yup.string().email('Email không hợp lệ.').required('Bắt buộc nhập.'),
  phone_number: yup
    .string()
    .matches(
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
      'Số điện thoại không hợp lệ'
    )
    .required('Bắt buộc nhập.'),
  title: yup
    .string()
    .min(30, 'Tiêu đề ít nhất có 30 kí tự.')
    .required('Bắt buộc nhập.'),
  content: yup
    .string()
    .min(30, 'Mô tả ít nhất có 30 kí tự.')
    .max(5000, 'Mô tả tối đa 5000 kí tự')
    .required('Bắt buộc nhập.'),
});
