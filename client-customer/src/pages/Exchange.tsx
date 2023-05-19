import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { HiUsers } from 'react-icons/hi';
import { MdRealEstateAgent } from 'react-icons/md';
import { TbArrowBackUp } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import exchangeApi from '../api/modules/exchange.api';
import userApi from '../api/modules/user.api';
import ImageList from '../components/Exchange/ImageList';
import { removeCart } from '../redux/features/cart.slice';
import { setGlobalLoading } from '../redux/features/globalLoading.slice';
import { AppDispath, RootState } from '../redux/store';
import { INhaDat } from '../types/nhaDat.types';
import { IPublicUser } from '../types/user.types';
import formatPriceTV from '../utils/formatPriceTV';
import getTypeNhaDatLabel from '../utils/getTypeNhaDatLabel';

// tính tổng tiền lumla
function handleCalcTotalPrice(
  price: number,
  price_unit: INhaDat['price_unit'],
  area: number,
  isLease?: boolean
) {
  if (isLease) {
    return `${formatPriceTV(price)} / Tháng`;
  }

  if (price_unit === 'custom') {
    return 'Thoả thuận';
  } else if (price_unit === 'per_area') {
    const newPrice = Math.round(price * area);
    return formatPriceTV(newPrice);
  } else {
    return formatPriceTV(price);
  }
}

