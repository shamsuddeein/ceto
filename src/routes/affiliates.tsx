import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { ArrowRight, CheckCircle2, TrendingUp, Users, DollarSign, Sparkles } from "lucide-react";

export const Route = createFileRoute("/affiliates")({
  component: AffiliatesPage,
});

function AffiliatesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="container-page relative z-10 text-center">
          <div className="mx-auto mb-8 inline-flex animate-in fade-in slide-in-from-bottom-4 duration-700 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
            <Sparkles className="h-4 w-4" /> Earn up to 50% recurring commissions
          </div>
          <h1 className="text-balance font-display text-5xl font-extrabold tracking-tight sm:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 fill-mode-both">
            Partner with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Cetoh</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 sm:text-xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200 fill-mode-both">
            Join the industry's most lucrative affiliate network. Promote digital products, courses, and software from top creators and get paid directly to your bank account.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
              Apply to the Network <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-foreground transition-all hover:bg-accent hover:border-primary/50">
              Affiliate Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="container-page pb-32">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-surface/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-primary/50 hover:bg-surface/80 hover:shadow-2xl hover:shadow-primary/10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all group-hover:bg-primary/20" />
            <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary ring-1 ring-primary/20">
              <DollarSign className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">High Commissions</h3>
            <p className="text-foreground/70 leading-relaxed">
              Earn anywhere from 20% to 75% on every successful referral. Our creators set the rates, but our network enforces high conversion standards.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-surface/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-blue-500/50 hover:bg-surface/80 hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />
            <div className="mb-6 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-500 ring-1 ring-blue-500/20">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">High Conversion Rates</h3>
            <p className="text-foreground/70 leading-relaxed">
              Cetoh's highly optimized checkout flows mean your traffic actually converts. Stop sending your hard-earned traffic to leaky funnels.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-3xl border border-border/50 bg-surface/40 p-8 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-purple-500/50 hover:bg-surface/80 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl transition-all group-hover:bg-purple-500/20" />
            <div className="mb-6 inline-flex rounded-2xl bg-purple-500/10 p-4 text-purple-500 ring-1 ring-purple-500/20">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">Real-time Analytics</h3>
            <p className="text-foreground/70 leading-relaxed">
              Track your clicks, conversions, and payouts in real-time. Our pro dashboard gives you the crystal clear data you need to scale your campaigns.
            </p>
          </div>
        </div>
      </section>
      
      {/* How it works */}
      <section className="relative border-t border-border/50 bg-surface/30 py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container-page relative z-10">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl font-bold sm:text-5xl">How to start earning</h2>
            <p className="mx-auto max-w-2xl text-lg text-foreground/70">Three simple steps to build your passive income machine.</p>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10" />
            
            {[
              { title: "Join the Network", desc: "Sign up for a free affiliate account. Approval is instant for verified creators and marketers." },
              { title: "Find Products", desc: "Browse the marketplace and generate unique, un-blockable tracking links for products." },
              { title: "Get Paid", desc: "Share your links. When someone buys, you get paid automatically to your bank account." }
            ].map((step, i) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border-8 border-background bg-primary text-xl font-bold text-primary-foreground shadow-xl shadow-primary/20 relative z-10 transition-transform hover:scale-110">
                  <CheckCircle2 className="h-10 w-10" />
                  <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background font-bold text-primary shadow-sm border border-border">
                    {i + 1}
                  </div>
                </div>
                <h4 className="mb-3 text-2xl font-bold">{step.title}</h4>
                <p className="text-foreground/70 leading-relaxed max-w-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
