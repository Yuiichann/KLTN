import { memo } from 'react';

interface Props {
  currentItem: {
    label: string;
    value: string;
  };

  setItem: (val: any) => void;
  options: {
    label: string;
    value: string;
  }[];
}

const ChooseStatus = ({ currentItem, options, setItem }: Props) => {
  return (
    <div className="flex items-center gap-6 ">
      <b>Trạng thái:</b>
      <div className="flex items-center gap-4">
        {options.map((item, index) => (
          <div className="flex items-center gap-1" key={index}>
            <input
              type="radio"
              name="status"
              id={`opt${index}`}
              checked={item.value === currentItem.value}
              onChange={() => setItem(item)}
            />
            <label htmlFor={`opt${index}`}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ChooseStatus);
