import { Menu, Transition } from '@headlessui/react';
import { memo } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { loai_nha_dat_ban, loai_nha_dat_thue } from '../../constants/Type_NhaDat';

interface Props {
  demandType: 'buy' | 'lease';
  typeNhaDat?: string;
  setTypeNhaDat: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function getLabelTypeNhaDat(type?: string) {
  const NhaDatTypes = [...loai_nha_dat_ban, ...loai_nha_dat_thue];

  const current = NhaDatTypes.find((item) => item.id === type);

  return current ? current.label : 'Loại nhà đất';
}

const SearchDropdown = ({ demandType, typeNhaDat, setTypeNhaDat }: Props) => {
  return (
    <div>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="flex items-center justify-center gap-2 w-[50px] md:w-[160px] lg:w-[180px]">
            <AiOutlineHome className="text-xl min-w-fit" />
            <div className="flex-1 hidden md:block">
              <span className="w-full font-medium line-clamp-1">{getLabelTypeNhaDat(typeNhaDat)}</span>
            </div>
            <MdKeyboardArrowDown className="text-2xl min-w-fit" />
          </Menu.Button>
        </div>

        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
          className="relative z-10"
        >
          <Menu.Items className="absolute top-full mt-4 -left-4 w-[250px] h-[350px] overflow-auto scrollbar-w-1 scrollbar-thumb-text-tertiary bg-white py-2 rounded-md shadow-md">
            {demandType === 'buy'
              ? loai_nha_dat_ban.map((item) => (
                  <Menu.Item key={item.id}>
                    <div
                      className={`relative cursor-pointer px-3 py-2 capitalize hover:bg-[#f0f0f0] ${
                        typeNhaDat === item.id ? 'bg-amber-200 font-medium' : ''
                      }`}
                      onClick={() => setTypeNhaDat(item.id)}
                    >
                      {typeNhaDat === item.id && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2">
                          <HiCheck className="text-xl" />
                        </div>
                      )}
                      <span className="line-clamp-1 pl-5">{item.label.replace('Bán', '')}</span>
                    </div>
                  </Menu.Item>
                ))
              : loai_nha_dat_thue.map((item) => (
                  <Menu.Item key={item.id}>
                    <div
                      className={`relative px-3 py-2 capitalize cursor-pointer hover:bg-[#f0f0f0] ${
                        typeNhaDat === item.id ? 'bg-amber-200 font-medium' : ''
                      }`}
                      onClick={() => setTypeNhaDat(item.id)}
                    >
                      {typeNhaDat === item.id && (
                        <div className="absolute left-2 top-1/2 -translate-y-1/2">
                          <HiCheck className="text-xl" />
                        </div>
                      )}
                      <span className="line-clamp-1 pl-5">{item.label.replace('Cho thuê', '')}</span>
                    </div>
                  </Menu.Item>
                ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default memo(SearchDropdown);
