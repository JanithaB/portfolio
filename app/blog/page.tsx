import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Metadata } from 'next';
import SubscribeForm from '@/components/SubscribeForm';
import BlogViewDisplay from '@/components/BlogViewDisplay';
import BlogListingWrapper from '@/components/BlogListingWrapper';

export const metadata: Metadata = {
  title: 'Blog - Janitha Rathnayake',
  description: 'Articles about IoT, Edge Computing, Backend Systems, and Software Engineering.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const postSlugs = posts.map((post) => post.slug);

  return (
    <BlogListingWrapper postSlugs={postSlugs}>
      <div className="bg-slate-900 min-h-screen text-slate-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-12 sm:py-16 md:py-24">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-3 sm:mb-4">Blog</h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Articles about IoT, Edge Computing, Backend Systems, and Software Engineering.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-slate-700 rounded-lg p-4 sm:p-6 hover:border-teal-300/50 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-300 hover:text-teal-200 mb-2 sm:mb-3 leading-tight">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base">{post.description}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="hidden sm:inline">•</span>
                  <span>{post.readingTime}</span>
                  <span className="hidden sm:inline">•</span>
                  <BlogViewDisplay slug={post.slug} />
                </div>
              </article>
            ))}
          </div>
        )}

          <div className="mt-12 sm:mt-16">
            <SubscribeForm />
          </div>
        </div>
      </div>
    </BlogListingWrapper>
  );
}
