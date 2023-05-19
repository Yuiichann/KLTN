import { memo } from 'react';
import { INhaDat } from '../types/nhaDat.types';
import PostItem from './PostItem';

interface Props {
  posts: INhaDat[];
}

const PostsList = ({ posts }: Props) => {
  return (
    <div className="flex flex-col gap-7">
      {posts.map((item) => (
        <PostItem post={item} key={item.slug} />
      ))}
    </div>
  );
};

export default memo(PostsList);
