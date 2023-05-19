import { Combobox, Transition } from '@headlessui/react';
import React, { memo, useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { TbArrowsMoveVertical } from 'react-icons/tb';
import { IWard } from '../../types/nhaDat.types';

interface Props {
  wardList: IWard[];
  ward: IWard;
  setWard: React.Dispatch<React.SetStateAction<IWard>>;
}

const DistrictsCombobox = ({ wardList, ward, setWard }: Props) => {
  const [query, setQuery] = useState('');

  const filteredWard =
    query === ''
      ? wardList
      : wardList &&
        wardList.filter((district) =>
          district.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="flex-1 w-full">
      <label className="mb-2 block font-medium">
        Phường/Xã <span className="text-red-500">*</span>
      </label>

      <div>
        <Combobox value={ward} onChange={setWard}>
          <div className="relative mt-1">
            <div className="relative w-full cursor-pointer overflow-hidden rounded-md bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 outline-none pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                displayValue={(ward: any) => ward.name}
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
              <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredWard && filteredWard.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredWard &&
                  filteredWard.map((ward) => (
                    <Combobox.Option
                      key={ward.code}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-teal-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={ward}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {ward.name}
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

export default memo(DistrictsCombobox);
