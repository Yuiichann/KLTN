import Tippy from '@tippyjs/react';
import { useField } from 'formik';
import React, { useState } from 'react';
import { BiErrorCircle, BiHide, BiShow } from 'react-icons/bi';

interface Props {
  name: string;
  id: string;
  className: string;
}

const CustomPassword = ({ className, ...props }: Props) => {
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [field, meta] = useField({ ...props, type: 'password' });

  return (
    <>
      <div
        className={`flex items-center gap-3 px-2 py-1 border border-account-page-mains ${
          meta.error && meta.touched ? 'border-red-500' : ''
        }`}
      >
        <input
          type={isShowPwd ? 'text' : 'password'}
          {...props}
          {...field}
          className={`bg-transparent flex-1 text-14 outline-none ${className}`}
          autoComplete="on"
        />
        <button
          type="button"
          className={`text-16 p-1 hover:text-red-500 ${
            meta.error && meta.touched ? 'text-red-500' : ''
          }`}
          onClick={() => setIsShowPwd(!isShowPwd)}
        >
          {isShowPwd ? <BiShow /> : <BiHide />}
        </button>
      </div>

      {meta.error && meta.touched && (
        <Tippy content={meta.error} animation="fade">
          <button type="button">
            <BiErrorCircle className="text-18 text-red-500 hover:text-red-300 effect" />
          </button>
        </Tippy>
      )}
    </>
  );
};

export default React.memo(CustomPassword);
