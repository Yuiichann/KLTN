import { Listbox, Transition } from '@headlessui/react';
import { memo } from 'react';
import { BsSortDown } from 'react-icons/bs';
import { HiCheck } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
  exchangeElapsedSortOptions,
  exchangeSortOptions,
  sortOptions,
} from '../constants/filterPost.constants';
import { ISort } from '../types/nhaDat.types';

interface Props {
  sort: ISort;
  setSort: React.Dispatch<React.SetStateAction<ISort>>;
  isExchangeSort?: boolean;
  isElapsedSort?: boolean;
}

// isExchangeSort và isElapsedSort để lấy các biến ra sort mặc định là sort của postList

const SortSelect = ({
  sort,
  setSort,
  isExchangeSort,
  isElapsedSort,
}: Props) => {
  return (
    <div className="w-[170px]">
      <Listbox value={sort} onChange={setSort}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full flex items-center gap-1 cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <BsSortDown className="min-w-[15px] font-medium" />
            <span className="block truncate">{sort.label}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <MdKeyboardArrowDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 right-0 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {isExchangeSort
                ? exchangeSortOptions.map((opt, optIdx) => (
                    <Listbox.Option
                      key={optIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={opt}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {opt.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                : isElapsedSort
                ? exchangeElapsedSortOptions.map((opt, optIdx) => (
                    <Listbox.Option
                      key={optIdx}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={opt}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {opt.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                : sortOptions.map((opt, optIdx) => (
                    <Listbox.Option
                      key={optIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={opt}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {opt.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <HiCheck className="h-5 w-5" aria-hidden="true" />
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
    </div>
  );
};

export default memo(SortSelect);
