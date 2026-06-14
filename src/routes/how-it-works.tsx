import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus, Package, Share2, Wallet } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Cetoh Works" },
      { name: "description", content: "From signup to payout in four simple steps." },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    icon: UserPlus,
    t: "Create your account",
    d: "Sign up in 30 seconds. No credit card required, no setup fees.",
  },
  {
    icon: Package,
    t: "Upload your product",
    d: "eBooks, courses, templates, and services. We host the files and deliver them instantly.",
  },
  {
    icon: Share2,
    t: "Share your link",
    d: "Drop your Cetoh link anywhere - Twitter, IG, your bio. We handle the checkout, taxes and delivery.",
  },
  {
    icon: Wallet,
    t: "Get paid",
    d: "Withdraw earnings to your bank account in 1–3 business days. Lowest fees in the industry.",
  },
];

function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <section className="container-page py-16 md:py-24 text-center">
          <p className="text-base font-black uppercase tracking-widest text-primary">
            How it works
          </p>
          <h1 className="mt-4 font-display text-5xl font-black text-foreground md:text-7xl">
            Start selling in minutes.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg font-bold text-foreground/80">
            Four steps from signup to your first payout. No code, no chaos.
          </p>
        </section>
        <section className="container-page pb-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div
                key={s.t}
                className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe transition-transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1rem] border-[3px] border-border bg-tint-mint text-foreground shadow-vibe-sm">
                    <s.icon className="h-8 w-8 stroke-[3px]" />
                  </div>
                  <span className="font-display text-5xl font-black text-foreground/20">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-black text-foreground">{s.t}</h3>
                <p className="mt-4 text-[16px] font-bold text-foreground/80 leading-relaxed">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="container-page py-10">
          <div className="relative overflow-hidden rounded-[4rem] border-[4px] border-border bg-tint-rose shadow-vibe">
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full border-[3px] border-border bg-white shadow-vibe opacity-60" />
            <div className="grid items-center gap-12 p-10 md:grid-cols-2 md:p-16 relative z-10">
              <div>
                <h2 className="font-display text-4xl font-black text-foreground md:text-5xl">
                  Everything you need, included.
                </h2>
                <ul className="mt-8 space-y-4 text-base font-bold text-foreground/90">
                  {[
                    "Hosted product pages with your branding",
                    "Instant secure delivery (PDF, ZIP, MP4)",
                    "Built-in checkout with cards & local payments",
                    "Buyer accounts & re-downloads",
                    "Automated email receipts",
                    "Sales tracking & performance dashboard",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 grid shrink-0 place-items-center rounded-full bg-foreground p-[2px] text-white">
                        <svg
                          viewBox="0 0 12 12"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path
                            d="M2.5 6.5l2.5 2.5 4.5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="mt-10 inline-flex rounded-full border-[3px] border-border bg-primary px-8 py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover"
                >
                  Start free
                </Link>
              </div>
              <div className="aspect-square rounded-[3rem] border-[4px] border-border bg-white shadow-vibe" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
