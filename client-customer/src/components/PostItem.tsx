import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { BiBath, BiBed, BiCart, BiImageAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addCart } from '../redux/features/cart.slice';
import { AppDispath } from '../redux/store';
import { INhaDat } from '../types/nhaDat.types';
import formatPriceTV from '../utils/formatPriceTV';
import formatTimeElapsed from '../utils/formatTimeElapsed.util';
import HiddenNumber from './HiddenNumber';
import ImageLazyLoading from './ImageLazyLoading';
import NoneAvatar from './NoneAvatar';

interface Props {
  post: INhaDat;
}

const PostItem = ({ post }: Props) => {
  const dispatch = useDispatch<AppDispath>();
  const navigate = useNavigate();

  // xử lý add tin vào giỏ
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    dispatch(addCart(post));
  };

  return (
    <Link to={`/chi-tiet/${post.slug}`} className="shadow-lg hover:shadow-xl effect">
      {/* collections */}
      <div className="flex gap-[2px] rounded-t-md overflow-hidden relative">
        <div className="flex-1">
          <ImageLazyLoading
            src={post.collections[0]}
            alt=""
            className="w-full h-[240px] md:h-[322px] object-cover"
            width="100%"
          />
        </div>

        <div className="w-4/12 hidden md:flex flex-col gap-[2px]">
          <ImageLazyLoading src={post.collections[1]} alt="" className="w-full h-[160px] object-cover" />
          <ImageLazyLoading src={post.collections[2]} alt="" className="w-full h-[160px] object-cover" />
        </div>

        {/* hiện tổng số hình ảnh */}
        <div className="absolute bottom-2 right-2 text-white flex items-center">
          <BiImageAlt className="text-2xl" />
          <span className="text-16 font-lexend ">{post.collections.length}</span>
        </div>
      </div>

      {/* info */}
      <div className="p-4">
        <h1 className="text-16 font-medium tracking-wide uppercase line-clamp-3">{post.title}</h1>

        {/* price - */}
        <ul className="flex items-center gap-4 md:gap-6 py-3 flex-wrap">
          {post.price_unit === 'vnd' ? (
            <li className="text-red-500 font-medium">
              <span>{formatPriceTV(post.price)}</span>
              {post.demand === 'lease' && <span className="pl-1">/ tháng</span>}
            </li>
          ) : post.price_unit === 'per_area' ? (
            <li className="text-red-500 font-medium flex items-center gap-1">
              <span>{formatPriceTV(post.price)}</span>
              <span>/</span>
              <div className="relative text-14">
                <span>m</span>
                <span className="absolute -top-1 -right-2 text-12">2</span>
              </div>
            </li>
          ) : (
            <li className="text-red-500 font-medium">Giá thỏa thuận </li>
          )}

          <li className="flex items-center gap-1 text-red-500 font-medium">
            <span>{post.area}</span>
            <div className="relative ">
              <span className="text-14">m</span>
              <span className="absolute -1top-1 -right-2 text-12">2</span>
            </div>
          </li>

          {post.num_bedrooms > 0 && (
            <Tippy content={`${post.num_bedrooms} giường`} animation="fade">
              <li className="flex items-center gap-1">
                <span>{post.num_bedrooms}</span>
                <BiBed />
              </li>
            </Tippy>
          )}

          {post.num_toilets > 0 && (
            <Tippy content={`${post.num_toilets} nhà vệ sinh/nhà tắm`} animation="fade">
              <li className="flex items-center gap-1">
                <span>{post.num_toilets}</span>
                <BiBath />
              </li>
            </Tippy>
          )}

          <li className="text-14 text-text-secondary">
            {post.location.district.name}, {post.location.province.name}
          </li>
        </ul>

        {/* description */}
        <p className="line-clamp-2 text-justify text-14">{post.description}</p>
      </div>

      {/* user_info */}
      <div className="flex items-center justify-between border-t p-4">
        <div
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/u/${post.user_id}`);
          }}
        >
          {/* avartar */}
          <NoneAvatar character={post.contact.name.charAt(0)} />

          {/* time elapsed */}
          <div className="text-14">
            <h3 className="font-medium line-clamp-1">{post.contact.name}</h3>
            <span className="text-text-tertiary line-clamp-1">{formatTimeElapsed(post.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:block">
            <HiddenNumber phone={post.contact.phone} />
          </div>

          <Tippy content="Thêm tin vào giỏ" animation="fade">
            <button className="p-2 cursor-pointer font-semibold border rounded-md border-text-primary" onClick={handleAddToCart}>
              <BiCart className="text-16" />
            </button>
          </Tippy>
        </div>
      </div>
    </Link>
  );
};

export default memo(PostItem);
