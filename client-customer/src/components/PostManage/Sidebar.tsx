import { memo } from 'react';
import { AiFillTrademarkCircle, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-white pr-1 min-w-[230px] min-h-screen border-r-2 hidden lg:block">
      <div className="sticky top-0 left-0 pt-4">
        <h2 className="text-xl text-center font-semibold tracking-wider my-4 ">
          Quản lý
        </h2>

        <div>
          {/* list */}
          <div className="flex items-center justify-between py-3 px-2 font-semibold tracking-wide select-none hover:bg-secondary">
            <div className="flex items-center gap-2">
              <AiOutlineUnorderedList />
              <h5>Quản lý tin</h5>
            </div>

            <MdOutlineKeyboardArrowDown className="text-xl" />
          </div>

          {/* list item ul */}
          <ul className="w-full">
            <li>
              <Link
                to="/quan-ly-tin/dang-tin"
                className={`pl-8 py-3 block hover:bg-secondary border-l-2 ${
                  location.pathname === '/quan-ly-tin/dang-tin'
                    ? 'bg-secondary border-l-red-500 font-semibold'
                    : 'border-l-transparent'
                }`}
              >
                Đăng tin
              </Link>
            </li>
            <li>
              <Link
                to="/quan-ly-tin/danh-sach-tin"
                className={`pl-8 py-3 block hover:bg-secondary border-l-2 ${
                  location.pathname === '/quan-ly-tin/danh-sach-tin'
                    ? 'bg-secondary border-l-red-500 font-semibold'
                    : 'border-l-transparent'
                }`}
              >
                Danh sách tin
              </Link>
            </li>

            <li
              className={`${
                location.pathname === '/quan-ly-tin/sua-tin'
                  ? 'pl-8 py-3 block hover:bg-secondary border-l-2 bg-secondary border-l-red-500 font-semibold cursor-default'
                  : 'hidden'
              }`}
            >
              Sửa tin
            </li>
          </ul>

          {/* list */}
          <div className="flex items-center justify-between py-3 px-2 font-semibold tracking-wide select-none hover:bg-secondary">
            <div className="flex items-center gap-2">
              <AiFillTrademarkCircle />
              <h5>Giao dịch</h5>
            </div>

            <MdOutlineKeyboardArrowDown className="text-xl" />
          </div>

          {/* list item ul */}
          <ul className="w-full">
            <li>
              <Link
                to="/quan-ly-giao-dich/don-cua-ban"
                className={`pl-8 py-3 block hover:bg-secondary border-l-2 ${
                  location.pathname === '/quan-ly-giao-dich/don-cua-ban'
                    ? 'bg-secondary border-l-red-500 font-semibold'
                    : 'border-l-transparent'
                }`}
              >
                Đơn của bạn
              </Link>
            </li>
            <li>
              <Link
                to="/quan-ly-giao-dich/yeu-cau"
                className={`pl-8 py-3 block hover:bg-secondary border-l-2 ${
                  location.pathname === '/quan-ly-giao-dich/yeu-cau'
                    ? 'bg-secondary border-l-red-500 font-semibold'
                    : 'border-l-transparent'
                }`}
              >
                Yêu cầu giao dịch
              </Link>
            </li>

            <li
              className={`pl-8 py-3 hover:bg-secondary border-l-2 ${
                location.pathname.includes('/quan-ly-giao-dich/chi-tiet')
                  ? 'bg-secondary border-l-red-500 font-semibold block'
                  : 'border-l-transparent hidden'
              }`}
            >
              Chi tiết GD
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
