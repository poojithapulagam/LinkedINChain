// Import necessary modules and components
import type { Post } from '@/lib/models';
import PostCard from './post-card';

export interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="m-0 flex list-none flex-col p-0 bg-white rounded-md shadow-md">
      {posts.map((post) => (
        <li className="border-b border-solid border-gray-300" key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
