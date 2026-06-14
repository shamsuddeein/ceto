import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  ChevronDown,
  Globe,
  Search,
  ShoppingCart,
  Monitor,
  BookOpen,
  GraduationCap,
  Ticket,
  Star,
  Package,
  Briefcase,
  Check,
  ArrowRight,
  Share2,
  LayoutTemplate,
  MailCheck,
  ChevronLeft,
  ChevronRight,
  Quote,
  Menu,
  X as XClose,
  Code2,
  CreditCard,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { SiMastercard, SiVisa, SiFacebook, SiInstagram, SiX } from "@icons-pack/react-simple-icons";
import setupPerson from "@/assets/setup-person-cartoon.png";
import avatarImg from "@/assets/avatar.png";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types";
import { products as mockProducts } from "@/lib/mock-data";
import { getProductIcon, tintClass } from "@/lib/mock-products";

/* ---------- Reusable ---------- */
function PrimaryButton({
  children,
  className = "",
  to,
  href,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const cn = `inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-10 py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover ${className}`;
  if (to)
    return (
      <Link to={to} className={cn} {...rest}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cn} {...rest}>
        {children}
      </a>
    );
  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
}

function GhostButton({
  children,
  className = "",
  to,
  href,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const cn = `inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-white px-10 py-4 text-lg font-black text-foreground shadow-vibe shadow-vibe-hover ${className}`;
  if (to)
    return (
      <Link to={to} className={cn} {...rest}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cn} {...rest}>
        {children}
      </a>
    );
  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  );
}
/* ---------- Brand wordmarks (no SVG available) ---------- */
/* ---------- Marketplace explore ---------- */
const products = [
  {
    tint: "bg-tint-lilac",
    title: "Milk and Honey by Rupi Kaur [eBook]",
    price: "₦4,500.00",
    Icon: BookOpen,
  },
  { tint: "bg-tint-mint", title: "Course", price: "₦30,000.00", Icon: GraduationCap },
  { tint: "bg-tint-peach", title: "Subscription", price: "₦42,000.00", Icon: Star },
  { tint: "bg-tint-cream", title: "Coaching service", price: "₦90,000.00", Icon: Briefcase },
  { tint: "bg-tint-mint", title: "Good Vibes Tee", price: "₦5,000.00", Icon: Package },
  { tint: "bg-tint-rose", title: "Event Ticket", price: "₦10,000.00", Icon: Ticket },
];

