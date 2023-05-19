import { useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';
import { TbArrowBackUp } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import CartItem from '../components/PageCarts/CartItem';
import { RootState } from '../redux/store';

const Carts = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { carts } = useSelector((state: RootState) => state.carts);

  //   fake loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);

  return (
    <section className="mb-32 min-h-[calc(50vh)]">
      <div className="bg-red-500 mb-8 text-white">
        <div className="container max-w-4xl py-2">
          <button
            className="flex items-start gap-2 text-14 py-2 pr-2 hover:opacity-80 effect"
            onClick={() => navigate(-1)}
          >
            <TbArrowBackUp className="text-18" />
            <span>Quay lại</span>
          </button>

          <h1 className="text-xl md:text-2xl font-medium tracking-wide">
            Giỏ hàng của bạn
          </h1>
        </div>
      </div>

      <div className="container max-w-4xl">
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {carts.length > 0 ? (
              <>
                <div className="mt-2 px-4 py-2 bg-secondary text-14">
                  <span>
                    Bạn đang có {carts.length} bài đăng được lưu trong giỏ hàng.
                  </span>
                </div>

                {/* Cart list */}
                <div className="mt-4">
                  {carts.map((cart, index) => (
                    <CartItem cart={cart} key={index} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="py-8 flex flex-col justify-center items-center gap-4 font-medium">
                  <BsCartX className="text-5xl" />
                  <span>Giỏ hàng rỗng.</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Carts;
