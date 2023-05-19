import React, { useState } from 'react';
import { INhaDat } from '../../types/nhaDat.types';
import PostListItem from './PostListItem';

interface Props {
  posts: INhaDat[];
  demand?: 'buy' | 'lease';
  isCol?: true;
}

const PostList = ({ posts, demand, isCol }: Props) => {
  const [numberShow, setNumberShow] = useState(4);

  const handleShowMore = () => {
    setNumberShow((prev) => prev + 4);
  };

  return (
    <div>
      <div
        className={`grid ${
          isCol
            ? 'grid-cols-1 md:grid-cols-2 gap-6'
            : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8'
        }`}
      >
        {posts.map(
          (post, index) =>
            index + 1 <= numberShow && (
              <PostListItem post={post} key={index} demand={demand} />
            )
        )}
      </div>
      {/* button show more */}
      {posts.length > numberShow && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 border border-[#009BA1] text-[#009BA1] font-medium rounded-md hover:bg-overlay effect"
          >
            Xem thêm
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(PostList);
