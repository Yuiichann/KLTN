import { useField } from 'formik';
import { memo } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

interface Props {
  type: string;
  placeholder: string;
  name: string;
  icon?: string;
}

const CustomInput = ({ icon, ...props }: Props) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div
        className={`flex items-center gap-4 py-3 px-3 border rounded-md shadow-sm effect ${
          meta.error && meta.touched ? 'border-red-500' : 'focus-within:border-black'
        }`}
      >
        {icon === 'user' && <AiOutlineUser className="text-2xl" />}
        <input {...props} {...field} className="outline-none border-none flex-1" autoComplete="on" autoCapitalize="off" />
      </div>
    </>
  );
};

export default memo(CustomInput);
