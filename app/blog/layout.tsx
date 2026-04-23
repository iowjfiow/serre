import { Navigation } from "@/components/navigation";
import { ArticleChrome } from "@/components/article-chrome";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <ArticleChrome posts={posts}>
        <article
          className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12
          prose-headings:text-foreground prose-headings:scroll-mt-24
          prose-h1:text-3xl sm:prose-h1:text-4xl
          prose-h2:text-2xl sm:prose-h2:text-3xl
          prose-h3:text-xl sm:prose-h3:text-2xl
          prose-p:text-foreground
          prose-a:text-foreground prose-a:break-words
          prose-strong:text-foreground
          prose-code:text-green-500
          prose-code:bg-zinc-900
          prose-code:px-1.5
          prose-code:py-0.5
          prose-code:rounded
          prose-code:text-sm
          prose-code:break-words
          prose-code:before:content-none
          prose-code:after:content-none
          prose-pre:bg-zinc-900
          prose-pre:border
          prose-pre:border-zinc-800
          prose-pre:overflow-x-auto
          prose-pre:text-sm
          prose-img:rounded
          prose-img:w-full
          prose-img:h-auto"
        >
          {children}
        </article>
      </ArticleChrome>
    </div>
  );
}
