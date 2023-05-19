import { useField } from 'formik';
import { memo, useState } from 'react';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineWarning,
} from 'react-icons/ai';

interface Props {
  label: string;
  id: string;
  placeholder: string;
  name: string;
}

const CustomPasswordWithLabel = ({ label, ...props }: Props) => {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [field, meta] = useField(props);

  return (
    <>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor={props.id} className="text-16">
          {label}
        </label>

        <div
          className={`flex items-center gap-4 px-3 p-2 bg-white border rounded-md shadow-sm effect ${
            meta.error && meta.touched
              ? 'border-red-500'
              : 'focus-within:border-black'
          }`}
        >
          <input
            type={isShowPwd ? 'text' : 'password'}
            {...props}
            {...field}
            className="outline-none border-none flex-1"
            autoComplete="on"
          />

          {meta.error && meta.touched && (
            <AiOutlineWarning className="text-xl text-red-500" />
          )}

          <div
            onClick={() => setIsShowPwd(!isShowPwd)}
            className="cursor-pointer text-2xl text-text-secondary px-1"
          >
            {isShowPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>

        {meta.error && meta.touched && (
          <span className="text-14 text-red-500 ">{meta.error}</span>
        )}
      </div>
    </>
  );
};

export default memo(CustomPasswordWithLabel);
