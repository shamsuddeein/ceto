import { Link } from "@tanstack/react-router";
import { LayoutDashboard, Package, Plus, ShoppingBag, Wallet, ArrowDownToLine, Settings, Download, Users, AreaChart } from "lucide-react";
import logoImg from "@/assets/logo.png";
import avatarImg from "@/assets/avatar.png";

const NAV_GROUPS = [
  {
    title: "MAIN",
    items: [
      { label: "Overview", to: "/dashboard" as const, icon: LayoutDashboard },
      { label: "Analytics", to: "/analytics" as const, icon: AreaChart },
    ]
  },
  {
    title: "STORE",
    items: [
      { label: "My Products", to: "/my-products" as const, icon: Package },
      { label: "Add Product", to: "/add-product" as const, icon: Plus },
      { label: "Orders & Sales", to: "/orders" as const, icon: ShoppingBag },
      { label: "Customers", to: "/customers" as const, icon: Users },
    ]
  },
  {
    title: "FINANCE",
    items: [
      { label: "Earnings", to: "/earnings" as const, icon: Wallet },
      { label: "Withdraw", to: "/withdrawals" as const, icon: ArrowDownToLine },
      { label: "Payout History", to: "/withdrawal-history" as const, icon: Download },
    ]
  }
];

export function DashboardLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r-[4px] border-border bg-white lg:flex lg:min-h-screen lg:flex-col">
          <Link to="/" className="flex h-20 items-center px-8 border-b-[4px] border-border">
            <img src={logoImg} alt="Cetoh" className="h-10 w-auto" />
          </Link>
          <nav aria-label="Main Navigation" className="flex flex-col gap-6 p-6">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <h4 className="px-4 text-xs font-black uppercase tracking-wider text-foreground/50">{group.title}</h4>
                {group.items.map((n) => (
                  <Link 
                    key={n.label} 
                    to={n.to} 
                    preload="intent" 
                    className="flex items-center gap-4 rounded-xl border-[3px] border-transparent px-4 py-3 text-[15px] font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    activeProps={{ className: "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm translate-x-1" }}
                  >
                    <n.icon className="h-5 w-5 stroke-[2.5]" />
                    {n.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t-[3px] border-border pt-6">
              <Link 
                to="/settings" 
                preload="intent" 
                className="flex items-center gap-4 rounded-xl border-[3px] border-transparent px-4 py-3 text-[15px] font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                activeProps={{ className: "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm translate-x-1" }}
              >
                <Settings className="h-5 w-5 stroke-[2.5]" />
                Settings
              </Link>
            </div>
          </nav>
        </aside>
        <main className="min-h-screen min-w-0 flex-1">
          <div className="sticky top-0 z-30 border-b-[4px] border-border bg-white">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <h1 className="font-display text-2xl font-black text-foreground sm:text-3xl truncate pr-2">{title}</h1>
              <div className="flex shrink-0 items-center gap-4">
                <Link to="/" className="hidden rounded-xl border-[3px] border-border bg-white px-4 py-2.5 text-sm font-bold shadow-vibe-sm transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:block">View Site</Link>
                <Link to="/add-product" className="rounded-xl border-[3px] border-border bg-primary px-4 py-2.5 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                  <span className="sm:hidden">+ New</span>
                  <span className="hidden sm:inline">+ New Product</span>
                </Link>
                <Link to="/settings" className="ml-2 h-12 w-12 overflow-hidden rounded-full border-[3px] border-border bg-tint-peach shadow-vibe-sm transition-transform hover:-translate-y-1">
                  <img src={avatarImg} alt="Creator Profile" className="h-full w-full object-cover" />
                </Link>
              </div>
            </div>
            <nav aria-label="Mobile Navigation" className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-4 pt-2 lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {NAV_GROUPS.flatMap((group) => group.items.map((it) => ({ label: it.label, to: it.to }))).concat([{ label: "Settings", to: "/settings" }]).map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  preload="intent"
                  className="snap-start whitespace-nowrap rounded-xl border-[3px] border-transparent px-4 py-2 text-sm font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  activeProps={{ className: "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-6 md:p-10 animate-fade-in-up">{children}</div>
        </main>
      </div>
    </div>
  );
}
// force reload
