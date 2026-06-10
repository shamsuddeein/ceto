import { useState } from "react";
import { ChevronDown, Globe, Menu, X as XClose } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export function AuthHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { label: "How it Works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Features", href: "/#features", caret: true },
    { label: "Learn", href: "/#learn", caret: true },

  ];
  return (
    <header className="sticky top-6 z-50 px-4 md:px-8">
      <div className="mx-auto max-w-7xl flex h-20 items-center justify-between gap-6 rounded-full border-[3px] border-border bg-white px-6 shadow-vibe md:px-8">
        <Link to="/" aria-label="Cetoh home">
          <img src={logoImg} alt="Cetoh" className="h-10 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="inline-flex items-center gap-1 text-base font-bold text-foreground/80 transition hover:text-foreground"
            >
              {n.label}
              {n.caret && <ChevronDown className="h-4 w-4 stroke-[3px]" />}
            </a>
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
          className="rounded-full border-[3px] border-border p-2 text-foreground shadow-vibe-sm lg:hidden hover:bg-tint-mint transition-colors"
          aria-label="Open menu"
        >
          {open ? <XClose className="h-6 w-6 stroke-[3px]" /> : <Menu className="h-6 w-6 stroke-[3px]" />}
        </button>
      </div>
      {open && (
        <div className="mx-auto mt-4 max-w-7xl overflow-hidden rounded-[2rem] border-[3px] border-border bg-white shadow-vibe lg:hidden">
          <div className="flex flex-col gap-2 p-6">
            {nav.map((n) => (
              <a key={n.label} href={n.href} className="py-2 text-lg font-black text-foreground" onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-4">
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-full border-[3px] border-border px-5 py-3 text-center text-lg font-black shadow-vibe shadow-vibe-hover">Log In</Link>
              <Link to="/signup" onClick={() => setOpen(false)} className="rounded-full border-[3px] border-border bg-primary px-5 py-3 text-center text-lg font-black text-white shadow-vibe shadow-vibe-hover">Start Selling</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
