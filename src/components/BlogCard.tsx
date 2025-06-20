import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/blogUtils';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        {/* Author info */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-medium text-gray-600">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <p className="text-xs text-gray-500">{formatDate(new Date(post.createdAt))}</p>
          </div>
        </div>

        {/* Post content */}
        <div className="mb-4">
          <Link href={`/post/${post._id}`}>
            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                +{post.tags.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{post.readingTime} min read</span>
          </div>
          <Link
            href={`/post/${post._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
} 