const Exchange = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();
  const { user } = useSelector((state: RootState) => state.user);

  // state
  const [property, setProperty] = useState<INhaDat>();
  const [seller, setSeller] = useState<IPublicUser>();

  //   xử lý lấy dữ liệu người bán và bất động sản hiện tại đang giao dịch
  useEffect(() => {
    if (!location.state) return;

    const currentCart = location.state.cart as INhaDat;
    const sellerId = currentCart.user_id;

    // lấy dữ liệu của người bán bất động sản
    const fetchInfoSeller = async () => {
      const { response, error } = await userApi.getPublicInfo(sellerId);

      if (error && error.message) {
        console.error(error);
        Swal.fire({
          title: 'Đã có lỗi xảy ra',
          text: 'Một lỗi gì đó đã xảy ra. Vui lòng thử lại!',
          icon: 'error',
          showConfirmButton: true,
          confirmButtonColor: 'red',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(setGlobalLoading(false));
            navigate('/gio-hang');
            return;
          }
        });
      }

      // nếu fetch thành công, lưu vào state và setGlobalLoading về fasle
      if (response && response.data) {
        setSeller(response.data);
        setProperty(currentCart);
        dispatch(setGlobalLoading(false));
      }
    };

    fetchInfoSeller();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location, navigate, dispatch]);

  // xử lý click giao dịch
  const handleClickExchange = useCallback(async () => {
    if (!property) return;

    dispatch(setGlobalLoading(true));
    const { response, error } = await exchangeApi.createExchange({
      property_id: property.id || property._id,
    });

    if (error) {
      dispatch(setGlobalLoading(false));
      Swal.fire({
        title: 'Lỗi',
        text: error.message,
        icon: 'error',
      });
    }

    if (response) {
      dispatch(setGlobalLoading(false));
      Swal.fire({
        title: 'Thành công',
        icon: 'success',
        html: `<h3>Giao dịch của bạn đã được tạo thành công</h3>
         <p>Người bán sẽ liên hệ với bạn sớm nhất có thể.</p>
         <br/>
         <p>Hoặc bạn có thể liện hệ với người bán qua: <br/><br/>
          - <b>Số điện thoại:</b> ${seller?.phone_number} <br/> 
          - <b>Email:</b> ${seller?.email}</p>
         `,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // Xóa cart khỏi giỏi hàng
          dispatch(removeCart(property.id || property._id));
          navigate('/quan-ly-giao-dich/don-cua-ban', { replace: true });
        }
      });
    }
  }, [navigate, property, seller, dispatch]);

  // xử lý không giao dịch
  const handleCancelExchange = useCallback(() => {
    Swal.fire({
      title: 'Xác nhận',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/gio-hang', { replace: true });
      }
    });
  }, [navigate]);

  //   state trong router, nếu không có state thì văng,  hoặc user không loggin cũng z
  if (!location.state || !user) {
    return <Navigate to="/gio-hang" />;
  }

  return (
    <section className="min-h-[calc(100vh-100px)]">
      {property && seller && user && (
        <>
          {/* react helmet */}
          <Helmet>
            <title>
              {property.demand === 'buy' ? 'Mua' : 'Thuê'}: {property.title}
            </title>
          </Helmet>

          <div className="bg-red-500 shadow-sm mb-4 md:mb-12">
            <div className="container max-w-5xl text-white">
              <div className="py-2">
                <button
                  className="flex items-start gap-2 text-14 py-2 pr-2 hover:opacity-80 effect"
                  onClick={() => navigate(-1)}
                >
                  <TbArrowBackUp className="text-18" />
                  <span>Quay lại</span>
                </button>

                <h2 className="font-medium text-xl md:text-2xl tracking-wide">
                  Giao dịch mua bán bất động sản
                </h2>
              </div>
            </div>
          </div>

          <div className="container max-w-5xl">
            {/* thông tin người bán và người mua hoặc thuê */}
            <div>
              <h3 className="text-xl font-medium tracking-wide mb-3 inline-flex items-center gap-2">
                <HiUsers />
                <span>Thông tin người giao dịch</span>
              </h3>

              <div className="flex flex-col md:flex-row gap-4">
                {/* người mua / thuê */}
                <div className="flex-1 rounded-md shadow-md border">
                  <h6 className="text-16 md:text-18 font-medium tracking-wide border-b-2 py-2 pl-3 text-red-500">
                    Bên {property.demand === 'buy' ? 'mua' : 'thuê'}
                  </h6>

                  <div className="flex flex-col gap-1 p-3">
                    <p>
                      <b>Tên hiển thị:</b> {user.displayName}
                    </p>
                    <p>
                      <b>Địa chỉ:</b> {user.address}
                    </p>
                    <p>
                      <b>Email:</b> {user.email}
                    </p>
                    <p>
                      <b>Số điện thoại</b> {user.phone_number}
                    </p>
                  </div>
                </div>

                {/* người bán / cho thuê */}
                <div className="flex-1 rounded-md shadow-md border">
                  <h6 className="text-16 md:text-18 font-medium tracking-wide border-b-2 py-2 pl-3 text-red-500">
                    Bên {property.demand === 'buy' ? 'bán' : 'cho thuê'}
                  </h6>

                  <div className="flex flex-col gap-1 p-3">
                    <p>
                      <b>Tên hiển thị:</b> {seller.displayName}
                    </p>
                    <p>
                      <b>Địa chỉ:</b> {seller.address}
                    </p>
                    <p>
                      <b>Email:</b> {seller.email}
                    </p>
                    <p>
                      <b>Số điện thoại</b> {seller.phone_number}
                    </p>

                    <Link
                      to={`/u/${seller.id}`}
                      className="text-14 italic text-text-tertiary underline"
                    >
                      Xem thông tin chi tiết
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* thông tin bất động sản */}
            <div className="mt-6">
              <h3 className="text-xl font-medium tracking-wide mb-3 inline-flex items-center gap-2">
                <MdRealEstateAgent />
                <span>Thông tin bất động sản</span>
              </h3>

              <div className="p-4 border rounded-md shadow-md">
                {/* image */}
                <div className="max-w-full">
                  <ImageList images={property.collections} />
                </div>

                <div className="flex flex-col gap-2">
                  {/* title */}
                  <div>
                    <b className="mr-1">Tên bài đăng:</b>
                    <Link
                      target="_blank"
                      to={`/chi-tiet/${property.slug}`}
                      className="tracking-wide underline"
                    >
                      {property.title}
                    </Link>
                  </div>

                  {/* Nhu cau - loai nha dat - dien tích */}
                  <div className="flex items-center gap-2 lg:gap-12 flex-wrap">
                    {/* Nhu cầu */}
                    <div className="flex items-center gap-2">
                      <b>Nhu cầu:</b>
                      <span>{property.demand === 'buy' ? 'Mua' : 'Thuê'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <b>Loại nhà đất:</b>
                      <span>{getTypeNhaDatLabel(property.type_nhadat)}</span>
                    </div>

                    {/* dien tich */}
                    <div className="flex items-center gap-2">
                      <b>Diện tích:</b>
                      <div className="flex items-center gap-1">
                        <span>{property.area}</span>
                        <div className="relative">
                          <span>m</span>
                          <span className="absolute -top-1 -right-2 text-12">
                            2
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DIA CHI */}
                  <div>
                    <b className="pr-1">Địa chỉ:</b>
                    <span>
                      {property.location.street}, {property.location.ward.name},{' '}
                      {property.location.district.name},{' '}
                      {property.location.province.name}
                    </span>
                  </div>

                  <p className="flex items-center gap-4 text-xl mt-4 text-red-500 font-medium">
                    <b>Giá:</b>
                    {handleCalcTotalPrice(
                      property.price,
                      property.price_unit,
                      property.area,
                      property.demand === 'lease'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="mt-6 bg-white rounded-md shadow-md">
              <h6 className="text-18 italic pl-2 py-2 mb-2">(*)Chú ý:</h6>
              <ul className="py-2 pl-6"></ul>
            </div>

            <div className="flex justify-center my-8 gap-4">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCancelExchange}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleClickExchange}
              >
                Tiến hành giao dịch
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Exchange;
