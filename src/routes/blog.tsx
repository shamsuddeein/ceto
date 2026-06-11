import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight, Target, DollarSign, Megaphone, PenTool, Wrench, FileText } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { tintClass } from "@/lib/mock-products";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [
    { title: "Blog | Creator tips, strategy & growth | Cetoh" },
    { name: "description", content: "Stories, tips and playbooks from the world's best digital creators." },
  ] }),
  component: BlogHome,
});

export const POSTS = [
  { slug: "launching-your-first-digital-product", title: "How to launch your first digital product in 30 days", excerpt: "A practical, no-fluff guide to going from idea to first paying customer in one month.", author: "Amara Okafor", date: "June 5, 2026", readTime: "8 min", tag: "Strategy", tint: "mint" as const },
  { slug: "pricing-your-ebook", title: "The psychology of pricing your eBook (and not undercharging)", excerpt: "Why creators leave money on the table - and the 3-tier pricing framework that fixes it.", author: "Kwame Boateng", date: "May 28, 2026", readTime: "6 min", tag: "Pricing", tint: "lilac" as const },
  { slug: "building-an-audience", title: "Building an audience before you have a product", excerpt: "Pre-launch communities convert 10x better. Here's how the top Cetoh creators build theirs.", author: "Zainab Yusuf", date: "May 14, 2026", readTime: "10 min", tag: "Marketing", tint: "peach" as const },
  { slug: "from-side-hustle-to-six-figures", title: "From side-hustle to six figures: a creator's story", excerpt: "Tunde went from selling Notion templates after work to a ₦18M/yr business in 18 months.", author: "Lerato Mokoena", date: "Apr 30, 2026", readTime: "12 min", tag: "Stories", tint: "rose" as const },
  { slug: "best-tools-for-creators-2026", title: "The best tools for digital creators in 2026", excerpt: "Our hand-picked stack for writers, course creators, and designers shipping today.", author: "Chinedu Eze", date: "Apr 22, 2026", readTime: "7 min", tag: "Tools", tint: "cream" as const },
  { slug: "writing-a-product-page-that-converts", title: "Writing a product page that converts (with examples)", excerpt: "Steal these copy patterns from the top-selling products on Cetoh.", author: "Amara Okafor", date: "Apr 10, 2026", readTime: "9 min", tag: "Copywriting", tint: "mint" as const },
];

export function getBlogIcon(tag: string) {
  switch (tag) {
    case "Strategy": return Target;
    case "Pricing": return DollarSign;
    case "Marketing": return Megaphone;
    case "Copywriting": return PenTool;
    case "Tools": return Wrench;
    default: return FileText;
  }
}

function BlogHome() {
  const [featured, ...rest] = POSTS;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
      <section className="container-page py-16 md:py-24">
        <p className="text-base font-black uppercase tracking-widest text-primary">The Cetoh Blog</p>
        <h1 className="mt-4 font-display text-5xl font-black text-foreground md:text-7xl">Build, sell, grow.</h1>
        <p className="mt-6 max-w-2xl text-lg font-bold text-foreground/80">Tips, playbooks and stories from creators shipping digital products around the world.</p>

        <Link to="/blog/$slug" params={{ slug: featured.slug }} className="mt-12 grid gap-6 overflow-hidden rounded-[3rem] border-[4px] border-border bg-white shadow-vibe transition-transform hover:-translate-y-2 md:grid-cols-2">
          <div className={`flex aspect-[16/10] items-center justify-center p-10 border-b-[4px] md:border-b-0 md:border-r-[4px] border-border ${tintClass(featured.tint)}`}>
            {(() => {
              const Icon = getBlogIcon(featured.tag);
              return <Icon className="h-28 w-28 text-foreground stroke-[2.5]" />;
            })()}
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <span className="rounded-full border-[3px] border-border bg-white px-4 py-1 text-sm font-black text-foreground shadow-vibe-sm self-start">{featured.tag}</span>
            <h2 className="mt-6 font-display text-3xl font-black text-foreground md:text-4xl leading-tight">{featured.title}</h2>
            <p className="mt-4 text-lg font-bold text-foreground/80 leading-relaxed">{featured.excerpt}</p>
            <div className="mt-6 flex items-center gap-4 text-sm font-bold text-foreground/70">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 stroke-[3px]" /> {featured.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 stroke-[3px]" /> {featured.readTime}</span>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-base font-black text-primary">Read article <ArrowRight className="h-5 w-5 stroke-[3px]" /></span>
          </div>
        </Link>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col overflow-hidden rounded-[2.5rem] border-[4px] border-border bg-white transition-transform hover:-translate-y-2 shadow-vibe">
              <div className={`flex aspect-[16/10] items-center justify-center p-6 border-b-[4px] border-border ${tintClass(p.tint)}`}>
                {(() => {
                  const Icon = getBlogIcon(p.tag);
                  return <Icon className="h-20 w-20 text-foreground stroke-[2.5]" />;
                })()}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-8">
                <span className="rounded-full border-[3px] border-border bg-white px-3 py-1 text-xs font-black text-foreground shadow-vibe-sm self-start">{p.tag}</span>
                <h3 className="mt-2 font-display text-xl font-black text-foreground leading-snug">{p.title}</h3>
                <p className="text-[15px] font-bold text-foreground/80 leading-relaxed line-clamp-3">{p.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 pt-4 text-sm font-bold text-foreground/60">
                  <span>{p.author}</span><span>·</span><span>{p.readTime}</span>
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