function MarketplaceExplore() {
  const products = mockProducts;

  const displayProducts =
    products.length >= 6
      ? products.slice(0, 6)
      : [
          ...products,
          ...[
            { title: "Digital eBook", price: 4500, type: "ebook" },
            { title: "Video Course", price: 30000, type: "course" },
            { title: "Notion Template", price: 15000, type: "template" },
            { title: "1-on-1 Coaching", price: 90000, type: "service" },
            { title: "Design Assets", price: 5000, type: "software" },
            { title: "Event Ticket", price: 10000, type: "ticket" },
          ],
        ].slice(0, 6);

  return (
    <section className="bg-background py-16 md:py-24 relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-border bg-tint-mint shadow-vibe opacity-40" />
      <div className="container-page relative z-10 animate-fade-in-up">
        <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border-[4px] border-border bg-background shadow-vibe relative z-10 flex flex-col pointer-events-none select-none">
          {/* Browser Header */}
          <div className="flex items-center justify-between border-b-[4px] border-border bg-tint-cream px-6 py-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full border-[2.5px] border-border bg-tint-rose"></div>
              <div className="h-3 w-3 rounded-full border-[2.5px] border-border bg-gold"></div>
              <div className="h-3 w-3 rounded-full border-[2.5px] border-border bg-tint-mint"></div>
            </div>
            <div className="flex h-8 w-1/2 max-w-xs items-center justify-center rounded-full border-[3px] border-border bg-white text-xs font-bold text-foreground/70">
              cetoh.com/demo
            </div>
            <div className="w-12"></div>
          </div>
          {/* Browser Content */}
          <div className="flex flex-col md:flex-row">
            <div className="hidden md:block w-64 border-r-[4px] border-border bg-white p-8">
              <img
                src={avatarImg}
                alt="Creator Profile"
                loading="lazy"
                width="80"
                height="80"
                className="h-20 w-20 rounded-full border-[4px] border-border object-cover shadow-vibe-sm mb-6 bg-white"
              />
              <h2 className="font-display text-2xl font-black">Cetoh Market</h2>
              <p className="mt-4 text-sm font-bold text-foreground/70 leading-relaxed">
                Turn what you know into income. We handle payments, delivery, and everything else.
              </p>
              <div className="mt-6 flex gap-4">
                <SiInstagram className="h-5 w-5 text-foreground/60 transition-colors hover:text-primary cursor-pointer" />
                <SiX className="h-5 w-5 text-foreground/60 transition-colors hover:text-primary cursor-pointer" />
                <SiFacebook className="h-5 w-5 text-foreground/60 transition-colors hover:text-primary cursor-pointer" />
              </div>
            </div>
            {/* Main Area */}
            <div className="flex-1 bg-muted/30 p-6 md:p-8">
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex w-full max-w-md items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-2.5 shadow-vibe-sm">
                  <Search className="h-4 w-4 stroke-[3px] text-foreground/40" />
                  <span className="text-sm font-bold text-foreground/70">Search products...</span>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex-1 sm:flex-none rounded-xl border-[3px] border-border bg-white px-4 py-2.5 text-center text-sm font-black shadow-vibe-sm cursor-pointer hover:bg-muted/50">
                    NGN ▾
                  </div>
                  <div className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-tint-mint px-4 py-2.5 text-sm font-black shadow-vibe-sm cursor-pointer hover:-translate-y-1 transition-transform">
                    <ShoppingCart className="h-4 w-4 stroke-[3px]" /> Cart{" "}
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-white">
                      3
                    </span>
                  </div>
                </div>
              </div>
              {/* Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {displayProducts.map((item: Product, i: number) => {
                  const Icon = getProductIcon(item.product_type || item.type || "ebook");
                  return (
                    <Link
                      to={item.id ? "/products/$id" : "/marketplace"}
                      params={item.id ? { id: String(item.id) } : {}}
                      key={i}
                      className={`flex flex-col rounded-[1.5rem] border-[4px] border-border ${tintClass((i % 4) as 0 | 1 | 2 | 3)} p-4 shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe cursor-pointer relative overflow-hidden`}
                    >
                      <div className="flex h-28 items-center justify-center rounded-xl border-[3px] border-border bg-white relative overflow-hidden">
                        {item.cover_image ? (
                          <img
                            src={item.cover_image}
                            alt={item.title}
                            width="400"
                            height="200"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <Icon className="h-10 w-10 stroke-[2.5] text-foreground relative z-10" />
                        )}
                      </div>
                      <h3 className="mt-4 font-black line-clamp-1">{item.title}</h3>
                      <p className="mt-1 text-sm font-bold text-foreground/70">
                        ₦{Number(item.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sellable types ---------- */
const sellTypes = [
  {
    Icon: Monitor,
    title: "Digital Products",
    body: "Sell digital downloads, software, templates, and content packs instantly.",
  },
  {
    Icon: BookOpen,
    title: "Ebooks",
    body: "Sell PDFs, EPUBs, and audiobooks securely with automatic delivery.",
  },
  {
    Icon: GraduationCap,
    title: "Courses & Tutorials",
    body: "Host video courses and private communities with built-in content protection.",
  },
  {
    Icon: Ticket,
    title: "Event Tickets",
    body: "Sell access to webinars, workshops, and physical events.",
  },
  {
    Icon: Star,
    title: "Services",
    body: "Book 1-on-1 coaching, consultations, or freelance design services.",
  },
];

function SellableTypes() {
  const tints = [
    "bg-tint-mint",
    "bg-tint-peach",
    "bg-tint-rose",
    "bg-tint-cream",
    "bg-tint-lilac",
    "bg-tint-mint",
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-surface py-20 md:py-28 border-y-2 border-border"
    >
      <div className="absolute right-10 top-10 hidden lg:block">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-2 border-border bg-gold shadow-vibe" />
          <div className="absolute left-3 top-3 h-16 w-16 rounded-full border-2 border-border bg-tint-mint" />
        </div>
      </div>
      <div className="container-page animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-black leading-tight md:text-5xl">
            Sell any kind of{" "}
            <span className="relative inline-block px-2">
              <span className="relative z-10 text-primary">product</span>
              <div className="absolute bottom-1 left-0 right-0 h-3 bg-tint-peach -rotate-2"></div>
            </span>
            ,
            <br className="hidden sm:block" /> service or template
          </h2>
          <p className="mt-5 text-lg font-medium text-foreground/80 md:text-xl">
            Everything you need to launch and run your online business from a single dashboard.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sellTypes.map((t, i) => (
            <div
              key={t.title}
              className={`rounded-[2rem] border-2 border-border ${tints[i]} p-8 shadow-vibe transition-transform hover:-translate-y-1`}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-white shadow-vibe-sm">
                <t.Icon className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-foreground">{t.title}</h3>
              <p className="mt-3 text-[16px] font-medium leading-relaxed text-foreground/80">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Setup steps ---------- */
function SetupSteps() {
  const steps = [
    {
      title: "Sign up and add your bank details",
      body: "Create your account and connect your Nigerian bank account.",
    },
    { title: "Upload your products", body: "Customize your storefront and set your pricing." },
    {
      title: "Share your link and get paid",
      body: "Send your store link to your audience and receive payments directly.",
    },
  ];
  return (
    <section
      id="how"
      className="relative overflow-hidden bg-background py-20 md:py-28 border-y-2 border-border"
    >
      <div className="container-page animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="text-center">
          <h2 className="font-display text-4xl font-black md:text-5xl">
            Start selling in three steps
          </h2>
          <div className="mx-auto mt-6 h-2 w-20 rounded-full border-2 border-border bg-tint-peach shadow-vibe-sm" />
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          <ol className="relative space-y-8">
            {steps.map((s, i) => (
              <li
                key={i}
                className="relative flex gap-6 rounded-[2rem] border-2 border-border bg-white p-6 shadow-vibe"
              >
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-border bg-tint-mint text-foreground shadow-vibe-sm">
                  <Check className="h-6 w-6 font-bold" />
                </span>
                <div>
                  <h3 className="text-xl font-black text-foreground md:text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-[16px] font-medium leading-relaxed text-foreground/80">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
            <li className="pl-6 pt-4">
              <PrimaryButton to="/signup">
                Find out More <ArrowRight className="h-5 w-5" />
              </PrimaryButton>
            </li>
          </ol>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -right-6 -bottom-6 h-full w-full rounded-[2.5rem] border-2 border-border bg-tint-peach shadow-vibe" />
            <img
              src={setupPerson}
              alt="Creator setting up Cetoh store on phone"
              width={1024}
              height={1280}
              loading="lazy"
              className="relative w-full rounded-[2rem] border-2 border-border object-cover shadow-vibe bg-white"
            />
            <div className="absolute -bottom-6 left-4 w-[85%] max-w-sm rounded-[1.5rem] border-2 border-border bg-white p-6 shadow-vibe rotate-3 sm:left-auto sm:-bottom-10 sm:-left-10">
              <h4 className="text-lg font-black text-foreground">Connect your bank account</h4>
              <p className="mt-2 text-sm font-medium leading-relaxed text-foreground/80">
                Enter your details to start receiving payments directly to your bank account.
              </p>
              <button className="mt-4 rounded-full border-2 border-border bg-tint-mint px-6 py-2.5 text-sm font-bold text-foreground shadow-vibe-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--color-border)] transition-all">
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Payment gateways ---------- */
const PaystackMark = () => (
  <span className="inline-flex items-center gap-1.5 font-extrabold text-foreground">
    <span
      className="grid h-6 w-6 place-items-center rounded-full bg-[#00c3f7] text-xs font-black text-white"
      aria-hidden="true"
    >
      P
    </span>
    Paystack
  </span>
);
const FlutterwaveMark = () => (
  <span className="inline-flex items-center gap-1.5 font-extrabold text-foreground">
    <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#f5a623" />
      <path
        d="M8 20 Q12 10 16 16 Q20 22 24 12"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
    Flutterwave
  </span>
);

type Gate = { node: React.ReactNode; key: string };
const gateways: Gate[] = [
  { key: "paystack", node: <PaystackMark /> },
  { key: "flutterwave", node: <FlutterwaveMark /> },
];

function GlobeViz() {
  const cx = 300,
    cy = 200,
    r = 170;
  const dots = useMemo(() => {
    const items: React.ReactNode[] = [];
    const step = 11;
    for (let row = 0; row <= Math.ceil((2 * r) / step); row++) {
      for (let col = 0; col <= Math.ceil((2 * r) / step); col++) {
        const x = cx - r + col * step;
        const y = cy - r + row * step;
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        if (dist < r - 4) {
          const op = parseFloat((0.07 + 0.4 * (1 - dist / r)).toFixed(2));
          items.push(
            <circle key={`${row}-${col}`} cx={x} cy={y} r="1.8" fill="currentColor" opacity={op} />,
          );
        }
      }
    }
    return items;
  }, []);
  const latOffsets = [-130, -85, -40, 10, 60, 110];
  return (
    <svg viewBox="0 0 600 400" className="h-auto w-full text-primary">
      <defs>
        <radialGradient id="gGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.13" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.03" />
        </radialGradient>
        <clipPath id="gClip">
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="url(#gGrad)" />
      {dots}
      {latOffsets.map((off, i) => {
        const ly = cy + off;
        const rx = Math.sqrt(Math.max(0, r * r - off * off));
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={ly}
            rx={rx * 0.92}
            ry={rx * 0.14}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.18"
            clipPath="url(#gClip)"
          />
        );
      })}
      <path
        d="M 155 315 Q 265 90 445 210"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M 190 340 Q 305 125 455 235"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M 168 250 Q 248 125 388 160"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      {(
        [
          [155, 315],
          [445, 210],
          [190, 340],
          [455, 235],
          [168, 250],
          [388, 160],
          [300, 78],
        ] as [number, number][]
      ).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="currentColor" opacity="0.85" />
      ))}
    </svg>
  );
}

function PaymentGateways() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 rounded-full border-2 border-border bg-tint-lilac shadow-vibe opacity-60" />
      <div className="pointer-events-none absolute right-10 top-20 h-20 w-20 rotate-12 rounded-lg border-2 border-border bg-tint-peach shadow-vibe-sm opacity-60" />

      <div
        className="container-page relative animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-black leading-tight md:text-5xl">
            Local payments that <br className="hidden sm:block" />{" "}
            <span className="text-primary">actually work</span>
          </h2>
          <div className="mx-auto mt-6 h-2 w-20 rounded-full border-2 border-border bg-tint-rose shadow-vibe-sm" />
          <p className="mt-6 text-[16px] font-medium leading-relaxed text-foreground/80 md:text-lg">
            We support Paystack and Flutterwave so your customers never struggle to check out. Get
            settled instantly in Naira.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {gateways.map((g) => (
            <div
              key={g.key}
              className="grid h-24 place-items-center rounded-[1.5rem] border-2 border-border bg-white px-3 shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe"
            >
              {g.node}
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-20 max-w-4xl overflow-hidden rounded-[3rem] border-[3px] border-border bg-white p-8 shadow-vibe md:p-12 flex flex-col items-center">
          {/* Floating Badges */}
          <div className="absolute top-8 left-8 z-10 rotate-[-6deg] rounded-full border-[3px] border-border bg-tint-mint px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm hidden sm:block">
            🇳🇬 Proudly Nigerian
          </div>
          <div className="absolute bottom-12 left-10 z-10 rotate-[4deg] rounded-full border-[3px] border-border bg-tint-peach px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm hidden sm:block">
            ⚡ Instant Payouts
          </div>
          <div className="absolute top-1/3 right-8 z-10 rotate-[-2deg] rounded-2xl border-[3px] border-border bg-white p-3 shadow-vibe flex flex-col items-center hidden md:flex">
            <span className="font-display font-black text-3xl text-foreground text-primary">₦</span>
            <span className="text-xs font-bold text-foreground/70 uppercase text-center mt-1">
              Direct to
              <br />
              Bank
            </span>
          </div>

          <div className="relative flex h-64 w-full max-w-md items-center justify-center">
            {/* Naira visual instead of Globe */}
            <div className="absolute inset-0 rounded-full bg-tint-mint/20 blur-3xl"></div>
            <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border-[4px] border-border bg-primary shadow-vibe">
              <span className="font-display text-8xl font-black text-white">₦</span>
            </div>
            {/* Decorative rings */}
            <div className="absolute h-56 w-56 rounded-full border-2 border-dashed border-border opacity-30 animate-spin-slow"></div>
            <div className="absolute h-72 w-72 rounded-full border border-border opacity-20"></div>
          </div>

          <div className="relative z-10 mt-6 text-center max-w-md">
            <h3 className="font-display text-2xl font-black text-foreground">
              Settle directly in Naira
            </h3>
            <p className="mt-2 text-[15px] font-medium leading-relaxed text-foreground/80">
              No more foreign exchange headaches or delayed international wires. Get your sales
              deposited directly into your local Nigerian bank account instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Sales tools ---------- */
function SalesTools() {
  const tools = [
    {
      Icon: Zap,
      title: "Instant Payouts",
      body: "Get paid automatically to your Nigerian bank account as soon as you make a sale.",
      tint: "bg-gold",
    },
    {
      Icon: LayoutTemplate,
      title: "Custom Storefronts",
      body: "Build high-converting landing pages for your products without writing any code.",
      tint: "bg-tint-rose",
    },
    {
      Icon: MailCheck,
      title: "Automated Follow-ups",
      body: "Recover abandoned carts and follow up with buyers automatically.",
      tint: "bg-tint-mint",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 border-y-2 border-border">
      <div className="pointer-events-none absolute -left-20 top-10 h-40 w-40 rounded-full border-2 border-border bg-tint-peach shadow-vibe opacity-80" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-40 w-40 rounded-full border-2 border-border bg-tint-mint shadow-vibe opacity-80" />
      <div
        className="container-page relative animate-fade-in-up"
        style={{ animationDelay: "400ms" }}
      >
        <h2 className="text-center font-display text-4xl font-black md:text-5xl">
          Built to drive <span className="text-primary">conversions</span>
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tools.map((t) => (
            <article
              key={t.title}
              className={`relative rounded-[2rem] border-2 border-border ${t.tint} p-8 shadow-vibe hover:-translate-y-1 transition-transform`}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-white shadow-vibe-sm">
                <t.Icon className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="mt-8 text-2xl font-black text-foreground">{t.title}</h3>
              <p className="mt-3 text-[16px] font-medium leading-relaxed text-foreground/80">
                {t.body}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <PrimaryButton to="/features">
            See all features <ArrowRight className="h-5 w-5" />
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- Core Features ---------- */
function Integrations() {
  const features = [
    {
      Icon: CreditCard,
      title: "Paystack payments",
      body: "Accept naira payments instantly",
      tint: "bg-tint-lilac",
    },
    {
      Icon: Zap,
      title: "Automatic delivery",
      body: "Files sent automatically after payment",
      tint: "bg-tint-peach",
    },
    {
      Icon: LayoutDashboard,
      title: "Creator dashboard",
      body: "Track sales and withdraw earnings",
      tint: "bg-tint-mint",
    },
  ];
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28 border-t-2 border-border">
      <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full border-2 border-border bg-tint-rose shadow-vibe opacity-60" />
      <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rotate-45 rounded-lg border-2 border-border bg-gold shadow-vibe-sm opacity-60" />

      <div
        className="container-page relative animate-fade-in-up"
        style={{ animationDelay: "500ms" }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className={`rounded-[2rem] border-2 border-border ${f.tint} p-8 shadow-vibe text-center hover:-translate-y-1 transition-transform`}
            >
              <div className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-white shadow-vibe-sm">
                <f.Icon className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-black text-foreground">{f.title}</h3>
              <p className="mt-3 text-[16px] font-medium leading-relaxed text-foreground/80">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stats & Final CTA ---------- */
function PressAndFinalCTA() {
  const stats = [
    { value: "10 min", label: "Time to set up your store" },
    { value: "90%", label: "Of every sale goes to you" },
    { value: "₦0", label: "Cost to get started" },
  ];
  return (
    <section id="start" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div
        className="container-page relative animate-fade-in-up"
        style={{ animationDelay: "800ms" }}
      >
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-5xl font-black text-primary md:text-6xl">{s.value}</p>
              <p className="mt-3 text-lg font-bold text-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-24 mx-auto max-w-4xl overflow-hidden rounded-[4rem] border-[4px] border-border bg-tint-mint px-6 py-24 text-center shadow-vibe md:px-16">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[3px] border-border bg-tint-rose shadow-vibe-sm opacity-50" />

          <h2 className="relative z-10 mx-auto max-w-md font-display text-5xl font-black text-foreground leading-tight md:text-6xl">
            Start Selling on Cetoh
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-sm text-xl font-medium text-foreground/80">
            Create a free account in less than 5 minutes and start selling!
          </p>

          <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover"
            >
              Get started for free <ArrowRight className="h-6 w-6" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center rounded-full border-[3px] border-border bg-white px-10 py-5 text-xl font-black text-foreground shadow-vibe shadow-vibe-hover"
            >
              See a live demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomeSections() {
  return (
    <>
      <MarketplaceExplore />
      <SellableTypes />
      <SetupSteps />
      <PaymentGateways />
      <SalesTools />
      <Integrations />
      <PressAndFinalCTA />
    </>
  );
}
