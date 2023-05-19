import Tippy from '@tippyjs/react';
import React, { memo } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface Props {
  phone: string;
}

const HiddenNumber = (props: Props) => {
  const phone = props.phone.substring(0, props.phone.length - 3);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    try {
      navigator.clipboard.writeText(props.phone);
      toast.success('Đã copy vào clipboard.', { autoClose: 500 });
    } catch (error: any) {
      toast.error('Không thể copy trên trình duyệt của bạn.');
    }
  };

  return (
    <Tippy content="Click để copy SĐT" animation="fade">
      <div
        onClick={handleClick}
        className="px-3 cursor-pointer py-1 font-medium flex items-center gap-2 bg-primary border border-red-500 text-white rounded-md hover:bg-opacity-80"
      >
        <BsTelephoneFill />
        <span>{phone} ***</span>
      </div>
    </Tippy>
  );
};

export default memo(HiddenNumber);
