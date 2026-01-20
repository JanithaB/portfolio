import { notFound } from 'next/navigation';
import { getPostById, getAllIds } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Metadata } from 'next';
import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';
import SubscribeButton from '@/components/SubscribeButton';
import BlogReactions from '@/components/BlogReactions';
import BlogPostWrapper from '@/components/BlogPostWrapper';
import BlogViewIncrementer from '@/components/BlogViewIncrementer';
import BlogComments from '@/components/BlogComments';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const ids = await getAllIds();
  return ids.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Janitha Rathnayake`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostById(params.id);

  if (!post) {
    notFound();
  }

  // Remove the first H1 from markdown content if it matches the post title
  let content = post.content.trim();
  const lines = content.split('\n');
  
  // Check if first line is an H1 that matches the title
  if (lines.length > 0 && lines[0].startsWith('# ')) {
    const firstLineTitle = lines[0].replace(/^#\s+/, '').trim();
    // Remove if it matches the post title (case-insensitive)
    if (firstLineTitle.toLowerCase() === post.title.toLowerCase()) {
      content = lines.slice(1).join('\n').trim();
    }
  }

  return (
    <BlogPostWrapper slug={params.id}>
      <BlogViewIncrementer slug={params.id} />
      <div className="bg-slate-900 min-h-screen text-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-24 sm:pt-28 md:pt-20 pb-12 sm:pb-16 md:pb-24">
          <div className="flex flex-row items-center justify-between gap-6 sm:gap-8 mb-6 sm:mb-8">
            <Link
              href="/blog"
              className="text-teal-300 hover:text-teal-200 inline-block text-sm sm:text-base"
            >
              ← Back to Blog
            </Link>
            <SubscribeButton />
          </div>

          <article>
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mb-3 sm:mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="hidden sm:inline">•</span>
                <span>{post.readingTime}</span>
                <div className="flex items-center ml-auto">
                  <BlogReactions slug={params.id} />
                </div>
              </div>
            </header>

            <div className="border-t border-slate-700 mb-6 sm:mb-8"></div>

            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 mt-6 sm:mt-8 mb-3 sm:mb-4 leading-tight">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100 mt-5 sm:mt-6 mb-2 sm:mb-3 leading-tight">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 mt-4 sm:mt-5 mb-2 leading-tight">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base text-justify">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-slate-300 mb-3 sm:mb-4 space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-slate-300 mb-3 sm:mb-4 space-y-1 sm:space-y-2 ml-2 sm:ml-4 text-sm sm:text-base">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-1 sm:ml-2">{children}</li>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="bg-slate-800 text-teal-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-mono break-words">
                        {children}
                      </code>
                    ) : (
                      <code className="block bg-slate-800 text-teal-300 p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4 font-mono text-xs sm:text-sm">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-slate-800 p-3 sm:p-4 rounded-lg overflow-x-auto mb-3 sm:mb-4 text-xs sm:text-sm">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-teal-300 hover:text-teal-200 underline"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-teal-300 pl-3 sm:pl-4 italic text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base text-justify">
                      {children}
                    </blockquote>
                  ),
                  img: ({ src, alt }) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt={alt || 'Blog image'}
                      className="w-full rounded-lg my-4 sm:my-6"
                      loading="lazy"
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>

          <BlogComments slug={params.id} />

          <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-slate-700">
            <SubscribeForm />
          </div>

          <div className="mt-12 sm:mt-16">
            <Link
              href="/blog"
              className="text-teal-300 hover:text-teal-200 inline-block text-sm sm:text-base"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </BlogPostWrapper>
  );
}
