import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { MdError } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import nhaDatApi from '../../api/modules/nhaDat.api';
import config from '../../configs/config';
import { INhaDat } from '../../types/nhaDat.types';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';
import ImageLazyLoading from '../ImageLazyLoading';

interface Props {
  property: INhaDat;
}

const PropertyListItem = ({ property }: Props) => {
  const handleAcceptProperty = () => {
    Swal.fire({
      icon: 'question',
      title: 'Xác nhận',
      text: 'Bạn có chắc duyệt tin này?',
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { response, error } = await nhaDatApi.updateStatus(
          property.id || property._id,
          {
            status: 'approved',
            reason_refuse: '',
          }
        );

        if (error) {
          Swal.fire({
            title: 'Lỗi',
            icon: 'error',
            text: error.message,
          });
        }

        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Duyệt tin thành công!',
          });
        }
      }
    });
  };

  const handleRefuseProperty = () => {
    Swal.fire({
      icon: 'question',
      title: 'Xác nhận',
      text: 'Bạn có chắc từ chối đăng tin này?',
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      preConfirm: (value: string) => {
        if (value.length === 0) {
          Swal.showValidationMessage('Bạn phải nhập lý do từ chối tin!');
        }

        return value;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { response, error } = await nhaDatApi.updateStatus(
          property.id || property._id,
          {
            status: 'refuse',
            reason_refuse: result.value as string,
          }
        );

        if (error) {
          Swal.fire({
            title: 'Lỗi',
            icon: 'error',
            text: error.message,
          });
        }

        if (response) {
          Swal.fire({
            icon: 'success',
            title: 'Thành công',
            text: 'Từ chối tin thành công!',
          });
        }
      }
    });
  };

  return (
    <div className="flex justify-between gap-4 mb-4 bg-white p-5 rounded-sm shadow-md">
      {/* image */}
      <div className="min-w-fit">
        <ImageLazyLoading
          src={property.collections[0]}
          alt={property.slug}
          className="w-[170px] h-[120px] rounded-sm shadow-md object-cover"
        />
      </div>

      {/* info */}
      <div className="text-14 flex-1">
        {/* title */}
        {property.status === 'approved' ? (
          <Tippy content="Xem trên website" animation="fade">
            <Link
              to={`${config.main_website_url}/chi-tiet/${property.slug}`}
              target="_blank"
              className="font-medium text-18 line-clamp-1 tracking-wide hover:opacity-70 cursor-default"
            >
              {property.title}
            </Link>
          </Tippy>
        ) : (
          <Tippy content="Tin chưa được hiển thị" animation="fade">
            <h1 className="font-medium text-18 line-clamp-1 tracking-wide hover:opacity-70 cursor-default">
              {property.title}
            </h1>
          </Tippy>
        )}

        {/* Trạng thái */}
        <div className="flex items-center gap-2 my-2">
          <b>Trạng thái:</b>
          {property.status === 'pending' ? (
            <span className="px-2 text-12 text-white py-1 bg-blue-500">
              Đợi duyệt
            </span>
          ) : property.status === 'approved' ? (
            <span className="px-2 text-12 text-white py-1 bg-green-500">
              Đã duyệt
            </span>
          ) : (
            <span className="px-2 text-12 text-white py-1 bg-red-500">
              Không duyệt
            </span>
          )}

          {/* Nếu bị huyẻ sẽ hiện lý do ở đây */}
          {property.status === 'refuse' && (
            <Tippy
              content={`Lý do: ${property.reason_refuse}`}
              animation="fade"
              hideOnClick={false}
            >
              <button className="flex items-center gap-1 text-red-500">
                <MdError className="text-xl" />
              </button>
            </Tippy>
          )}
        </div>

        {/* nguoi dang -  ngay dang */}
        <div className="flex items-center gap-4">
          {/* Người đăng */}
          <div className="min-w-[200px]">
            <b>Người đăng: </b>
            <Link
              to={`/user/${property.user_id}`}
              className="hover:text-red-500"
            >
              {property.contact.name}
            </Link>
          </div>

          {/* Ngày đăng */}
          <div>
            <b>Ngày đăng: </b>
            <span>{formatTimeUTC7(property.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* button actions */}
      <div className="min-w-[150px] text-14">
        <h3 className="text-center font-semibold text-sidebar">Hành động</h3>

        <div className="mt-2 flex flex-col gap-1">
          {property.status === 'pending' && (
            <>
              <button
                onClick={handleAcceptProperty}
                className="w-full text-center bg-green-500 text-white py-1 rounded-sm hover:bg-opacity-70"
              >
                Duyệt tin
              </button>

              <button
                onClick={handleRefuseProperty}
                className="w-full text-center bg-red-500 text-white py-1 rounded-sm hover:bg-opacity-70"
              >
                Từ chối
              </button>
            </>
          )}

          <Link
            to={`/quan-ly-bat-dong-san/chi-tiet-bds/${property.slug}`}
            className="w-full text-center bg-primary text-white py-1 rounded-sm hover:bg-opacity-70"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(PropertyListItem);
