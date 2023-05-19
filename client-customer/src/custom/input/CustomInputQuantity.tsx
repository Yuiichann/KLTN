import { useField } from 'formik';
import React from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

interface Props {
  label: string;
  type: string;
  name: string;
}

const CustomInputQuantity = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);

  const handleIncre = () => {
    field.value += 1;
  };

  const handleDecre = () => {
    if (field.value === 0) return;

    field.value -= 1;
  };

  return (
    <div className="flex items-center justify-between">
      <span className="font-medium">{label}</span>

      <div className="flex items-center gap-1">
        <div
          onClick={handleDecre}
          className="w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer"
        >
          <IoMdRemove />
        </div>
        <input
          {...props}
          {...field}
          className="w-14 py-1 px-2 outline-none border rounded-md text-center"
        />
        <div
          onClick={handleIncre}
          className="w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer"
        >
          <IoMdAdd />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomInputQuantity);
