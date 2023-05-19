import { Listbox, Transition } from '@headlessui/react';
import { memo, useCallback, useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import { MdOutlineCheck, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IOptionsNhaDat, IPhapLy, ITypeNhaDat, IUtillitiesOpts } from '../types/nhaDat.types';

interface IResponseUpdate {
  floors: number;
  toilets: number;
  bedrooms: number;
  phapLy: IPhapLy['value'];
  utils: IUtillitiesOpts['value'];
  homeDirection: string;
}

interface Props {
  type_nha_dat: ITypeNhaDat;
  setOptions: React.Dispatch<React.SetStateAction<IOptionsNhaDat>>;
  responseUpdate?: IResponseUpdate;
}

const OptionsNotShowToilet_Bedroom_Flooer = ['dat', 'dat_nen_du_an', 'trang_trai'];
const OptionsNotShowChooseFloor = ['condohel', 'kho_nha_xuong', 'can_ho_chung_cu'];

const utillitiesOpts: IUtillitiesOpts[] = [
  {
    value: 'full',
    label: 'Đầy đủ',
  },
  {
    value: 'basic',
    label: 'Cơ bản',
  },
  {
    value: 'none',
    label: 'Không nội thất',
  },
];

const phapLyOpts: IPhapLy[] = [
  {
    value: 'so_do',
    label: 'Sổ hồng/Sổ đỏ',
  },
  {
    value: 'hop_dong',
    label: 'Hợp đồng mua bán',
  },
  {
    value: 'dang_cho_so',
    label: 'Đang chờ sổ',
  },
  {
    value: 'other',
    label: 'Khác',
  },
];

const homeDirectionOpts = [
  { id: 'none', value: 'Không' },
  { id: 'dong', value: 'Đông' },
  { id: 'tay', value: 'Tây' },
  { id: 'nam', value: 'Nam' },
  { id: 'bac', value: 'Bắc' },
  { id: 'tay-bac', value: 'Tây bắc' },
  { id: 'dong-bac', value: 'Đông bắc' },
  { id: 'tay-nam', value: 'Tây nam' },
  { id: 'dong-nam', value: 'Đông nam' },
];

// lấy ra object hướng nhà theo giá trị của nó
// thực hiện khi update tin nhà đât
function chooseDirectionWhenUpdate(value: string) {
  const current = homeDirectionOpts.find((item) => item.id === value);

  return current ? current : { id: 'none', value: '--Chọn--' };
}

const NhaDatOptions = (props: Props) => {
  const { setOptions, type_nha_dat, responseUpdate } = props;

  const [numToilets, setNumtoilet] = useState(() => (responseUpdate ? responseUpdate.toilets : 0));

  const [numBedrooms, setNumBedrooms] = useState(() => (responseUpdate ? responseUpdate.bedrooms : 0));

  const [phapLy, setPhapLy] = useState<IPhapLy['value']>(() => (responseUpdate ? responseUpdate.phapLy : 'other'));
  const [util, setUtil] = useState<IUtillitiesOpts['value']>(() => (responseUpdate ? responseUpdate.utils : 'none'));
  const [numFloors, setNumFloors] = useState(() => (responseUpdate ? responseUpdate.floors : 0));
  const [homeDirection, setHomeDirection] = useState(() =>
    responseUpdate
      ? chooseDirectionWhenUpdate(responseUpdate.homeDirection)
      : {
          id: 'none',
          value: '--Chọn--',
        }
  );

  const handleIncrementToilet = useCallback(() => {
    setNumtoilet(numToilets + 1);
  }, [numToilets]);

  const handleDecrementToilet = useCallback(() => {
    if (numToilets === 0) return;

    setNumtoilet(numToilets - 1);
  }, [numToilets]);

  const handleIncrementFloor = useCallback(() => {
    setNumFloors(numFloors + 1);
  }, [numFloors]);

  const handleDecrementFloor = useCallback(() => {
    if (numFloors === 0) return;

    setNumFloors(numFloors - 1);
  }, [numFloors]);

  const handleIncrementBedroom = useCallback(() => {
    setNumBedrooms(numBedrooms + 1);
  }, [numBedrooms]);

  const handleDecrementBedroom = useCallback(() => {
    if (numBedrooms === 0) return;

    setNumBedrooms(numBedrooms - 1);
  }, [numBedrooms]);

  //   update thong tinh where có sự thay đổi
  useEffect(() => {
    const updateOpts = setTimeout(() => {
      setOptions({
        num_bedrooms: numBedrooms,
        num_toilets: numToilets,
        num_floors: numFloors,
        home_direction: homeDirection.id,
        legal: phapLy,
        utillities: util,
      });
    }, 400);

    return () => clearTimeout(updateOpts);
  }, [numToilets, numBedrooms, numFloors, phapLy, homeDirection, util, setOptions]);

  useEffect(() => {
    // if (type_nha_dat.id === 'dat' || type_nha_dat.id === 'dat_nen_du_an' || type_nha_dat.id === 'trang_trai') {
    if (OptionsNotShowToilet_Bedroom_Flooer.includes(type_nha_dat.id)) {
      setNumtoilet(0);
      setNumBedrooms(0);
      setNumFloors(0);
      setUtil('none');
    }

    // if (type_nha_dat.id === 'can_ho_chung_cu' || type_nha_dat.id === 'condohel' || type_nha_dat.id === 'kho_nha_xuong') {
    if (OptionsNotShowChooseFloor.includes(type_nha_dat.id)) {
      setNumFloors(0);
    }

    if (type_nha_dat.id === 'kho_nha_xuong') {
      setNumBedrooms(0);
    }
  }, [type_nha_dat]);

  return type_nha_dat.id !== 'init' ? (
    <div className="flex flex-col gap-4 select-none">
      {/* Phap ly */}
      <div>
        <span className="font-medium">Pháp lý</span>

        <div className="ml-2 flex items-center flex-wrap gap-4 mt-3">
          {phapLyOpts.map((opt) => (
            <div
              key={opt.value}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-text-primary hover:bg-amber-100 cursor-pointer text-14 ${
                phapLy === opt.value ? 'bg-amber-200' : 'bg-secondary'
              }`}
              onClick={() => setPhapLy(opt.value)}
            >
              <span>{opt.label}</span>
              {opt.value === phapLy && <MdOutlineCheck className="text-18 text-green-700" />}
            </div>
          ))}
        </div>
      </div>

      {/* {type_nha_dat.id !== 'dat' && type_nha_dat.id !== 'dat_nen_du_an' */}
      {!OptionsNotShowToilet_Bedroom_Flooer.includes(type_nha_dat.id) ? (
        <>
          {/* utillities */}
          <div>
            <span className="font-medium">Nội thất</span>

            <div className="ml-2 flex items-center gap-4 mt-3">
              {utillitiesOpts.map((opt) => (
                <div
                  key={opt.value}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-text-primary hover:bg-amber-100 cursor-pointer text-14 ${
                    util === opt.value ? 'bg-amber-200' : 'bg-secondary'
                  }`}
                  onClick={() => setUtil(opt.value)}
                >
                  <span>{opt.label}</span>
                  {opt.value === util && <MdOutlineCheck className="text-18 text-green-700" />}
                </div>
              ))}
            </div>
          </div>

          {/* toilet */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Số phòng tắm, nhà vệ sinh</span>
            <div className="flex items-center gap-1">
              <div
                onClick={handleDecrementToilet}
                className={`w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer ${
                  numToilets === 0 ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                <IoMdRemove />
              </div>
              <input
                type="tel"
                name="tel"
                className="w-14 py-1 px-2 outline-none border rounded-md text-center"
                value={numToilets}
                disabled
              />
              <div
                onClick={handleIncrementToilet}
                className="w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
          </div>

          {/* bedroom */}
          {type_nha_dat.id !== 'kho_nha_xuong' && (
            <div className="flex items-center justify-between">
              <span className="font-medium">Số phòng ngủ</span>
              <div className="flex items-center gap-1">
                <div
                  onClick={handleDecrementBedroom}
                  className={`w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer ${
                    numBedrooms === 0 ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  <IoMdRemove />
                </div>
                <input
                  type="tel"
                  name="tel"
                  className="w-14 py-1 px-2 outline-none border rounded-md text-center"
                  value={numBedrooms}
                  disabled
                />
                <div
                  onClick={handleIncrementBedroom}
                  className="w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer"
                >
                  <IoMdAdd />
                </div>
              </div>
            </div>
          )}

          {/* floor */}
          {/* {type_nha_dat.id !== 'can_ho_chung_cu' && type_nha_dat.id !== 'condohel' && type_nha_dat.id !== 'kho_nha_xuong' && ( */}
          {!OptionsNotShowChooseFloor.includes(type_nha_dat.id) && (
            <div className="flex items-center justify-between">
              <span className="font-medium">Số tầng</span>
              <div className="flex items-center gap-1">
                <div
                  onClick={handleDecrementFloor}
                  className={`w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer ${
                    numFloors === 0 ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  <IoMdRemove />
                </div>
                <input
                  type="tel"
                  name="tel"
                  className="w-14 py-1 px-2 outline-none border rounded-md text-center"
                  value={numFloors}
                  disabled
                />
                <div
                  onClick={handleIncrementFloor}
                  className="w-8 h-8 bg-text-secondary text-white rounded-sm flex items-center justify-center text-xl cursor-pointer"
                >
                  <IoMdAdd />
                </div>
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* huong nha */}
      <div>
        <span className="font-medium">Hướng nhà</span>
        <Listbox value={homeDirection} onChange={setHomeDirection}>
          <div className="relative mt-1 border rounded-md">
            {/* button */}
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{homeDirection.value}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-2xl cursor-pointer">
                <MdOutlineKeyboardArrowDown />
              </span>
            </Listbox.Button>

            <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm scrollbar-w-1 scrollbar-thumb-rounded-md scrollbar-thumb-text-tertiary">
                {homeDirectionOpts.map((item, index) => (
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
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.value}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                            <AiOutlineCheck className="h-5 w-5" aria-hidden="true" />
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
    </div>
  ) : (
    <></>
  );
};

export default memo(NhaDatOptions);
