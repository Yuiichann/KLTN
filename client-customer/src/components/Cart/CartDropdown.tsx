import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CartDropdownItem from './CartDropdownItem';
import { Link } from 'react-router-dom';

interface Props {
  handleCloseDropdown: VoidFunction;
}

const CartDropdown = (props: Props) => {
  const { carts } = useSelector((state: RootState) => state.carts);

  return (
    <div className="absolute top-full z-10 right-0 w-[32rem] bg-white border rounded-md shadow-md animate-show">
      <h2 className="py-2 border-b font-medium text-18 text-center">
        Giỏ hàng
      </h2>

      {/* items */}
      <div className="max-h-72 overflow-auto scrollbar-w-1 scrollbar-thumb-text-tertiary">
        {carts.length === 0 ? (
          <h5 className="py-8 text-text-secondary text-center">
            Giỏ hàng rỗng
          </h5>
        ) : (
          carts.map((cart, index) => (
            <CartDropdownItem cart={cart} key={index} />
          ))
        )}
      </div>

      {/* button */}
      {carts.length > 0 && (
        <Link
          to="/gio-hang"
          className="block text-center w-full py-2 border-t text-red-500 hover:bg-overlay effect"
          onClick={props.handleCloseDropdown}
        >
          Xem giỏ hàng
        </Link>
      )}
    </div>
  );
};

export default React.memo(CartDropdown);
