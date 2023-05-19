import { memo } from 'react';
import { INhaDat } from '../../types/nhaDat.types';
import PostsListItem from './PostsListItem';

interface Props {
  posts: INhaDat[];
  handleReload: VoidFunction;
}

const PostsList = ({ posts, handleReload }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostsListItem
          post={post}
          key={post._id || post.id}
          handleReload={handleReload}
        />
      ))}
    </div>
  );
};

export default memo(PostsList);
