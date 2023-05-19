import { useField } from 'formik';
import React, { useRef } from 'react';

const CustomTextarea = () => {
  const [field, meta] = useField({ name: 'description', type: 'textarea' });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor="description" className="font-medium">
        Mô tả <span className="text-red-500 pl-1">*</span>
      </label>

      <textarea
        {...field}
        name="description"
        id="description"
        rows={10}
        className={`border outline-none rounded-md p-2 ${
          meta.error && meta.touched ? 'border-red-500' : 'focus-within:border-black'
        }`}
        ref={textareaRef}
        placeholder="Nhập mô tả chung về bất động sản. VD: Nhà có ví trí thuận lợi, gần trường học, bệnh viện, ..."
      ></textarea>

      {/* show tong ky tu */}
      {textareaRef.current ? (
        <span className={`text-12 ${textareaRef.current.value.length > 3000 ? 'text-red-500' : ''}`}>
          {textareaRef.current.value.length}/3000
        </span>
      ) : null}

      {/* show error */}
      {meta.error && meta.touched && <p className="text-14 text-red-500">{meta.error}</p>}
    </div>
  );
};

export default React.memo(CustomTextarea);
