"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Calendar, Clock, Link as LinkIcon, Check } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

type Props = {
  posts: BlogPost[];
  children: React.ReactNode;
};

function formatDate(date?: string): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ArticleChrome({ posts, children }: Props) {
  const pathname = usePathname();
  const slug = pathname?.replace(/^\/blog\//, "").replace(/\/$/, "") ?? "";

  const { post, prev, next } = useMemo(() => {
    const idx = posts.findIndex((p) => p.slug === slug);
    if (idx === -1) return { post: null, prev: null, next: null };
    return {
      post: posts[idx],
      // `posts` is newest-first, so an older article sits later in the list.
      prev: idx < posts.length - 1 ? posts[idx + 1] : null,
      next: idx > 0 ? posts[idx - 1] : null,
    };
  }, [posts, slug]);

  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const dateLabel = formatDate(post?.date);

  return (
    <>
      <div
        className="fixed top-[57px] left-0 h-0.5 bg-foreground z-40 transition-[width] duration-75"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      {post && (
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 not-prose">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Articles
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs px-3 py-1 bg-secondary/20 text-muted-foreground rounded">
              {post.category}
            </span>
            {post.tags
              .filter((t) => t !== post.category)
              .map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 bg-secondary/30 text-muted-foreground rounded"
                >
                  #{t}
                </span>
              ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-2">
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {dateLabel}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readingTimeMinutes} min read
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              aria-label="Copy link to this article"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <LinkIcon className="w-3.5 h-3.5" /> Copy link
                </>
              )}
            </button>
          </div>
        </header>
      )}

      {children}

      {post && (prev || next) && (
        <nav
          aria-label="Article navigation"
          className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 not-prose"
        >
          <div className="border-t border-border pt-8 grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="block p-4 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-colors"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  ← Previous (older)
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {prev.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="block p-4 border border-border hover:border-foreground/50 hover:bg-secondary/10 transition-colors sm:text-right"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  Next (newer) →
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {next.title}
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}
    </>
  );
}
