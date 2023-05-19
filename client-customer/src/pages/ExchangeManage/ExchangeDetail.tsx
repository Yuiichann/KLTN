import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import exchangeApi from '../../api/modules/exchange.api';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import AcceptExchangeModal from '../../components/Modal/AcceptExchangeModal';
import { RootState } from '../../redux/store';
import { IExchange } from '../../types/exchange.types';
import formatPriceTV from '../../utils/formatPriceTV';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';

const ExchangeDetail = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { exchangeId } = useParams();

  const [exchange, setExchange] = useState<IExchange>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!exchangeId) {
      setError('Không tìm thấy giao dịch hiện tại');
      setExchange(undefined);
      return;
    }

    const fetchData = async () => {
      const { response, error } = await exchangeApi.getDetailExchange(
        exchangeId
      );

      if (error && error.message) {
        setError(error.message);
        setExchange(undefined);
      }

      if (response && response.data) {
        setError(undefined);
        setExchange(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [exchangeId]);

  return (
    <div className="max-w-5xl mx-auto">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : exchange && exchange.property ? (
        <div className="m-3 mt-12 px-4 py-2 bg-white">
          <h2 className="text-xl font-semibold font-roboto uppercase tracking-wide my-4 text-center">
            Chi tiết giao dịch
          </h2>

          <p>
            <b>Mã giao dịch:</b> {exchange.id}
          </p>

          <div className="flex items-center gap-1 mt-2">
            <b className="min-w-fit">Người mua/thuê:</b>
            <Tippy content="Xem thông tin" animation="fade">
              <Link
                to={`/u/${exchange.buyer?.id}`}
                target="_blank"
                className="line-clamp-1"
              >
                {exchange.buyer?.displayName}
              </Link>
            </Tippy>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <b className="min-w-fit">Người bán/cho thuê:</b>
            <Tippy content="Xem thông tin" animation="fade">
              <Link
                to={`/u/${exchange.seller?.id}`}
                target="_blank"
                className="line-clamp-1"
              >
                {exchange.seller?.displayName}
              </Link>
            </Tippy>
          </div>

          <div className="flex items-center gap-1 mt-2">
            <b className="min-w-fit">Chi tiết bất động sản:</b>
            {exchange.property ? (
              <Tippy content="Xem chi tiết" animation="fade">
                <Link
                  to={`/chi-tiet/${exchange.property.slug}`}
                  target="_blank"
                  className="line-clamp-1"
                >
                  {exchange.property.title}
                </Link>
              </Tippy>
            ) : (
              <Tippy content="Có lỗi với tin nhà đất này" animation="fade">
                <p className="line-clamp-1">Không tìm thấy tin!!!</p>
              </Tippy>
            )}
          </div>

          {/* GIá */}
          <div className="flex items-start flex-wrap gap-2 text-18 text-red-500 tracking-wider my-6">
            <b className="min-w-fit">TỔNG THÀNH TIỀN:</b>
            <div className="flex items-center gap-1">
              {exchange.property.price_unit !== 'custom' ? (
                <b>{formatPriceTV(exchange.price)} VNĐ</b>
              ) : (
                <b>THỎA THUẬN VỚI NGƯỜI BÁN</b>
              )}

              {exchange.property.demand === 'lease' && <b>/ THÁNG</b>}
            </div>
          </div>

          {/* Trạng thái giao dịch */}
          <div className="select-none mb-12 border-t pt-2">
            <h3 className="text-center mb-2 font-medium font-roboto">
              Trạng thái giao dịch
            </h3>
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

          {/* Hiện thị thông tin hơp đồng */}
          {exchange.contract && (
            <div className="my-4">
              <p>
                <b>Ngày kí hợp đồng:</b>{' '}
                {formatTimeUTC7(exchange.contract.signed_date)}
              </p>

              <p>
                <b>Hợp đồng:</b>{' '}
                <Link
                  target="_blank"
                  to={exchange.contract.contract_url}
                  className="underline"
                >
                  PDF
                </Link>
              </p>
            </div>
          )}

          {/* group button */}
          <div className="flex items-center justify-center gap-6 text-14 pb-8">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-1 border border-red-500 rounded-sm shadow-sm text-red-500 hover:bg-red-500 hover:text-white effect"
            >
              Quay lại
            </button>

            {/* chưa có hoppwj đồng ms xuất hiện nút này */}
            {!exchange.contract && user?.id === exchange.seller?.id ? (
              <AcceptExchangeModal exchange={exchange} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExchangeDetail;
