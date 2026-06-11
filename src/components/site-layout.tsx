import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Globe, Menu, X as XClose } from "lucide-react";
import { SiInstagram, SiX, SiFacebook, SiYoutube } from "@icons-pack/react-simple-icons";
import logoImg from "@/assets/logo.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

/* ---------- Logo ---------- */
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <img
      src={logoImg}
      alt="Cetoh"
      className={`h-10 w-auto object-contain ${light ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

/* ---------- Site Header ---------- */
const NAV = [
  { label: "How it Works", href: "/#how" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/features", caret: true, items: [{label: "Digital Downloads", href: "/features"}, {label: "Online Courses", href: "/features"}, {label: "Community", href: "/features"}] },
  { label: "Learn", href: "/#learn", caret: true, items: [{label: "Creator Academy", href: "/faq"}, {label: "Helpdesk", href: "/contact"}, {label: "Blog", href: "/blog"}] },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-6 z-50 px-4 md:px-8">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between gap-6 rounded-full border-[3px] border-border bg-white px-6 shadow-vibe md:px-8">
        <Link to="/" aria-label="Cetoh home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            n.caret ? (
              <DropdownMenu key={n.label}>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 text-base font-bold text-foreground/80 transition hover:text-foreground focus:outline-none data-[state=open]:text-foreground">
                  {n.label}
                  <ChevronDown className="h-4 w-4 stroke-[3px]" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 rounded-2xl border-2 border-border shadow-vibe p-2 font-bold text-foreground">
                  {n.items?.map((item) => (
                    <DropdownMenuItem key={item.label} asChild className="rounded-xl focus:bg-tint-mint focus:text-foreground">
                      <Link to={item.href} preload="intent" className="w-full cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a
                key={n.label}
                href={n.href}
                className="inline-flex items-center gap-1 text-base font-bold text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {n.label}
              </a>
            )
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-white px-6 py-2.5 text-base font-black text-foreground shadow-vibe shadow-vibe-hover"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-6 py-2.5 text-base font-black text-white shadow-vibe shadow-vibe-hover"
          >
            Start Selling
          </Link>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-border text-foreground shadow-vibe-sm lg:hidden hover:bg-tint-mint transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-layout-mobile-menu"
        >
          {open ? <XClose className="h-6 w-6 stroke-[3px]" /> : <Menu className="h-6 w-6 stroke-[3px]" />}
        </button>
      </div>
      {open && (
        <div id="site-layout-mobile-menu" className="mx-auto mt-4 max-w-7xl overflow-hidden rounded-[2rem] border-[3px] border-border bg-white shadow-vibe lg:hidden">
          <div className="flex flex-col gap-2 p-6">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="rounded-xl px-2 py-2 text-lg font-black text-foreground hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-full border-[3px] border-border px-5 py-3 text-center text-lg font-black shadow-vibe shadow-vibe-hover"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="rounded-full border-[3px] border-border bg-primary px-5 py-3 text-center text-lg font-black text-white shadow-vibe shadow-vibe-hover"
              >
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Site Footer ---------- */
const FOOTER_COLS = [
  {
    title: "Products",
    links: [
      { label: "How it Works", href: "/#how" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },

      { label: "Sell Courses", href: "/features" },
      { label: "Tickets", href: "/features" },
      { label: "Integrations", href: "/features" },

    ],
  },
  {
    title: "Support & Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact Support", href: "/contact" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-background py-20 border-t-[4px] border-border">
      <div className="pointer-events-none absolute -left-20 -bottom-32 h-80 w-80 rounded-full border-[3px] border-border bg-tint-rose shadow-vibe opacity-60" />
      <div className="pointer-events-none absolute right-10 top-10 h-32 w-32 rotate-12 rounded-lg border-[3px] border-border bg-gold shadow-vibe opacity-60" />
      
      <div className="container-page relative grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.2fr_1fr]">
        <div>
          <Logo className="h-12" />
          <div className="mt-8 flex items-center gap-5 text-foreground">
            <SiInstagram className="h-8 w-8 hover:scale-110 transition-transform" aria-label="Instagram" />
            <SiX className="h-8 w-8 hover:scale-110 transition-transform" aria-label="X (Twitter)" />
            <SiFacebook className="h-8 w-8 hover:scale-110 transition-transform" aria-label="Facebook" />
            <SiYoutube className="h-8 w-8 hover:scale-110 transition-transform" aria-label="YouTube" />
          </div>

          <p className="mt-8 text-base font-bold text-foreground/70">© {new Date().getFullYear()} Cetoh. All Rights Reserved.</p>
        </div>
        {FOOTER_COLS.map((c) => (
          <div key={c.title}>
            <h4 className="text-xl font-black text-foreground">{c.title}</h4>
            <ul className="mt-6 space-y-4">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} preload="intent" className="text-[16px] font-bold text-foreground/80 transition hover:text-foreground hover:underline decoration-2 underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
