import { usePosts } from "@/hooks/use-content";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Blog() {
  const { data: posts, isLoading } = usePosts();

  return (
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-16 border-b border-border pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Development Log</h1>
        <p className="text-xl text-muted-foreground font-mono">
          Thoughts on code, architecture, and the future of web.
        </p>
      </div>

      <div className="space-y-12">
        {isLoading ? (
          [1, 2, 3].map((i) => (
             <div key={i} className="space-y-4 animate-pulse">
               <div className="h-4 w-24 bg-muted rounded" />
               <div className="h-8 w-3/4 bg-muted rounded" />
               <div className="h-20 w-full bg-muted rounded" />
             </div>
          ))
        ) : (
          posts?.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-sm font-mono text-accent">
                    {post.publishedAt ? format(new Date(post.publishedAt), 'yyyy-MM-dd') : 'Draft'}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                    Article
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  Read entry &rarr;
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
