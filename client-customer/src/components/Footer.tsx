import React from 'react';
import { BsTelephoneOutboundFill } from 'react-icons/bs';
import { FaHeadphones, FaUserNurse } from 'react-icons/fa';
import { FiPhoneCall } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { ReactComponent as Logo } from '../assets/img/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-[#f2f2f2]">
      <div className="h-10 bg-white"></div>
      <div className="container max-w-7xl mx-auto">
        <div className="flex mt-8 mb-4 justify-between flex-col lg:flex-row">
          <div>
            <Logo className="w-52 h-20  mx-auto" />
          </div>

          <div className="flex items-center justify-center flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <div className="flex gap-4 items-center">
              <BsTelephoneOutboundFill className="text-2xl" />
              <div>
                <p className="text-14 text-text-secondary">Hotline</p>
                <p className="text-16 font-medium text-text-primary">
                  19009198
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <FaUserNurse className="text-2xl" />
              <div>
                <p className="text-14 text-text-secondary">Hỗ trợ khách hàng</p>
                <p className="text-16 font-medium text-text-primary">
                  trogiup.batdongsanvn.fun
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <FaHeadphones className="text-2xl" />
              <div>
                <p className="text-14 text-text-secondary">
                  Chăm sóc khách hàng
                </p>
                <p className="text-16 font-medium text-text-primary">
                  hotro@batdongsanvn.fun
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex mt-4 justify-between">
          <div className="font-medium">
            <h1>CÔNG TY CỔ PHẦN BATDONGSANVN</h1>

            <div className="flex gap-3 items-center py-2">
              <MdLocationOn className="text-xl" />
              <p>Tầng 81, Lankmark 81, Bình Thạnh, Hồ Chí Minh</p>
            </div>

            <div className="flex gap-3 items-center py-2">
              <FiPhoneCall className="text-xl" />
              <p>0129382354 - 029736192</p>
            </div>
          </div>

          <div className="flex gap-24 pr-4">
            <div>
              <h3 className="font-medium tracking-wide">HƯỚNG DẪN</h3>
              <ul className="flex flex-col gap-1 mt-2 text-14">
                <li>Báo cáo & hỗ trợ</li>
                <li>Câu hỏi thường gặp</li>
                <li>Thông báo</li>
                <li>Liên hệ</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium tracking-wide">QUY ĐỊNH</h3>
              <ul className="flex flex-col gap-1 mt-2 text-14">
                <li>Quy định đăng tin</li>
                <li>Quy chế hoạt động</li>
                <li>Điều khoản thỏa thuận</li>
                <li>Chính sách bảo mật</li>
                <li>Giải quyết khiếu nại</li>
                <li>Góp ý báo lỗi</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 pb-2 text-center text-12">
          Copyright © 2007 - 2023 Batdongsanvn.fun
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
