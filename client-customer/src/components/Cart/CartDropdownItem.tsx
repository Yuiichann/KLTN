import Tippy from '@tippyjs/react';
import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../../redux/features/cart.slice';
import { AppDispath } from '../../redux/store';
import { INhaDat } from '../../types/nhaDat.types';
import formatPriceTV from '../../utils/formatPriceTV';
import getTypeNhaDatLabel from '../../utils/getTypeNhaDatLabel';

interface Props {
  cart: INhaDat;
}

const CartDropdownItem = ({ cart }: Props) => {
  const dispatch = useDispatch<AppDispath>();

  const handleClickRemoveCart = () => {
    dispatch(removeCart(cart.id || cart._id));
  };

  return (
    <div className="flex items-center gap-2 justify-between px-2 py-3">
      {/* image */}
      <img
        src={cart.collections[0]}
        alt={cart.title}
        className="min-w-[80px] w-20 h-16 object-cover rounded-sm shadow-sm"
      />

      {/* info */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Link
            to={`/chi-tiet/${cart.slug}`}
            className="font-medium text-text-secondary tracking-wide line-clamp-1"
          >
            {cart.title}
          </Link>
          <span className="text-12 text-text-tertiary">
            {cart.demand === 'buy' ? 'Bán' : 'Cho thuê'}{' '}
            {getTypeNhaDatLabel(cart.type_nhadat)}
          </span>
        </div>

        <div className="text-red-500 font-medium">
          {cart.price_unit === 'custom' ? (
            <span>Giá thỏa thuận</span>
          ) : (
            <span>
              Giá: {formatPriceTV(cart.price)}{' '}
              {cart.demand === 'lease' && '/tháng'}
              {cart.price_unit === 'per_area' && '/ m2'}
            </span>
          )}
        </div>
      </div>

      {/* button remove */}

      <Tippy content="Xóa khỏi giỏ hàng" animation="fade">
        <button
          className="p-2 rounded-full hover:bg-overlay effect"
          onClick={handleClickRemoveCart}
        >
          <BiTrash className="text-xl" />
        </button>
      </Tippy>
    </div>
  );
};

export default React.memo(CartDropdownItem);
