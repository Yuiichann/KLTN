import { Listbox, Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { loai_nha_dat_ban, loai_nha_dat_thue } from '../constants/Type_NhaDat';
import { ITypeNhaDat } from '../types/nhaDat.types';

interface Props {
  demand_type: 'buy' | 'lease';
  typeNhaDat: ITypeNhaDat;
  handleSetTypeNhaDat: React.Dispatch<React.SetStateAction<ITypeNhaDat>>;
}

interface IListNhaDat {
  id: string;
  label: string;
}

const SelectTypeNhaDat = (props: Props) => {
  const { demand_type, handleSetTypeNhaDat, typeNhaDat } = props;
  const [listNhaDat, setListNhaDat] = useState<IListNhaDat[]>();

  // dựa vào demand_type thì mới render các loại đất khác nhau
  useEffect(() => {
    if (demand_type === 'buy') {
      setListNhaDat(loai_nha_dat_ban);
    } else {
      setListNhaDat(loai_nha_dat_thue);
    }
  }, [demand_type]);

  return (
    <Listbox value={typeNhaDat} onChange={handleSetTypeNhaDat}>
      <div className="relative mt-1 border rounded-md">
        {/* button */}
        <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {typeNhaDat ? typeNhaDat.label : '---Chọn loại bất động sản---'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-2xl cursor-pointer">
            <MdOutlineKeyboardArrowDown />
          </span>
        </Listbox.Button>

        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-w-1 scrollbar-thumb-rounded-md scrollbar-thumb-text-tertiary">
            {listNhaDat &&
              listNhaDat.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <AiOutlineCheck
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default React.memo(SelectTypeNhaDat);
