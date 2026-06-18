import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { tintClass } from "@/lib/mock-products";
import { POSTS, getBlogIcon } from "@/lib/blog";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Creator tips, strategy & growth | Cetoh" },
      {
        name: "description",
        content: "Stories, tips and playbooks from the world's best digital creators.",
      },
    ],
  }),
  component: BlogHome,
});

function BlogHome() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <section className="container-page py-16 md:py-24">
          <p className="text-base font-black uppercase tracking-widest text-primary">
            The Cetoh Blog
          </p>
          <h1 className="mt-4 font-display text-5xl font-black text-foreground md:text-7xl">
            Build, sell, grow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-bold text-foreground/80">
            Tips, playbooks and stories from creators shipping digital products around the world.
          </p>

          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="mt-12 grid gap-6 overflow-hidden rounded-[3rem] border-[4px] border-border bg-white shadow-vibe transition-transform hover:-translate-y-2 md:grid-cols-2"
          >
            <div
              className={`flex aspect-[16/10] items-center justify-center p-10 border-b-[4px] md:border-b-0 md:border-r-[4px] border-border ${tintClass(featured.tint)}`}
            >
              {(() => {
                const Icon = getBlogIcon(featured.tag);
                return <Icon className="h-28 w-28 text-foreground stroke-[2.5]" />;
              })()}
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="rounded-full border-[3px] border-border bg-white px-4 py-1 text-sm font-black text-foreground shadow-vibe-sm self-start">
                {featured.tag}
              </span>
              <h2 className="mt-6 font-display text-3xl font-black text-foreground md:text-4xl leading-tight">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg font-bold text-foreground/80 leading-relaxed">
                {featured.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm font-bold text-foreground/70">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 stroke-[3px]" /> {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 stroke-[3px]" /> {featured.readTime}
                </span>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-base font-black text-primary">
                Read article <ArrowRight className="h-5 w-5 stroke-[3px]" />
              </span>
            </div>
          </Link>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col overflow-hidden rounded-[2.5rem] border-[4px] border-border bg-white transition-transform hover:-translate-y-2 shadow-vibe"
              >
                <div
                  className={`flex aspect-[16/10] items-center justify-center p-6 border-b-[4px] border-border ${tintClass(p.tint)}`}
                >
                  {(() => {
                    const Icon = getBlogIcon(p.tag);
                    return <Icon className="h-20 w-20 text-foreground stroke-[2.5]" />;
                  })()}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-8">
                  <span className="rounded-full border-[3px] border-border bg-white px-3 py-1 text-xs font-black text-foreground shadow-vibe-sm self-start">
                    {p.tag}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-black text-foreground leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-[15px] font-bold text-foreground/80 leading-relaxed line-clamp-3">
                    {p.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-4 text-sm font-bold text-foreground/60">
                    <span>{p.author}</span>
                    <span>·</span>
                    <span>{p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
