import Tippy from '@tippyjs/react';
import { memo, useEffect, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartDropdown from './CartDropdown';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ButtonCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  const { carts } = useSelector((state: RootState) => state.carts);

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(e.target as any)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    return () => document.removeEventListener('mousedown', handleClickOutSide);
  }, []);

  return (
    <div ref={cartRef}>
      <Tippy content="Giỏ hàng" animation="fade">
        <button
          className={`relative btn text-2xl ${
            isCartOpen ? 'bg-secondary' : ''
          }`}
          onClick={handleToggleCart}
        >
          <AiOutlineShoppingCart />

          {/* số lượng thông báo chưa xem */}
          {carts.length > 0 ? (
            <div className="absolute top-1 right-[2px] w-5 h-5 rounded-full bg-red-500 text-white text-12 flex items-center justify-center">
              <span>{carts.length}</span>
            </div>
          ) : null}
        </button>
      </Tippy>

      {isCartOpen && (
        <CartDropdown handleCloseDropdown={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};

export default memo(ButtonCart);
