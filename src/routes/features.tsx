import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Monitor,
  BookOpen,
  GraduationCap,
  Ticket,
  Star,
  Package,
  Share2,
  LayoutTemplate,
  MailCheck,
  Globe,
  ShieldCheck,
  BarChart3,
  Zap,
  ArrowRight,
  Check,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features | Cetoh" },
      {
        name: "description",
        content:
          "Everything you need to create, sell, and grow your digital products business. Explore all Cetoh features.",
      },
    ],
  }),
  component: FeaturesPage,
});

const categories = [
  {
    Icon: Monitor,
    title: "Sell Any Product Type",
    description: "One platform for every kind of digital product or service.",
    tint: "bg-tint-lilac",
    items: [
      "Digital downloads (PDFs, ZIPs, videos, audio)",
      "Online courses",
      "Templates & software files",
      "Event tickets & masterclass access",
      "Coaching & consulting sessions",
    ],
  },
  {
    Icon: Globe,
    title: "Instant Payouts",
    description: "Accept payments easily from anyone in Nigeria.",
    tint: "bg-tint-mint",
    items: [
      "Instant Naira settlements",
      "Paystack & Flutterwave integration",
      "Bank transfers, USSD & mobile money",
      "Mastercard, Visa, Verve",
      "Google Pay support",
      "Instant bank payouts",
    ],
  },
  {
    Icon: LayoutTemplate,
    title: "Store & Sales Pages",
    description: "Build a stunning storefront without writing a single line of code.",
    tint: "bg-tint-peach",
    items: [
      "Fully branded store page with custom URL",
      "Custom sales & landing pages per product",
      "Mobile-optimised by default",
      "Custom domain (Business plan)",
      "Remove Cetoh branding (Business plan)",
      "SEO-optimised product pages",
    ],
  },
  {
    Icon: Share2,
    title: "Marketing & Growth",
    description: "Built-in tools to help you reach more customers and close more sales.",
    tint: "bg-tint-rose",
    items: [
      "Custom product pages",
      "Automated follow-up email sequences",
      "Automated receipts",
      "Upsell & cross-sell on checkout",
      "Facebook Pixel integration",
      "Sales tracking dashboard",
    ],
  },
  {
    Icon: Zap,
    title: "Integrations",
    description: "Connect Cetoh with the tools you already use.",
    tint: "bg-gold",
    items: [
      "Mailchimp - sync buyers to email lists",
      "Facebook Pixel - track conversions",
      "Webhook support for custom integrations",
    ],
  },
  {
    Icon: BarChart3,
    title: "Sales Tracking",
    description: "Know exactly what's working so you can make smarter decisions.",
    tint: "bg-tint-cream",
    items: [
      "Real-time sales dashboard",
      "Revenue by product & time period",
      "Buyer email tracking",
      "Total downloads count",
      "Customer purchase history",
      "Sales summary export",
    ],
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    title: "Content protection built in",
    body: "Prevent unauthorised sharing of your digital files. Cetoh uses signed URLs and expiring download links so only paying customers can access your content.",
    tag: "Security",
    tint: "bg-tint-rose",
  },
  {
    icon: MailCheck,
    title: "Automated follow-ups that convert",
    body: "Abandoned cart emails, post-purchase upsells, and re-engagement sequences run automatically in the background - proven to increase revenue by 30%.",
    tag: "Marketing",
    tint: "bg-tint-mint",
  },
  {
    icon: GraduationCap,
    title: "Host courses securely",
    body: "Full progress tracking for your students included.",
    tag: "Courses",
    tint: "bg-tint-peach",
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background py-20 text-center md:py-32 border-b-[4px] border-border">
          <div className="pointer-events-none absolute -left-16 top-20 h-64 w-64 rounded-full border-[3px] border-border bg-tint-mint shadow-vibe opacity-60" />
          <div className="pointer-events-none absolute right-10 bottom-10 h-72 w-72 rounded-full border-[3px] border-border bg-tint-peach shadow-vibe opacity-60" />

          <div className="container-page relative z-10">
            <p className="text-base font-black uppercase tracking-[0.25em] text-primary">
              FEATURES
            </p>
            <h1 className="mx-auto mt-6 max-w-5xl font-display text-5xl font-black text-foreground md:text-7xl leading-tight">
              Everything you need to{" "}
              <span className="text-primary relative inline-block">
                succeed
                <div className="absolute -bottom-2 left-0 right-0 h-3 rounded-full bg-tint-rose border-[3px] border-border shadow-vibe-sm -z-10 -rotate-2"></div>
              </span>{" "}
              online
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg font-bold text-foreground/80 md:text-xl">
              Cetoh gives you a complete toolkit - from your first product upload to scaling your
              creator business in Nigeria.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover"
              >
                Start free <ArrowRight className="h-6 w-6 stroke-[3px]" />
              </Link>
              <Link
                to="/pricing"
                preload="intent"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-white px-10 py-5 text-xl font-black text-foreground shadow-vibe shadow-vibe-hover"
              >
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Feature categories grid */}
        <section className="bg-background py-20 md:py-28">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-black text-foreground md:text-6xl">
                All the features, zero compromises
              </h2>
              <p className="mt-6 text-lg font-bold text-foreground/80">
                Every feature is built specifically for Nigerian creators.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className={`rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe transition-transform hover:-translate-y-2`}
                >
                  <div
                    className={`grid h-16 w-16 place-items-center rounded-[1rem] border-[3px] border-border ${cat.tint} shadow-vibe-sm`}
                  >
                    <cat.Icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="mt-8 text-2xl font-black text-foreground">{cat.title}</h3>
                  <p className="mt-3 text-[16px] font-bold text-foreground/75">{cat.description}</p>
                  <ul className="mt-6 space-y-3">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-base font-bold text-foreground/90"
                      >
                        <span className="mt-1 grid shrink-0 place-items-center rounded-full bg-foreground p-[2px] text-white">
                          <Check className="h-3 w-3 stroke-[3px]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight callouts */}
        <section className="bg-background py-20 border-t-[4px] border-border md:py-28">
          <div className="container-page">
            <h2 className="text-center font-display text-4xl font-black text-foreground md:text-6xl">
              Features built to make you money
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className={`rounded-[2.5rem] border-[4px] border-border ${h.tint} p-8 shadow-vibe transition-transform hover:-translate-y-2`}
                >
                  <span className="inline-block rounded-full border-[3px] border-border bg-white px-4 py-1.5 text-sm font-black text-foreground shadow-vibe-sm">
                    {h.tag}
                  </span>
                  <div className="mt-8 grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-border bg-white shadow-vibe-sm">
                    <h.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-foreground">{h.title}</h3>
                  <p className="mt-4 text-[16px] font-bold leading-relaxed text-foreground/90">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product types quick list */}
        <section className="bg-background py-16 md:py-24 border-y-[4px] border-border">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-4xl font-black text-foreground md:text-5xl">
                Sell anything, to anyone
              </h2>
              <p className="mt-4 text-lg font-bold text-foreground/80">
                Six categories of products. One platform.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3">
              {[
                { Icon: Monitor, label: "Digital Products", tint: "bg-tint-lilac" },
                { Icon: BookOpen, label: "Ebooks", tint: "bg-tint-peach" },
                { Icon: GraduationCap, label: "Courses & Tutorials", tint: "bg-tint-mint" },
                { Icon: Ticket, label: "Event Tickets", tint: "bg-tint-rose" },
                { Icon: Star, label: "Services & Coaching", tint: "bg-gold" },
              ].map(({ Icon, label, tint }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border-[3px] border-border bg-white px-5 py-4 shadow-vibe-sm transition-transform hover:-translate-y-1"
                >
                  <div
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-border ${tint} shadow-vibe-sm`}
                  >
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <span className="text-base font-black text-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-background py-20 text-center text-foreground overflow-hidden relative">
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-[30rem] w-[30rem] rounded-full border-[3px] border-border bg-tint-mint shadow-vibe opacity-60" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border-[3px] border-border bg-tint-rose shadow-vibe opacity-60" />

          <div className="container-page relative z-10">
            <h2 className="font-display text-4xl font-black md:text-6xl">
              Start using all these features today
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg font-bold text-foreground/80">
              It takes less than 5 minutes to set up your store and upload your first product.
            </p>
            <div className="mt-12 flex justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover"
              >
                Create free account <ArrowRight className="h-6 w-6 stroke-[3px]" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
