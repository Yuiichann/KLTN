import { useField } from 'formik';
import React from 'react';

const CustomTextarea = () => {
  const [field, meta] = useField({ name: 'content', type: 'textarea' });

  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor="content" className="font-medium">
        Mội dung báo cáo<span className="text-red-500 pl-1">*</span>
      </label>

      <textarea
        {...field}
        name="content"
        id="content"
        rows={10}
        className={`border outline-none rounded-md p-2 ${
          meta.error && meta.touched
            ? 'border-red-500'
            : 'focus-within:border-black'
        }`}
      ></textarea>

      {!meta.error && (
        <p className="text-12">Tổi thiểu 30 kí tự, tối đa 3000 kí tự.</p>
      )}

      {meta.error && meta.touched && (
        <p className="text-14 text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default React.memo(CustomTextarea);
