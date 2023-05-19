import { memo } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import exchangeApi from '../../api/modules/exchange.api';
import { RootState } from '../../redux/store';
import { IExchange } from '../../types/exchange.types';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';
import getTypeNhaDatLabel from '../../utils/getTypeNhaDatLabel';
import ImageLazyLoading from '../ImageLazyLoading';

interface Props {
  exchange: IExchange;
  handleReload: VoidFunction;
}

const ExchangeListItemBuy = ({ exchange, handleReload }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  // xử lý cancel Exchange
  const handleCancelExchange = () => {
    if (user?.locked.status) {
      toast.error('Không thực hiện được do tài khoản của bạn đã bị khóa!');
      return;
    }

    Swal.fire({
      title: 'Xác nhận hủy giao dịch',
      icon: 'question',
      text: 'Vui lòng nhập lý do vào bên dưới:',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: true,
      preConfirm: (value: string) => {
        if (value.length === 0) {
          Swal.showValidationMessage(`Bắt buộc nhập lý do hủy giao dịch`);
        }

        if (value.length > 300) {
          Swal.showValidationMessage('Chỉ nhập tối đa 300 kí tự!');
        }

        return value;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { response, error } = await exchangeApi.cancelExchange(
          exchange.id,
          result.value as string
        );
        if (error) {
          Swal.fire({
            title: 'Lỗi',
            icon: 'error',
            text: 'Vui lòng thử lại.',
          });
        }
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Bạn đã hủy thành công giao dịch',
            showConfirmButton: false,
            timer: 1500,
          });
          handleReload();
        }
      }
    });
  };

  return exchange.property ? (
    <div className="bg-white p-4 my-6 rounded-md shadow-md flex gap-4 flex-col lg:flex-row relative">
      <div className="self-center lg:self-auto">
        <ImageLazyLoading
          src={exchange.property.collections[0]}
          alt={exchange.property.slug}
          className="w-[170px] h-[130px] object-cover rounded-md shadow-md"
        />
      </div>

      {/* info */}
      <div className="flex-1">
        {/* Tên bài giao dịch */}
        <Link
          to={`/chi-tiet/${exchange.property.slug}`}
          className="w-fit text-18 font-medium tracking-wide line-clamp-1 hover:text-red-500 effect"
        >
          {exchange.property.title}
        </Link>

        {/* status */}
        <div className="flex items-center gap-3 text-14 text-text-secondary mt-1">
          <b>Trạng thái giao dịch: </b>
          {exchange.status === 'pending' ? (
            <span className="block min-w-[100px] py-1 px-4 bg-blue-500 text-center text-white">
              Đang tiến hành
            </span>
          ) : exchange.status === 'cancel_by_buyer' ? (
            <span className="block min-w-[100px] py-1 px-4 bg-red-500 text-center text-white">
              Hủy bởi người{' '}
              {exchange.property.demand === 'buy' ? 'mua' : 'thuê'}
            </span>
          ) : exchange.status === 'cancel_by_seller' ? (
            <span className="block min-w-[100px] py-1 px-4 bg-red-500 text-center text-white">
              Hủy bởi người{' '}
              {exchange.property.demand === 'buy' ? 'bán' : 'cho thuê'}
            </span>
          ) : (
            <span className="block min-w-[100px] py-1 px-4 bg-green-500 text-center text-white">
              Thành công
            </span>
          )}
        </div>

        {/* Loại giao dịch */}
        <p className="mt-1 text-text-secondary text-14">
          <b>Loại giao dịch:</b>{' '}
          {exchange.property.demand === 'buy' ? 'Mua' : 'Thuê'}{' '}
          {getTypeNhaDatLabel(exchange.property.type_nhadat)}
        </p>

        {/* Tên người bán */}
        <div className="flex items-center gap-1 text-14 text-text-secondary mt-1">
          <b>
            Người {exchange.property.demand === 'buy' ? 'bán' : 'cho thuê'}:
          </b>
          <Link
            to={`/u/${exchange.seller?.id}`}
            className="hover:text-red-500 effect"
          >
            {exchange.seller?.displayName}
          </Link>
        </div>

        {/* ngày giao dịch */}
        <div className="flex items-start gap-1 text-14 text-text-secondary mt-1">
          <b>Ngày tạo:</b>
          <span>{formatTimeUTC7(exchange.createdAt, true)}</span>
        </div>

        {/* button group when pending */}
        {exchange.status === 'pending' && (
          <div className="flex items-start gap-4 mt-2 lg:mt-3 text-14">
            <Link
              to={`/quan-ly-giao-dich/chi-tiet/${exchange.id}`}
              className="bg-green-500 text-white border border-green-500 px-4 py-1 rounded-sm hover:bg-opacity-80 effect"
            >
              Chi tiết GD
            </Link>

            <button className="bg-[#009BA1] text-white border border-[#009BA1] px-4 py-1 rounded-sm hover:bg-opacity-80 effect">
              Gửi email
            </button>

            <button
              onClick={handleCancelExchange}
              className="border border-red-500 text-red-500 rounded-sm px-4 py-1 hover:bg-red-500 hover:text-white effect"
            >
              Huỷ giao dịch
            </button>
          </div>
        )}

        {/* Nếu hợp đồng thành công! */}
        {exchange.status === 'success' && exchange.contract ? (
          <div className="flex items-center gap-4 text-14 mt-3 flex-wrap">
            <div className="flex items-center gap-1">
              <b>Ngày ký hợp đồng:</b>
              <span>{formatTimeUTC7(exchange.contract.signed_date)}</span>
            </div>

            <div className="flex items-center gap-1">
              <b>Bản hợp đồng:</b>
              <Link
                to={exchange.contract.contract_url}
                target="_blank"
                className="underline"
              >
                FILE PDF
              </Link>
            </div>

            <Link
              to={`/quan-ly-giao-dich/chi-tiet/${exchange.id}`}
              className="font-medium underline"
            >
              Chi tiết
            </Link>
          </div>
        ) : null}

        {/* lý do hủy */}
        {exchange.status === 'cancel_by_buyer' ||
        exchange.status === 'cancel_by_seller' ? (
          <div className="text-14 flex items-center gap-1 mt-1">
            <b className="text-red-500">Lý do hủy:</b>
            <span>{exchange.reason_cancel}</span>
          </div>
        ) : null}
      </div>

      {/* Thông báo chút chút */}
      <div className="absolute top-1 right-1 p-2 cursor-pointer group">
        <AiOutlineInfoCircle className="text-xl" />

        <div className="hidden group-hover:block bg-white absolute w-56 z-10 text-justify right-full top-0 animate-show p-2 shadow-md">
          <p>
            <b>Batdongsanvn.fun</b> chỉ là trung gian trong quá trình này, chỉ
            có trách nhiệm lưu trữ các thông tin liên quan đến giao dịch!
          </p>
        </div>
      </div>
    </div>
  ) : null;
};

export default memo(ExchangeListItemBuy);
