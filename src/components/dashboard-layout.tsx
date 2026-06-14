import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingBag,
  Wallet,
  ArrowDownToLine,
  Settings,
  Download,
  Users,
  AreaChart,
  Loader2,
  LogOut,
  ChevronDown,
  UserCircle,
  Store,
} from "lucide-react";
import logoImg from "@/assets/logo.png";
import { profile as mockProfile } from "@/lib/mock-data";

const GENERAL_NAV = [
  {
    title: "CUSTOMER PROFILE",
    items: [{ label: "Overview", to: "/dashboard/overview" as const, icon: LayoutDashboard }],
  },
];

const CREATOR_NAV = [
  {
    title: "CREATOR DASHBOARD",
    items: [
      { label: "Creator Home", to: "/dashboard/creator" as const, icon: AreaChart },
      { label: "Analytics", to: "/dashboard/creator/analytics" as const, icon: AreaChart },
    ],
  },
  {
    title: "STORE",
    items: [
      { label: "My Products", to: "/dashboard/creator/my-products" as const, icon: Package },
      { label: "Add Product", to: "/dashboard/creator/add-product" as const, icon: Plus },
      { label: "Orders & Sales", to: "/dashboard/creator/orders" as const, icon: ShoppingBag },
      { label: "Customers", to: "/dashboard/creator/customers" as const, icon: Users },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { label: "Earnings", to: "/dashboard/creator/earnings" as const, icon: Wallet },
      { label: "Withdraw", to: "/dashboard/creator/withdrawals" as const, icon: ArrowDownToLine },
      {
        label: "Payout History",
        to: "/dashboard/creator/withdrawal-history" as const,
        icon: Download,
      },
    ],
  },
];

export function DashboardLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const user =
    typeof window !== "undefined" && window.localStorage.getItem("mock_token") ? mockProfile : null;
  const isLoading = false;

  const location = useLocation();
  const isCreatorView = location.pathname.startsWith("/dashboard/creator");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mock_token");
    }
    window.location.href = "/login";
  }

  // Determine which nav to show based on if user is in creator route or not
  const navGroups = isCreatorView ? CREATOR_NAV : GENERAL_NAV;

  return (
    <div className="min-h-screen bg-surface">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside
          aria-label="Sidebar"
          className="hidden border-r-[4px] border-border bg-white lg:flex lg:min-h-screen lg:flex-col"
        >
          <Link
            to="/"
            className="flex h-20 items-center px-8 border-b-[4px] border-border shrink-0"
          >
            <img src={logoImg} alt="Cetoh" className="h-10 w-auto" />
          </Link>
          <nav
            aria-label="Main Navigation"
            className="flex flex-col gap-6 p-6 h-full overflow-y-auto"
          >
            {navGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <h4 className="px-4 text-xs font-black uppercase tracking-wider text-foreground/70">
                  {group.title}
                </h4>
                {group.items.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    preload="intent"
                    className="flex items-center gap-4 rounded-xl border-[3px] border-transparent px-4 py-3 text-[15px] font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    activeProps={{
                      className:
                        "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm translate-x-1",
                    }}
                  >
                    <n.icon className="h-5 w-5 stroke-[2.5]" />
                    {n.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t-[3px] border-border pt-6">
              {isCreatorView ? (
                <Link
                  to="/dashboard/creator/profile"
                  preload="intent"
                  className="flex items-center gap-4 rounded-xl border-[3px] border-transparent px-4 py-3 text-[15px] font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  activeProps={{
                    className:
                      "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm translate-x-1",
                  }}
                >
                  <Settings className="h-5 w-5 stroke-[2.5]" />
                  Settings
                </Link>
              ) : (
                <Link
                  to="/dashboard/overview"
                  preload="intent"
                  className="flex items-center gap-4 rounded-xl border-[3px] border-transparent px-4 py-3 text-[15px] font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  activeProps={{
                    className:
                      "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm translate-x-1",
                  }}
                >
                  <Settings className="h-5 w-5 stroke-[2.5]" />
                  Settings
                </Link>
              )}
            </div>
          </nav>
        </aside>
        <main id="main-content" className="min-h-screen min-w-0 flex-1 flex flex-col">
          <div className="sticky top-0 z-30 border-b-[4px] border-border bg-white">
            <div className="flex h-20 items-center justify-between px-6 md:px-10">
              <h1 className="font-display text-2xl font-black text-foreground sm:text-3xl truncate pr-2">
                {title}
              </h1>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  to="/"
                  className="hidden rounded-xl border-[3px] border-border bg-white px-4 py-2.5 text-sm font-bold shadow-vibe-sm transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:block"
                >
                  View Site
                </Link>
                {isCreatorView && (
                  <Link
                    to="/dashboard/creator/add-product"
                    className="rounded-xl border-[3px] border-border bg-primary px-4 py-2.5 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span className="sm:hidden">+ New</span>
                    <span className="hidden sm:inline">+ New Product</span>
                  </Link>
                )}

                {/* Profile Switcher Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-full border-[3px] border-border bg-tint-peach p-1 pr-3 shadow-vibe-sm transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <div className="flex h-10 w-10 overflow-hidden rounded-full border-[2px] border-border bg-white">
                      {user?.profile?.avatar ? (
                        <img
                          src={user.profile.avatar}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center font-display font-black text-primary uppercase">
                          {user?.profile?.username?.[0] || user?.email?.[0] || "?"}
                        </span>
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-black">
                      {isCreatorView ? "Creator Profile" : "Customer Profile"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 stroke-[3px] transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border-[3px] border-border bg-white p-2 shadow-vibe animate-fade-in-up">
                      <div className="px-4 py-3 border-b-[3px] border-border mb-2">
                        <p className="text-sm font-bold text-foreground/60">Signed in as</p>
                        <p className="font-black truncate">{user?.email}</p>
                      </div>

                      {isCreatorView ? (
                        <Link
                          to="/dashboard/overview"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left text-sm font-bold hover:bg-tint-cream transition-colors"
                        >
                          <UserCircle className="h-5 w-5 stroke-[2.5]" />
                          Switch To Customer Profile
                        </Link>
                      ) : (
                        user?.profile?.username && (
                          <Link
                            to="/dashboard/creator"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left text-sm font-bold hover:bg-tint-cream transition-colors"
                          >
                            <Store className="h-5 w-5 stroke-[2.5]" />
                            Switch To Creator Profile
                          </Link>
                        )
                      )}

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-2 border-t-[3px] border-border pt-3"
                      >
                        <LogOut className="h-5 w-5 stroke-[2.5]" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <nav
              aria-label="Mobile Navigation"
              className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-4 pt-2 lg:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {navGroups
                .flatMap((group) =>
                  group.items.map((it) => ({ label: it.label, to: it.to as string })),
                )
                .concat([
                  {
                    label: "Settings",
                    to: isCreatorView ? "/dashboard/creator/profile" : "/dashboard/overview",
                  },
                ])
                .map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    preload="intent"
                    className="snap-start whitespace-nowrap rounded-xl border-[3px] border-transparent px-4 py-2 text-sm font-bold text-foreground/80 outline-none transition-all hover:bg-tint-cream hover:border-border hover:shadow-vibe-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    activeProps={{
                      className:
                        "bg-tint-mint border-[3px] border-border text-foreground font-black shadow-vibe-sm",
                    }}
                  >
                    {n.label}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="p-6 md:p-10 animate-fade-in-up flex-1">{children}</div>
        </main>
      </div>
    </div>
  );
}
