import Tippy from '@tippyjs/react';
import { useField } from 'formik';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

interface Props {
  type: string;
  name: string;
  id: string;
  className: string;
}

const CustomInput = ({ className, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className={`flex items-center gap-3 px-2 py-1 border border-account-page-mains ${
          meta.error && meta.touched ? 'border-red-500' : ''
        }`}
      >
        <input
          {...props}
          {...field}
          className={`bg-transparent flex-1 text-14 outline-none min-w-[250px] ${className}`}
        />
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

export default React.memo(CustomInput);
