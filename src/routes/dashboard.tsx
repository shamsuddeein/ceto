import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, Banknote, ShoppingBag, Eye, ArrowUpRight, PackageOpen } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { MOCK_PRODUCTS, tintClass, getProductIcon } from "@/lib/mock-products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard | Cetoh" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [hasData, setHasData] = useState(false);

  const stats = hasData ? [
    { label: "Total earnings", value: "₦1,248,000", change: "+18%", icon: Banknote },
    { label: "Sales (30d)", value: "284", change: "+12%", icon: ShoppingBag },
    { label: "Page views", value: "9,142", change: "+24%", icon: Eye },
    { label: "Conversion", value: "3.4%", change: "+0.6%", icon: TrendingUp },
  ] : [
    { label: "Total earnings", value: "₦0.00", change: "0%", icon: Banknote },
    { label: "Sales (30d)", value: "0", change: "0%", icon: ShoppingBag },
    { label: "Page views", value: "0", change: "0%", icon: Eye },
    { label: "Conversion", value: "0%", change: "0%", icon: TrendingUp },
  ];
  const products = hasData ? MOCK_PRODUCTS.slice(0, 5) : [];
  return (
    <DashboardLayout title="Overview">
      <div className="mb-6 flex justify-end">
        <button onClick={() => setHasData(!hasData)} className="rounded-xl border-[3px] border-border bg-white px-5 py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1">Toggle Demo Data</button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const tints = ["bg-tint-mint", "bg-tint-peach", "bg-tint-lilac", "bg-tint-rose"];
          return (
            <div key={s.label} className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe-sm transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl border-[3px] border-border ${tints[i % tints.length]} shadow-vibe-sm`}>
                  <s.icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="rounded-full border-[3px] border-border bg-tint-cream px-3 py-1 text-xs font-black shadow-vibe-sm">{s.change}</span>
              </div>
              <p className="mt-6 font-display text-4xl font-black text-foreground">{s.value}</p>
              <p className="mt-2 text-base font-bold text-foreground/70">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-black text-foreground">Sales this month</h2>
            <Link to="/earnings" className="text-sm font-black text-foreground hover:underline">View earnings →</Link>
          </div>
          <div className="mt-8 flex h-56 items-end gap-3">
            {(hasData ? [40, 65, 50, 80, 45, 70, 90, 60, 75, 95, 70, 88] : Array(12).fill(0)).map((h, i) => (
              <div key={i} className="flex-1 rounded-t-xl border-[3px] border-b-0 border-border bg-tint-mint" style={{ height: `${Math.max(h, 2)}%` }}>
                <div className="h-full w-full rounded-t-lg bg-white/40" style={{ height: `${hasData ? h * 0.7 : 0}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe flex flex-col">
          <h2 className="font-display text-2xl font-black text-foreground">Quick actions</h2>
          <div className="mt-6 flex flex-col gap-4">
            <Link to="/add-product" className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-tint-peach p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe">
              + Add a new product <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
            <Link to="/withdrawals" className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-white p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe">
              Withdraw funds <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
            <Link to="/earnings" className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-white p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe">
              View earnings <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-black text-foreground">My products</h2>
          <Link to="/add-product" className="rounded-xl border-[3px] border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1">+ New product</Link>
        </div>
        {products.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-base">
              <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
                <tr><th className="py-4">Product</th><th className="py-4">Price</th><th className="py-4">Sales</th><th className="py-4">Revenue</th><th className="py-4">Status</th></tr>
              </thead>
              <tbody className="divide-y-[3px] divide-border font-bold">
                {products.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-muted/50">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm ${tintClass(p.tint)}`}>
                          {(() => {
                            const Icon = getProductIcon(p.type);
                            return <Icon className="h-6 w-6 stroke-[2.5]" />;
                          })()}
                        </div>
                        <span className="font-black line-clamp-1">{p.title}</span>
                      </div>
                    </td>
                    <td>₦{p.price.toLocaleString('en-US')}</td>
                    <td>{p.sales}</td>
                    <td>₦{(p.price * p.sales).toLocaleString('en-US')}</td>
                    <td><span className="rounded-full border-[3px] border-border bg-tint-mint px-3 py-1 text-xs font-black shadow-vibe-sm">Live</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-10 mb-6 flex flex-col items-center justify-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border-[4px] border-border bg-tint-lilac shadow-vibe-sm">
              <PackageOpen className="h-10 w-10 text-foreground stroke-[2.5]" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-black text-foreground">No products yet</h3>
            <p className="mt-4 max-w-sm text-lg font-bold text-foreground/70">Welcome to Cetoh! Your storefront is empty. Let's get your first digital product live and start earning.</p>
            <Link to="/add-product" className="mt-8 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-lg font-black text-white shadow-vibe transition-transform hover:-translate-y-1 hover:shadow-vibe-hover">+ Add your first product</Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
