import Tippy from '@tippyjs/react';
import { useCallback, useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import nhaDatApi from '../api/modules/nhaDat.api';
import Error from '../components/Error';
import ImageLazyLoading from '../components/ImageLazyLoading';
import Loading from '../components/Loading';
import config from '../configs/config';
import { INhaDat } from '../types/nhaDat.types';
import formatPriceTV from '../utils/formatPriceTV';
import formatTimeUTC7 from '../utils/formatTimeUTC7.util';
import getTypeNhaDatLabel from '../utils/getTypeNhaDatLabel';

const PropertyDetail = () => {
  const { slug } = useParams();

  const [property, setProperty] = useState<INhaDat>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [reload, setReload] = useState(false);

  const handleAcceptProperty = useCallback(() => {
    if (!property) return;

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
        setReload((prev) => !prev);
      }
    });
  }, [property]);

  const handleRefuseProperty = useCallback(() => {
    if (!property) return;

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
        setReload((prev) => !prev);
      }
    });
  }, [property]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    const fetchData = async () => {
      const { response, error } = await nhaDatApi.getPropertyDetail(slug);

      if (error) {
        setError(error.message);
        setProperty(undefined);
      }

      if (response && response.data) {
        setError(undefined);
        setProperty(response.data);
      }

      setIsLoading(false);
    };

    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData();
  }, [slug, reload]);

  return (
    <div className="mt-4 mb-12">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error err={error} />
      ) : (
        property && (
          <>
            {/* tên & link */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Tiêu đề:</b>

              {property.status === 'approved' ? (
                <Tippy content="Xem trên website">
                  <Link
                    to={`${config.main_website_url}/chi-tiet/${slug}`}
                    target="_blank"
                  >
                    {property.title}
                  </Link>
                </Tippy>
              ) : (
                <Tippy content="Tin chưa hiển thị trên website">
                  <h1>{property.title}</h1>
                </Tippy>
              )}
            </div>

            {/* nhu cầu */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Nhu cầu:</b>

              <p>{property.demand === 'buy' ? 'Bán' : 'Cho thuê'}</p>
            </div>

            {/* loại nahf đất */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Loại nhà đất:</b>
              <p className="capitalize">
                {getTypeNhaDatLabel(property.type_nhadat)}
              </p>
            </div>

            {/* diện tích */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Diện tích:</b>
              <p>{property.area} m2</p>
            </div>

            {/* giá */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Giá:</b>
              <p>
                {formatPriceTV(property.price)}{' '}
                {property.demand === 'lease' ? '/ tháng' : ''}
              </p>
            </div>

            {/* thời gian */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Ngày đăng:</b>
              <p>{formatTimeUTC7(property.createdAt)}</p>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Trạng thái:</b>
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

            {/* nguời đăng */}
            <div className="flex items-center gap-3 mb-1">
              <b className="min-w-[150px]">Người đăng:</b>
              <Link
                to={`/user/${property.user_id}`}
                className="capitalize hover:opacity-80"
              >
                {property.contact.name}
              </Link>
            </div>

            {/* các thong tin khác */}
            <div className="flex items-center gap-6 flex-wrap my-2">
              <div className="flex items-center gap-1">
                <b>Số Toilets:</b>
                <span>{property.num_toilets}</span>
              </div>

              <div className="flex items-center gap-1">
                <b>Số tầng:</b>
                <span>{property.num_floors}</span>
              </div>

              <div className="flex items-center gap-1">
                <b>Số phòng ngủ:</b>
                <span>{property.num_bedrooms}</span>
              </div>

              <div className="flex items-center gap-1">
                <b>Hướng nhà:</b>
                <span>{property.home_direction}</span>
              </div>

              <div className="flex items-center gap-1">
                <b>Pháp lý:</b>
                <span>{property.legal}</span>
              </div>
            </div>

            {/* thư viện ảnh */}
            <div className="border-t border-b py-2 bg-white my-2 max-w-2xl mx-auto">
              <b className="pl-4">Hình ảnh:</b>
              <div className="h-[650px] overflow-auto">
                {property.collections.map((item, index) => (
                  <div key={index} className="flex justify-center my-2">
                    <ImageLazyLoading
                      src={item}
                      alt="preview"
                      className="max-w-xl object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* button group */}
            <div className="text-14 text-white flex items-center gap-3 justify-center mt-4 mb-12">
              {property.status === 'pending' && (
                <>
                  <button
                    onClick={handleRefuseProperty}
                    className="px-12 py-1 text-center border border-red-500 bg-red-500 rounded-sm hover:bg-opacity-80"
                  >
                    Không duyệt
                  </button>

                  <button
                    onClick={handleAcceptProperty}
                    className="px-12 py-1 text-center border border-green-500 bg-green-500 rounded-sm hover:bg-opacity-80"
                  >
                    Duyệt tin
                  </button>
                </>
              )}

              {property.status === 'approved' && (
                <button
                  onClick={handleRefuseProperty}
                  className="px-12 py-1 text-center border border-red-500 bg-red-500 rounded-sm hover:bg-opacity-80"
                >
                  Ẩn tin
                </button>
              )}

              {property.status === 'refuse' && (
                <button
                  onClick={handleAcceptProperty}
                  className="px-12 py-1 text-center border border-green-500 bg-green-500 rounded-sm hover:bg-opacity-80"
                >
                  Hiển thị tin
                </button>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default PropertyDetail;
