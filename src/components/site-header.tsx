import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X as XClose, Search, ShoppingCart } from "lucide-react";
import logoImg from "@/assets/logo.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const routes = [
    { label: "Marketplace", to: "/marketplace" as const },
    { label: "Categories", to: "/categories" as const },
    { label: "Pricing", to: "/pricing" as const },
    { label: "Blog", to: "/blog" as const },
  ];
  const anchors = [
    { label: "How it Works", href: "/how-it-works" },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="Cetoh home" className="shrink-0">
          <img src={logoImg} alt="Cetoh" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {routes.map((n) => (
            <Link key={n.label} to={n.to} className="text-sm font-medium text-foreground/80 hover:text-primary">{n.label}</Link>
          ))}
          {anchors.map((n) => (
            <a key={n.label} href={n.href} className="text-sm font-medium text-foreground/80 hover:text-primary">{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/search" aria-label="Search" className="rounded-md p-2 text-foreground/70 hover:bg-muted">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/checkout" aria-label="Cart" className="rounded-md p-2 text-foreground/70 hover:bg-muted">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <Link to="/login" className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Log In</Link>
          <Link to="/signup" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Start Selling</Link>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-md border border-primary/20 p-2 text-primary lg:hidden" aria-label="Open menu">
          {open ? <XClose className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {routes.map((n) => (
              <Link key={n.label} to={n.to} className="py-2 text-base font-medium" onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            {anchors.map((n) => (
              <a key={n.label} href={n.href} className="py-2 text-base font-medium" onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link to="/login" className="rounded-md border border-border px-5 py-3 text-center text-sm font-semibold">Log In</Link>
              <Link to="/signup" className="rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Start Selling</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
