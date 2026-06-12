import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, Banknote, ShoppingBag, Eye, ArrowUpRight, PackageOpen } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { tintClass, getProductIcon } from "@/lib/mock-products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard | Cetoh" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await api.get("/analytics/dashboard/");
      return res.data;
    }
  });

  const stats = data ? [
    { label: "Total earnings", value: `₦${Number(data.total_revenue).toLocaleString('en-US')}`, change: "", icon: Banknote },
    { label: "Sales (All time)", value: String(data.total_sales), change: "", icon: ShoppingBag },
    { label: "Page views", value: "0", change: "", icon: Eye },
    { label: "Conversion", value: "0%", change: "", icon: TrendingUp },
  ] : [
    { label: "Total earnings", value: "₦0.00", change: "0%", icon: Banknote },
    { label: "Sales (All time)", value: "0", change: "0%", icon: ShoppingBag },
    { label: "Page views", value: "0", change: "0%", icon: Eye },
    { label: "Conversion", value: "0%", change: "0%", icon: TrendingUp },
  ];
  
  const recentOrders = data?.recent_orders || [];
  const chartData = data?.chart_data || Array(7).fill({ name: '', sales: 0 });
  return (
    <DashboardLayout title="Overview">
      <div className="mb-6 flex justify-end">
        {/* Toggle Demo Data button removed */}
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
              <p className="mt-1 text-sm font-semibold text-foreground/60">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-black text-foreground">Sales this year</h2>
            <Link to="/earnings" className="text-sm font-black text-foreground hover:underline">View earnings →</Link>
          </div>
          <div className="mt-8 flex h-64 w-full gap-2 sm:gap-4">
            {/* Y-axis */}
            <div className="flex flex-col justify-between text-xs font-bold text-foreground/70 pb-6 w-8 sm:w-10 text-right">
              <span>100k</span>
              <span>75k</span>
              <span>50k</span>
              <span>25k</span>
              <span>0</span>
            </div>
            <div className="flex-1 flex flex-col">
              {/* Chart Area */}
              <div className="flex-1 flex items-end gap-1 sm:gap-3 border-b-[3px] border-border pb-0 relative">
                {/* Horizontal Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-b-2 border-dashed border-border/10"></div>
                  <div className="w-full border-b-2 border-dashed border-border/10"></div>
                  <div className="w-full border-b-2 border-dashed border-border/10"></div>
                  <div className="w-full border-b-2 border-dashed border-border/10"></div>
                  <div className="w-full"></div>
                </div>
                {/* Bars */}
                {chartData.map((d: any, i: number) => {
                  const amount = d.sales > 0 ? d.sales.toLocaleString() : "0";
                  const maxSales = Math.max(...chartData.map((d: any) => d.sales), 1);
                  const h = (d.sales / maxSales) * 100;
                  return (
                    <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full z-10">
                      {/* Tooltip */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col items-center z-20">
                        <div className="rounded-xl border-[3px] border-border bg-foreground px-3 py-1.5 text-xs font-black text-background shadow-vibe-sm whitespace-nowrap">
                          ₦{amount}
                        </div>
                        <div className="h-2 w-2 border-r-[3px] border-b-[3px] border-border bg-foreground rotate-45 -mt-1"></div>
                      </div>
                      <div className="w-full rounded-t-md sm:rounded-t-xl border-[3px] border-b-0 border-border bg-tint-mint transition-colors hover:bg-tint-peach cursor-pointer" style={{ height: `${Math.max(h, 2)}%` }}>
                        <div className="h-full w-full rounded-t-sm sm:rounded-t-lg bg-white/40" style={{ height: `${h * 0.7}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* X-axis */}
              <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold text-foreground/70">
                 {chartData.map((d: any, i: number) => (
                   <span key={i} className="hidden sm:block flex-1 text-center">{d.name}</span>
                 ))}
                 {/* Mobile X-axis */}
                 <span className="sm:hidden block w-full text-left">Jan</span>
                 <span className="sm:hidden block w-full text-center">Jun</span>
                 <span className="sm:hidden block w-full text-right">Dec</span>
              </div>
            </div>
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
          <h2 className="font-display text-2xl font-black text-foreground">Recent Orders</h2>
          <Link to="/orders" className="rounded-xl border-[3px] border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1">View all</Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-base">
              <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
                <tr><th className="py-4">Product</th><th className="py-4">Amount</th><th className="py-4">Buyer Email</th><th className="py-4">Date</th><th className="py-4">Status</th></tr>
              </thead>
              <tbody className="divide-y-[3px] divide-border font-bold">
                {recentOrders.map((o: any) => (
                  <tr key={o.id} className="transition-colors hover:bg-muted/50">
                    <td className="py-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm bg-tint-mint`}>
                          <PackageOpen className="h-6 w-6 stroke-[2.5]" />
                        </div>
                        <span className="font-black line-clamp-1">Order #{o.id}</span>
                      </div>
                    </td>
                    <td>₦{Number(o.amount).toLocaleString('en-US')}</td>
                    <td>{o.buyer_email}</td>
                    <td>{new Date(o.created_at).toLocaleDateString()}</td>
                    <td><span className="rounded-full border-[3px] border-border bg-tint-peach px-3 py-1 text-xs font-black shadow-vibe-sm">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 mb-6 flex flex-col items-center justify-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border-[4px] border-border bg-tint-lilac shadow-vibe-sm">
              <ShoppingBag className="h-10 w-10 text-foreground stroke-[2.5]" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-black text-foreground">No recent orders</h3>
            <p className="mt-4 max-w-sm text-lg font-bold text-foreground/70">When customers buy your products, they will appear here.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
