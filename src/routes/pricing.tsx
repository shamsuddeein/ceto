import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [
    { title: "Pricing & Fees | Cetoh" },
    { name: "description", content: "One simple plan. We only make money when you make money." },
  ] }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-16 md:py-24 text-center">
        <p className="text-base font-black uppercase tracking-widest text-primary">Pricing</p>
        <h1 className="mt-4 font-display text-5xl font-black text-foreground md:text-7xl">One simple flat rate.</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-foreground/80">Start free. We only make money when you make money. No setup fees, no monthly subscriptions.</p>
      </section>
      <section className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden flex flex-col items-center rounded-[4rem] border-[4px] border-border bg-tint-mint p-10 text-center text-foreground shadow-vibe md:p-16">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full border-[3px] border-border bg-tint-peach shadow-vibe opacity-80" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full border-[3px] border-border bg-white shadow-vibe opacity-50" />
            
            <h2 className="relative z-10 font-display text-4xl font-black">Creator Plan</h2>
            <p className="relative z-10 mt-3 text-lg font-bold text-foreground/80">Everything you need to sell digital products.</p>
            <p className="relative z-10 mt-10 font-display text-8xl font-black">10%</p>
            <p className="relative z-10 mt-2 text-lg font-black text-foreground/80 uppercase tracking-wide">per successful sale</p>
            <ul className="relative z-10 mt-12 grid gap-6 text-base font-bold sm:grid-cols-2 text-left w-full max-w-lg">
              {[
                "Unlimited products",
                "Instant automated delivery",
                "Secure Paystack integration",
                "Sales & Earnings analytics",
                "No monthly subscription fees",
                "No feature gating"
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-white shadow-vibe-sm">
                    <Check className="h-5 w-5 text-foreground stroke-[3px]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/signup" className="relative z-10 mt-16 w-full max-w-md rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover transition-transform hover:-translate-y-1">
              Start selling today
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl rounded-[3rem] border-[4px] border-border bg-white p-8 shadow-vibe md:p-12 relative overflow-hidden">
          <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rotate-[15deg] rounded-lg border-[3px] border-border bg-gold shadow-vibe opacity-50" />
          
          <h2 className="relative z-10 font-display text-3xl font-black text-foreground">Payment Gateway Fees</h2>
          <p className="relative z-10 mt-4 text-lg font-medium text-foreground/80 leading-relaxed">Cetoh partners with Paystack to securely process all transactions. Paystack charges a standard payment processing fee which is deducted from the total transaction amount before your payout.</p>
          
          <div className="relative z-10 mt-10 rounded-2xl bg-tint-cream border-[3px] border-border p-8 shadow-vibe-sm">
            <h3 className="text-lg font-black text-foreground">Paystack Processing Fee</h3>
            <p className="mt-2 text-4xl font-black text-foreground">1.5% + ₦100</p>
            <p className="mt-2 text-sm font-bold text-foreground/80">Capped at ₦2,000 per transaction.</p>
          </div>
          
          <div className="relative z-10 mt-8 flex items-start gap-6 rounded-2xl border-[3px] border-border bg-tint-rose p-8 shadow-vibe-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-border bg-white text-foreground shadow-vibe-sm">
              <span className="text-xl font-black">₦</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-foreground">How the payout works</h4>
              <p className="mt-4 text-base font-medium leading-relaxed text-foreground/90">
                If you sell an eBook for <strong className="font-black">₦10,000</strong>:<br/>
                <span className="block mt-2 font-bold">• Paystack processing fee: ₦250 (1.5% + ₦100)</span>
                <span className="block mt-1 font-bold">• Cetoh flat fee: ₦1,000 (10%)</span>
                <span className="block mt-4 text-xl font-black text-primary">You receive: ₦8,750 directly to your bank account.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
