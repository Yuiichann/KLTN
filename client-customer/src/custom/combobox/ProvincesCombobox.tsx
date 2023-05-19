import React, { memo, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { TbArrowsMoveVertical } from 'react-icons/tb';
import ProvincesList from '../../constants/provinces.json';
import { Transition, Combobox } from '@headlessui/react';
import { IProvince } from '../../types/nhaDat.types';

interface Props {
  province: IProvince;
  setProvince: React.Dispatch<React.SetStateAction<IProvince>>;
}

const ProvincesCombobox = ({ province, setProvince }: Props) => {
  const [query, setQuery] = useState('');

  const filterProvince =
    query === ''
      ? ProvincesList
      : ProvincesList.filter((prov: IProvince) =>
          prov.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="flex-1 w-full">
      <label htmlFor="" className="mb-2 block font-medium">
        Tỉnh/Thành phố <span className="text-red-500">*</span>
      </label>

      <div>
        <Combobox value={province} onChange={setProvince}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(prov: any) => prov.name}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <TbArrowsMoveVertical
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filterProvince.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filterProvince.map((prov) => (
                    <Combobox.Option
                      key={prov.codename}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={prov}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {prov.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-teal-600'
                              }`}
                            >
                              <MdCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default memo(ProvincesCombobox);
