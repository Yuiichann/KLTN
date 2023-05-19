import { useField } from 'formik';
import { memo, useState } from 'react';
import { AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

interface Props {
  placeholder: string;
  name: string;
}

const CustomInput = (props: Props) => {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [field, meta] = useField(props);

  return (
    <div
      className={`flex items-center gap-4 py-3 px-3 border rounded-md shadow-sm mt-4 effect ${
        meta.error && meta.touched
          ? 'border-red-500'
          : 'focus-within:border-black'
      }`}
    >
      <AiOutlineLock className="text-2xl" />

      <input
        type={isShowPwd ? 'text' : 'password'}
        {...props}
        {...field}
        className="outline-none border-none flex-1"
        autoComplete="on"
      />

      <div
        onClick={() => setIsShowPwd(!isShowPwd)}
        className="cursor-pointer text-2xl text-text-secondary px-1"
      >
        {isShowPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
      </div>
    </div>
  );
};

export default memo(CustomInput);
