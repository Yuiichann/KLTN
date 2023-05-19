import { useField } from 'formik';
import { memo, useRef } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import formatPrice from '../../utils/formatPrice';
import formatPriceTV from '../../utils/formatPriceTV';

interface Props {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  name: string;
  note?: string;
  isShowLength?: boolean;
  maxLength?: number;
  autoCapitalize?: boolean;
}

const CustomInputWithLabel = ({ label, note, isShowLength, maxLength, autoCapitalize, ...props }: Props) => {
  const [field, meta] = useField(props);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor={props.id} className="font-medium">
          {label}
          <span className="text-red-500 pl-1">*</span>
        </label>

        <div
          className={`flex items-center gap-3 px-3 p-2 border rounded-md shadow-sm effect ${
            meta.error && meta.touched ? 'border-red-500' : 'focus-within:border-black'
          }`}
        >
          <input
            {...props}
            {...field}
            ref={inputRef}
            autoCapitalize={autoCapitalize ? 'on' : 'off'}
            className="outline-none border-none flex-1 w-px"
          />

          {meta.error && meta.touched && <AiOutlineWarning className="text-xl text-red-500" />}

          {props.name === 'area' && (
            <p className="relative pr-1 text-12 text-text-tertiary">
              m <span className="absolute top-0 -right-1 text-[10px]">2</span>
            </p>
          )}
        </div>

        {/* hiện thị note */}
        {note && !meta.error && <p className="text-12 text-text-secondary">{note}</p>}

        {/* hiển thị giá nếu là trường price - hợp lệ */}
        {props.name === 'price' && !meta.error && field.value && field.value !== 0 && !isNaN(Number(field.value)) ? (
          <div className="flex items-start gap-2 font-medium">
            <p className="text-red-500">Giá:</p>
            <div className="flex flex-col gap-1 text-14 ml-2 text-text-secondary">
              <p>{formatPrice(field.value)}</p>
              {parseInt(field.value) >= 1000000 && <p>{formatPriceTV(field.value)} VNĐ</p>}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* Hiển thị độ dài văn bản */}
        {isShowLength && inputRef.current && inputRef.current.value.length > 0 ? (
          <span className="text-12">
            {inputRef.current?.value.length}/{maxLength}
          </span>
        ) : null}

        {/* hiển thị error */}
        {meta.error && meta.touched && <span className="text-14 text-red-500 break-all">{meta.error}</span>}
      </div>
    </>
  );
};

export default memo(CustomInputWithLabel);
