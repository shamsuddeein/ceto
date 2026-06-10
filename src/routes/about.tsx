import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Users, TrendingUp, Heart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Cetoh | Nigeria's home for digital creators" },
    { name: "description", content: "Cetoh is the simplest platform helping Nigerian creators to sell digital products." },
  ] }),
  component: About,
});

function About() {
  const stats = [
    { v: "Early", l: "Access" }, { v: "0%", l: "Commission" }, { v: "3", l: "Months Free" }, { v: "₦0", l: "Setup Cost" },
  ];
  const values = [
    { icon: Globe, t: "Built for Nigeria", d: "Instant Naira payouts and local integrations so Nigerian creators can thrive." },
    { icon: Users, t: "Creator-first", d: "Lowest fees in the industry. Your audience, your data, your business." },
    { icon: TrendingUp, t: "Growth-focused", d: "Built-in marketing and sales tools to help you grow your business." },
    { icon: Heart, t: "Real support", d: "Human help, fast. Plus a community of creators who've been where you are." },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-16 md:py-24 text-center">
        <p className="text-base font-black uppercase tracking-widest text-primary">Our story</p>
        <h1 className="mt-4 font-display text-5xl font-black text-foreground md:text-7xl">Empowering Nigerian creators.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-foreground/80">Cetoh started in 2022 with a simple belief: anyone with knowledge to share should be able to build a business from it - without paying gatekeepers a fortune.</p>
      </section>
      <section className="border-y-[4px] border-border bg-tint-mint text-foreground">
        <div className="container-page grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <p className="font-display text-4xl font-black md:text-6xl">{s.v}</p>
              <p className="mt-3 text-base font-bold text-foreground/80 uppercase tracking-wide">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-page py-20 md:py-28">
        <h2 className="font-display text-4xl font-black text-foreground md:text-5xl text-center">What we believe</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const tints = ["bg-tint-peach", "bg-tint-rose", "bg-tint-lilac", "bg-tint-cream"];
            return (
              <div key={v.t} className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe-sm transition-transform hover:-translate-y-2">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-border ${tints[i % tints.length]} text-foreground shadow-vibe-sm`}><v.icon className="h-6 w-6" /></div>
                <h3 className="mt-8 font-display text-2xl font-black text-foreground">{v.t}</h3>
                <p className="mt-3 text-[16px] font-bold text-foreground/80">{v.d}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="container-page pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-[4rem] border-[4px] border-border bg-tint-peach p-12 text-center shadow-vibe md:p-20">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[3px] border-border bg-tint-rose shadow-vibe opacity-60" />
          <h2 className="relative z-10 font-display text-4xl font-black text-foreground md:text-5xl">Start building your business today.</h2>
          <Link to="/signup" className="relative z-10 mt-10 inline-flex rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover">Start selling free</Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
