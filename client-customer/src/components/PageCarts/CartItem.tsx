import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { removeCart } from '../../redux/features/cart.slice';
import { setGlobalLoading } from '../../redux/features/globalLoading.slice';
import { AppDispath, RootState } from '../../redux/store';
import { INhaDat } from '../../types/nhaDat.types';
import formatPriceTV from '../../utils/formatPriceTV';
import formatTimeUTC7 from '../../utils/formatTimeUTC7.util';
import getTypeNhaDatLabel from '../../utils/getTypeNhaDatLabel';
import ImageLazyLoading from '../ImageLazyLoading';

interface Props {
  cart: INhaDat;
}

const CartItem = ({ cart }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispath>();

  const { user } = useSelector((state: RootState) => state.user);

  const handleRemoveCart = () => {
    dispatch(removeCart(cart.id || cart._id));
  };

  const handleClickButtonTrade = () => {
    // user chua login
    if (!user) {
      toast.info('Bạn phải đăng nhập để thực hiện giao dịch');
      return;
    }

    // user tự mua của mình
    if (user.id === cart.user_id) {
      toast.error('Bạn không thể giao dịch trên chính tin đăng của mình');
      dispatch(removeCart(cart.id || cart._id));
      return;
    }

    Swal.fire({
      title: 'Xác nhận',
      icon: 'question',
      text: `
        Bạn có chắc chắn ${
          cart.demand === 'buy' ? 'mua' : 'thuê'
        } bất động sản này không?
      `,
      showConfirmButton: true,
      confirmButtonText: `${cart.demand === 'buy' ? 'Mua' : 'Thuê'} ngay`,
      showCancelButton: true,
      cancelButtonText: 'Quay lại',
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setGlobalLoading(true));
        navigate('/giao-dich-nha-dat', {
          state: {
            cart,
          },
        });
      }
    });
  };

  return (
    <div className="my-4 rounded-sm shadow-md bg-secondary">
      <div className="flex gap-4 items-start t p-4">
        <ImageLazyLoading
          src={cart.collections[0]}
          alt={cart.title}
          className="min-w-[6rem] w-24 h-16 lg:min-w-[9rem] lg:w-36 lg:h-28 object-cover rounded-sm shadow-md"
        />

        <div>
          <Link
            to={`/chi-tiet/${cart.slug}`}
            className="block text-16 font-medium tracking-wide line-clamp-1"
          >
            {cart.title}
          </Link>

          {/* nhu cau - loai nha dat - gia */}
          <div className="text-14 text-text-secondary mt-2">
            <div className="flex flex-col flex-wrap mb-1 md:flex-row md:items-center md:gap-5">
              <p>
                <b>Nhu cầu:</b> {cart.demand === 'buy' ? 'Bán' : 'Cho thuê'}
              </p>
              <p>
                <b>Loại nhà đất:</b> {getTypeNhaDatLabel(cart.type_nhadat)}
              </p>
            </div>

            <p>
              <b>Ngày đăng:</b> {formatTimeUTC7(cart.createdAt)}
            </p>

            <div className="text-red-500 font-medium mt-1 text-16">
              {cart.price_unit === 'custom' ? (
                <span>Giá thỏa thuận</span>
              ) : (
                <span>
                  Giá: {formatPriceTV(cart.price)}{' '}
                  {cart.demand === 'lease' && '/ tháng'}
                  {cart.price_unit === 'per_area' && '/ m2'}
                </span>
              )}
            </div>
          </div>

          {/* button group */}
          <div className="hidden md:flex items-center gap-4 mt-4 text-14 text-white">
            <button
              onClick={handleClickButtonTrade}
              className="px-4 py-2 h-[37px] rounded-md border-green-500 bg-green-500 hover:bg-opacity-80"
            >
              {cart.demand === 'buy' ? 'Mua ngay' : 'Thuê ngay'}
            </button>

            <a
              href={`mailto:${cart.contact.email}?subject=Khác hàng trên Batdongsanvn.fun quan tâm tới tin đăng&body=Tôi quan tâm đến tin đăng có tiêu đề ${cart.title}`}
              className="px-4 py-2 h-[37px] rounded-md border-amber-400 bg-amber-400 hover:bg-opacity-80"
            >
              Gửi email
            </a>

            <button
              onClick={handleRemoveCart}
              className="flex items-center justify-center w-[37px] h-[37px] rounded-md border border-red-500 bg-red-500 hover:bg-opacity-80"
            >
              <BiTrash />
            </button>
          </div>
        </div>
      </div>

      {/* button on mobile */}
      <div className="flex md:hidden justify-center items-center gap-2 text-14 text-white pb-4">
        <button
          onClick={handleClickButtonTrade}
          className="px-4 py-2 h-[37px] rounded-md border-green-500 bg-green-500 hover:bg-opacity-80"
        >
          {cart.demand === 'buy' ? 'Mua ngay' : 'Thuê ngay'}
        </button>

        <a
          href={`mailto:${cart.contact.email}?subject=Khác hàng trên Batdongsanvn.fun quan tâm tới tin đăng&body=Tôi quan tâm đến tin đăng có tiêu đề ${cart.title}`}
          className="px-4 py-2 h-[37px] rounded-md border-amber-400 bg-amber-400 hover:bg-opacity-80"
        >
          Gửi email
        </a>

        <button
          onClick={handleRemoveCart}
          className="flex items-center justify-center w-[37px] h-[37px] rounded-md border border-red-500 bg-red-500 hover:bg-opacity-80"
        >
          <BiTrash />
        </button>
      </div>
    </div>
  );
};

export default React.memo(CartItem);
