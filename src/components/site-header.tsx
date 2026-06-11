import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X as XClose, Search, ShoppingCart } from "lucide-react";
import logoImg from "@/assets/logo.png";

const ROUTES = [
  { label: "Marketplace", to: "/marketplace" as const },
  { label: "Categories", to: "/categories" as const },
  { label: "Pricing", to: "/pricing" as const },
  { label: "How it Works", to: "/how-it-works" as const },
  { label: "Blog", to: "/blog" as const },
];

const SECONDARY = [
  { label: "About", to: "/about" as const },
  { label: "FAQ", to: "/faq" as const },
  { label: "Contact", to: "/contact" as const },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Cetoh home" className="shrink-0">
          <img src={logoImg} alt="Cetoh" className="h-10 w-auto object-contain" />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {ROUTES.map((n) => (
            <Link key={n.label} to={n.to} preload="intent" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/search" aria-label="Search products" className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/70 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/checkout" aria-label="View cart" className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/70 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link to="/login" className="rounded-md border border-border px-4 py-2 text-sm font-semibold hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Log In</Link>
          <Link to="/signup" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">Start Selling</Link>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary/20 text-primary lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-mobile-menu"
        >
          {open ? <XClose className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div id="site-mobile-menu" className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            <div className="mb-3 flex items-center gap-2">
              <Link to="/search" onClick={() => setOpen(false)} className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold">
                <Search className="h-4 w-4" /> Search
              </Link>
              <Link to="/checkout" onClick={() => setOpen(false)} aria-label="View cart" className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </div>
            {ROUTES.map((n) => (
              <Link key={n.label} to={n.to} preload="intent" className="rounded-md px-2 py-3 text-base font-medium hover:bg-muted" onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            <div className="my-2 border-t border-border" />
            {SECONDARY.map((n) => (
              <Link key={n.label} to={n.to} preload="intent" className="rounded-md px-2 py-2 text-sm text-foreground/70 hover:bg-muted" onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-md border border-border px-5 py-3 text-center text-sm font-semibold">Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Start Selling</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
