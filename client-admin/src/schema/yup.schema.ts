import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
