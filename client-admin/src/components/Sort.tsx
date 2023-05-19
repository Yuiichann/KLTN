import { Listbox, Transition } from '@headlessui/react';
import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
  currentItem: {
    label: string;
    value: string;
  };

  setItem: (val: any) => void;

  options: { label: string; value: string }[];

  label?: string;
}

const Sort = ({ currentItem, options, setItem, label }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {label && <b>{label}</b>}
      <Listbox value={currentItem} onChange={setItem}>
        <div className="relative">
          <Listbox.Button className="flex items-center min-w-[150px] justify-between gap-4 pl-4 pr-2 py-2 border border-primary rounded-md bg-primary text-white">
            <span>{currentItem.label}</span>
            <MdKeyboardArrowDown className="text-xl" />
          </Listbox.Button>

          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute rounded-b-md overflow-hidden w-full mt-1 top-full left-0 bg-white shadow-md z-10">
              {options.map((opt, index) => (
                <Listbox.Option key={index} value={opt}>
                  {({ selected }) => (
                    <button
                      className={`pl-4 py-2 w-full hover:bg-overlay text-left ${
                        selected ? 'text-red-500' : ''
                      }`}
                    >
                      {opt.label}
                    </button>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Sort;
