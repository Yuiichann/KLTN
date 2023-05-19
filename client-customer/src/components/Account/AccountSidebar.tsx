import Tippy from '@tippyjs/react';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import { BsDot } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import ImageLazyLoading from '../ImageLazyLoading';
import NoneAvatar from '../NoneAvatar';

const AccountSidebar = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="lg:w-1/4 border">
      <h3 className="uppercase font-roboto text-center py-2 text-white font-medium text-14 bg-account-page-main">
        Trang cá nhân
      </h3>

      {/* avatar -displayname - usename */}
      <div className="flex flex-col items-center justify-center my-6">
        <div>
          {user.avatar ? (
            <ImageLazyLoading
              src={user.avatar}
              alt={user.displayName}
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
          ) : (
            <NoneAvatar
              character={user.displayName.charAt(0)}
              className="w-32 h-32 text-xl bg-transparent border border-black"
              userIcon={true}
            />
          )}
        </div>

        <h2 className="font-medium mt-2 text-center">{user.displayName}</h2>
        <p className="text-text-secondary text-14">@{user.username}</p>
        {user.locked.status ? (
          <Tippy content={`Lý do: ${user.locked.reason}`}>
            <div className="text-red-500 font-medium flex gap-1 items-center justify-center text-14 cursor-pointer">
              <BiErrorCircle />
              <span>Bị khóa</span>
            </div>
          </Tippy>
        ) : null}
      </div>

      {/* Ul quản lý tài khoản cái nhân */}
      <div className="text-14 my-4">
        <h3 className="py-2 text-text-secondary bg-[#f2f2f2] pl-2 font-medium">
          Quản lý thông tin cá nhân
        </h3>

        <ul className="pl-1 mt-2">
          <li>
            <Link
              to="/trang-ca-nhan"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Thay đổi thông tin cá nhân</span>
            </Link>
          </li>

          <li>
            <Link
              to="/trang-ca-nhan/doi-mat-khau"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Thay mật khẩu</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* quản lý môi giới */}
      <div className="text-14 my-4">
        <h3 className="py-2 text-text-secondary bg-[#f2f2f2] pl-2 font-medium">
          Quản lý thông tin môi giới
        </h3>

        <ul className="pl-1 mt-2">
          {!user.isBroker && (
            <li>
              <Link
                to="/trang-ca-nhan/dang-ki-moi-gioi"
                className="flex items-center gap-1 my-1 hover:text-red-400"
              >
                <BsDot className="text-xl" />
                <span>Đăng ký làm môi giới</span>
              </Link>
            </li>
          )}

          {user.isBroker && (
            <li>
              <Link
                to="/trang-ca-nhan/sua-thong-tin-moi-gioi"
                className="flex items-center gap-1 my-1 hover:text-red-400"
              >
                <BsDot className="text-xl" />
                <span>Sữa thông tin môi giới</span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Quản lý tin */}
      <div className="text-14 my-4">
        <h3 className="py-2 text-text-secondary bg-[#f2f2f2] pl-2 font-medium">
          Quản lý tin đăng
        </h3>

        <ul className="pl-1 mt-2">
          <li>
            <Link
              to="/quan-ly-tin/dang-tin"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Thêm tin</span>
            </Link>
          </li>

          <li>
            <Link
              to="/quan-ly-tin/danh-sach-tin"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Danh sách tin đăng</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-14 my-4">
        <h3 className="py-2 text-text-secondary bg-[#f2f2f2] pl-2 font-medium">
          Quản lý giao dịch
        </h3>

        <ul className="pl-1 mt-2">
          <li>
            <Link
              to="/quan-ly-giao-dich/don-cua-ban"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Đơn của bạn</span>
            </Link>
          </li>

          <li>
            <Link
              to="/quan-ly-giao-dich/yeu-cau"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Yêu cầu giao dịch</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Tiện ích */}
      <div className="text-14 my-4">
        <h3 className="py-2 text-text-secondary bg-[#f2f2f2] pl-2 font-medium">
          Tiện ích
        </h3>

        <ul className="pl-1 mt-2">
          <li>
            <Link
              to="/trang-ca-nhan/thong-bao"
              className="flex items-center gap-1 my-1 hover:text-red-400"
            >
              <BsDot className="text-xl" />
              <span>Thông báo</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default React.memo(AccountSidebar);
