import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  type Item = { label: string; to?: "/" | "/marketplace" | "/categories" | "/signup" | "/add-product" | "/dashboard" | "/earnings" | "/terms" | "/privacy" | "/refund-policy" | "/about" | "/pricing" | "/how-it-works" | "/contact" | "/faq" | "/blog"; href?: string };
  const cols: { title: string; links: Item[] }[] = [
    { title: "Product", links: [
      { label: "Marketplace", to: "/marketplace" },
      { label: "Categories", to: "/categories" },
      { label: "Pricing", to: "/pricing" },
      { label: "How it Works", to: "/how-it-works" },
    ]},
    { title: "Company", links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ]},
    { title: "Creators", links: [
      { label: "Start Selling", to: "/signup" },
      { label: "Add Product", to: "/add-product" },
      { label: "Dashboard", to: "/dashboard" },
      { label: "Earnings", to: "/earnings" },
    ]},
    { title: "Legal", links: [
      { label: "Terms of Service", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Refund Policy", to: "/refund-policy" },
    ]},
  ];
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-5">
        <div>
          <h3 className="font-display text-2xl font-bold text-primary">Cetoh</h3>
          <p className="mt-3 max-w-xs text-sm text-foreground/70">
            The simplest way to sell digital products and services in Nigeria.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">{c.title}</h4>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className="text-sm text-foreground/70 hover:text-primary">{l.label}</Link>
                  ) : (
                    <a href={l.href} className="text-sm text-foreground/70 hover:text-primary">{l.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Cetoh. All rights reserved.</span>
          <span>Made for Nigerian creators.</span>
        </div>
      </div>
    </footer>
  );
}
