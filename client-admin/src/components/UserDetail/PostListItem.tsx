import React from 'react';
import { BsDot, BsImage } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { INhaDat } from '../../types/nhaDat.types';
import formatPriceTV from '../../utils/formatPriceTV';
import formatTimeElapsed from '../../utils/formatTimeElapsed.util';

interface Props {
  post: INhaDat;
  demand?: 'buy' | 'lease';
}

const PostListItem = ({ post, demand }: Props) => {
  return (
    <Link
      to={`/quan-ly-bat-dong-san/chi-tiet-bds/${post.slug}`}
      className="block shadow-md rounded-r-md hover:shadow-lg effect"
    >
      {/* bg */}
      <LazyLoadComponent>
        <div
          className="relative bg-center bg-cover bg-no-repeat pt-[60%] rounded-sm shadow-md overflow-hidden"
          style={{ backgroundImage: `url(${post.collections[0]})` }}
        >
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-t from-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.05)]">
            <div className="absolute right-2 bottom-1 text-white items-center flex gap-1">
              <BsImage />
              <span>{post.collections.length}</span>
            </div>
          </div>
        </div>
      </LazyLoadComponent>

      {/* info */}
      <div className="p-4">
        {/* title */}
        <h1 className="line-clamp-2">{post.title}</h1>

        {/* price - area */}
        <div className="flex items-center gap-1 my-1 text-red-500 font-medium">
          {post.price_unit === 'custom' ? (
            <span>Giá thỏa thuận</span>
          ) : (
            <span>
              {formatPriceTV(post.price)?.replaceAll('0', '')}
              {demand === 'lease' ? '/tháng' : ''}
            </span>
          )}
          <BsDot />
          <div className="flex items-center gap-1">
            <span>{post.area}</span>
            <div className="relative">
              <span>m</span>
              <span className="absolute -top-1 -right-2 text-12">2</span>
            </div>
          </div>
        </div>

        {/* location */}
        <div className="flex items-center gap-2 text-14 text-text-secondary mt-1">
          <CiLocationOn />
          <span className="line-clamp-1">
            {post.location.district ? post.location.district.name : ''},{' '}
            {post.location.province ? post.location.province.name : ''}
          </span>
        </div>

        {/* time elaps */}
        <p className="mt-3 text-12 text-text-tertiary">
          {formatTimeElapsed(post.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default React.memo(PostListItem);
