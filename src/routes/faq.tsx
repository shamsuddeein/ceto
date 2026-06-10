import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [
    { title: "FAQ | Frequently Asked Questions | Cetoh" },
    { name: "description", content: "Answers to the most common questions about selling on Cetoh." },
  ] }),
  component: FAQ,
});

const FAQS = [
  { cat: "Getting Started", q: "How do I create an account?", a: "Click Start Selling, enter your name, email and a password. You'll be set up in under 30 seconds - no credit card required." },
  { cat: "Getting Started", q: "What can I sell on Cetoh?", a: "eBooks, online courses, templates, software, design assets, services, audio, and almost any digital good." },
  { cat: "Payments", q: "When do I get paid?", a: "Funds clear within 24 hours of a sale and can be withdrawn to your local bank account. Bank payouts arrive in 1–3 business days." },
  { cat: "Payments", q: "What currencies do you support?", a: "Buyers can pay in 30+ currencies. Creators are paid in USD, EUR, GBP, NGN, KES, GHS, ZAR or local equivalent." },
  { cat: "Payments", q: "What fees do you charge?", a: "Early creators get 0% commission for the first 3 months. After that: 5% + ₦100 per sale. No setup fees, no monthly minimums." },
  { cat: "Products", q: "Is there a file-size limit?", a: "Up to 2GB per file on Starter, 10GB on Pro, and unlimited on Business." },
  { cat: "Products", q: "Can I issue refunds?", a: "Yes, from your order page in one click. Refunded fees are returned to you in full." },
  { cat: "Account", q: "Can I use my own domain?", a: "Yes - connect any custom domain on Pro and Business plans." },
  { cat: "Account", q: "How do I close my account?", a: "Settings → Account → Close account. We'll process any remaining balance and remove your data within 30 days." },
];

function FAQ() {
  const cats = Array.from(new Set(FAQS.map((f) => f.cat)));
  const [open, setOpen] = useState<string | null>(FAQS[0].q);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-12 md:py-16">
        <p className="text-base font-black uppercase tracking-widest text-primary">Support</p>
        <h1 className="mt-4 font-display text-4xl font-black text-foreground md:text-6xl">Frequently asked questions</h1>
        <p className="mt-6 max-w-2xl text-lg font-medium text-foreground/80">Can't find what you're looking for? <Link to="/contact" className="font-bold text-primary hover:underline">Contact us</Link>.</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-[200px_1fr]">
          <aside className="space-y-2 lg:sticky lg:top-32 lg:self-start">
            {cats.map((c) => (
              <a key={c} href={`#${c.toLowerCase().replace(/\s+/g, "-")}`} className="block rounded-xl px-4 py-3 text-base font-bold text-foreground/80 transition-all hover:bg-tint-mint hover:text-foreground hover:translate-x-1">{c}</a>
            ))}
          </aside>
          <div className="space-y-12">
            {cats.map((c) => (
              <div key={c} id={c.toLowerCase().replace(/\s+/g, "-")}>
                <h2 className="font-display text-2xl font-black text-foreground">{c}</h2>
                <ul className="mt-6 divide-y-[3px] divide-border rounded-[2rem] border-[4px] border-border bg-white shadow-vibe overflow-hidden">
                  {FAQS.filter((f) => f.cat === c).map((f) => (
                    <li key={f.q}>
                      <button onClick={() => setOpen(open === f.q ? null : f.q)} className="flex w-full items-center justify-between gap-4 p-6 text-left hover:bg-tint-cream transition-colors">
                        <span className="font-display text-lg font-bold text-foreground">{f.q}</span>
                        {open === f.q ? <Minus className="h-6 w-6 text-foreground stroke-[3px]" /> : <Plus className="h-6 w-6 text-foreground stroke-[3px]" />}
                      </button>
                      {open === f.q && <p className="px-6 pb-6 text-base font-medium leading-relaxed text-foreground/80">{f.a}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
