import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { POSTS, getBlogIcon } from "./blog";
import { tintClass } from "@/lib/mock-products";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const p = POSTS.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: p ? `${p.title} | Cetoh Blog` : "Article | Cetoh Blog" },
        { name: "description", content: p?.excerpt ?? "Cetoh blog article" },
      ],
    };
  },
  component: BlogArticle,
});

function BlogArticle() {
  const { slug } = Route.useParams();
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <div className="p-10 text-center">Article not found.</div>;
  const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <article className="container-page max-w-4xl py-12 md:py-16">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-base font-black text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5 stroke-[3px]" /> All articles
          </Link>
          <div className="mt-10">
            <span className="inline-block rounded-full border-[3px] border-border bg-white px-4 py-1.5 text-sm font-black text-foreground shadow-vibe-sm">
              {p.tag}
            </span>
          </div>
          <h1 className="mt-6 font-display text-4xl font-black text-foreground sm:text-5xl md:text-6xl leading-tight">
            {p.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-base font-bold text-foreground/80">
            <span className="font-black text-foreground">{p.author}</span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5 stroke-[3px]" /> {p.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5 stroke-[3px]" /> {p.readTime}
            </span>
            <button className="ml-auto inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-white px-5 py-2 text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-mint">
              <Share2 className="h-4 w-4 stroke-[3px]" /> Share
            </button>
          </div>
          <div
            className={`my-12 aspect-[16/9] rounded-[3rem] border-[4px] border-border shadow-vibe ${tintClass(p.tint)} flex items-center justify-center p-10`}
          >
            {(() => {
              const Icon = getBlogIcon(p.tag);
              return <Icon className="h-40 w-40 text-foreground stroke-[2.5]" />;
            })()}
          </div>
          <div className="prose prose-lg md:prose-xl max-w-none text-foreground/90 font-medium">
            <p className="text-2xl font-bold leading-relaxed">{p.excerpt}</p>
            <p className="mt-8 leading-relaxed">
              Most creators get stuck because they treat their product launch like a single event
              instead of a 30-day campaign. The most successful Cetoh creators we've worked with
              share three habits: they ship before they're ready, they price for value not for time,
              and they treat every early customer like a co-founder.
            </p>
            <h2 className="mt-12 font-display text-3xl font-black text-foreground">
              Start with the smallest valuable thing
            </h2>
            <p className="mt-4 leading-relaxed">
              Your first product doesn't need to be your magnum opus. Pick a single problem, solve
              it well, and ship a v1 your audience can hold in their hands within two weeks. You'll
              learn more from 50 early users than from 6 months of polish.
            </p>
            <h2 className="mt-12 font-display text-3xl font-black text-foreground">
              Sell before you build
            </h2>
            <p className="mt-4 leading-relaxed">
              Pre-orders are validation with skin in the game. If 30 people pay ₦15,000 before your
              course exists, you've validated demand and funded the work. If nobody pays, you saved
              months of building the wrong thing.
            </p>
            <h2 className="mt-12 font-display text-3xl font-black text-foreground">
              Treat the first week like a launch
            </h2>
            <p className="mt-4 leading-relaxed">
              Show up daily. Reply to every email. Tweet every milestone. The first week sets the
              algorithmic and social momentum that compounds for months.
            </p>
          </div>
        </article>
        <section className="container-page max-w-5xl pb-20 md:pb-28">
          <h3 className="font-display text-3xl font-black text-foreground">Keep reading</h3>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group overflow-hidden rounded-[2rem] border-[4px] border-border bg-white shadow-vibe-sm transition-transform hover:-translate-y-2 hover:shadow-vibe"
              >
                <div
                  className={`flex aspect-[16/10] items-center justify-center border-b-[4px] border-border p-5 ${tintClass(r.tint)}`}
                >
                  {(() => {
                    const Icon = getBlogIcon(r.tag);
                    return <Icon className="h-14 w-14 text-foreground stroke-[2.5]" />;
                  })()}
                </div>
                <div className="p-6">
                  <h4 className="font-display text-lg font-black text-foreground leading-snug">
                    {r.title}
                  </h4>
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
