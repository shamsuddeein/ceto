import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  Globe,
  Menu,
  X as XClose,
  Search,
  ShoppingCart,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { SiInstagram, SiX, SiFacebook, SiYoutube } from "@icons-pack/react-simple-icons";
import logoImg from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profile as mockProfile } from "@/lib/mock-data";

/* ---------- Logo ---------- */
export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <img
      src={logoImg}
      alt="Cetoh"
      width="160"
      height="40"
      className={`h-10 w-auto object-contain ${light ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

/* ---------- Site Header ---------- */
const NAV = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Categories", href: "/categories" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
];

const SECONDARY = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user =
    typeof window !== "undefined" && window.localStorage.getItem("mock_token") ? mockProfile : null;
  const isLoading = false;

  async function handleLogout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mock_token");
    }
    window.location.href = "/login";
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[60] bg-background pt-2 pb-2 px-2 md:bg-transparent md:top-6 md:px-8 md:py-0">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 rounded-full border-[3px] border-border bg-white p-2 shadow-vibe md:h-20 md:gap-6 md:px-8 md:py-0">
        <Link to="/" aria-label="Cetoh home">
          <Logo className="h-8 md:h-10 ml-2 md:ml-0" />
        </Link>
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              to={n.href as string}
              preload="intent"
              className="inline-flex items-center gap-1 text-base font-bold text-foreground/80 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:gap-4 lg:flex">
          <Link
            to="/search"
            aria-label="Search products"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Search className="h-5 w-5 stroke-[2.5]" />
          </Link>
          <Link
            to="/checkout"
            aria-label="View cart"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground/70 hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ShoppingCart className="h-5 w-5 stroke-[2.5]" />
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-white px-6 py-2.5 text-base font-black text-foreground shadow-vibe shadow-vibe-hover"
              >
                <LayoutDashboard className="h-5 w-5" /> Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-tint-peach px-6 py-2.5 text-base font-black text-foreground shadow-vibe shadow-vibe-hover transition-all hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-5 w-5" /> Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-border text-foreground shadow-vibe-sm transition-colors hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 lg:hidden md:h-11 md:w-11"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-layout-mobile-menu"
        >
          {open ? (
            <XClose className="h-6 w-6 stroke-[3px]" />
          ) : (
            <Menu className="h-6 w-6 stroke-[3px]" />
          )}
        </button>
      </div>
      {open && (
        <div
          id="site-layout-mobile-menu"
          className="fixed inset-0 z-[100] h-[100dvh] w-full overflow-y-auto bg-background lg:hidden"
        >
          <div className="mx-auto flex min-h-full w-full max-w-md flex-col gap-2 p-4 sm:p-6">
            <div className="mb-2 flex items-center justify-between">
              <Logo className="h-8" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-border text-foreground shadow-vibe-sm transition-colors hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Close menu"
              >
                <XClose className="h-6 w-6 stroke-[3px]" />
              </button>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <Link
                to="/search"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-border text-base font-bold hover:bg-tint-mint"
              >
                <Search className="h-5 w-5 stroke-[2.5]" /> Search
              </Link>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                aria-label="View cart"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border hover:bg-tint-mint"
              >
                <ShoppingCart className="h-5 w-5 stroke-[2.5]" />
              </Link>
            </div>
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.href as string}
                className="rounded-xl px-3 py-2 text-lg font-black text-foreground hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <div className="my-2 border-t-2 border-border" />
            {SECONDARY.map((n) => (
              <Link
                key={n.label}
                to={n.href as string}
                className="rounded-xl px-3 py-2 text-base font-bold text-foreground/70 hover:bg-tint-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border-[3px] border-border px-5 py-3 text-center text-lg font-black shadow-vibe shadow-vibe-hover"
                  >
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-tint-peach px-5 py-3 text-center text-lg font-black shadow-vibe shadow-vibe-hover"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
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
            <SiInstagram
              className="h-8 w-8 hover:scale-110 transition-transform"
              aria-label="Instagram"
            />
            <SiX
              className="h-8 w-8 hover:scale-110 transition-transform"
              aria-label="X (Twitter)"
            />
            <SiFacebook
              className="h-8 w-8 hover:scale-110 transition-transform"
              aria-label="Facebook"
            />
            <SiYoutube
              className="h-8 w-8 hover:scale-110 transition-transform"
              aria-label="YouTube"
            />
          </div>

          <p className="mt-8 text-base font-bold text-foreground/70">
            © {new Date().getFullYear()} Cetoh. All Rights Reserved.
          </p>
        </div>
        {FOOTER_COLS.map((c) => (
          <div key={c.title}>
            <h3 className="text-xl font-black text-foreground">{c.title}</h3>
            <ul className="mt-6 space-y-4">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[16px] font-bold text-foreground/80 transition hover:text-foreground hover:underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
