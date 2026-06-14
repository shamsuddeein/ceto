import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, Banknote, ShoppingBag, Eye, ArrowUpRight, PackageOpen } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { lazy, Suspense } from "react";
const DashboardChart = lazy(() => import("@/components/ui/dashboard-chart"));
import { Order } from "@/types";
import { dashboardData } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/creator/")({
  head: () => ({ meta: [{ title: "Creator Dashboard | Cetoh" }] }),
  component: Dashboard,
});

function Dashboard() {
  const data = dashboardData();
  const isLoading = false;

  const stats = data
    ? [
        {
          label: "Total earnings",
          value: `₦${Number(data.total_revenue).toLocaleString("en-US")}`,
          change: "",
          icon: Banknote,
        },
        {
          label: "Sales (All time)",
          value: String(data.total_sales),
          change: "",
          icon: ShoppingBag,
        },
        { label: "Page views", value: "0", change: "", icon: Eye },
        { label: "Conversion", value: "0%", change: "", icon: TrendingUp },
      ]
    : [
        { label: "Total earnings", value: "₦0.00", change: "0%", icon: Banknote },
        { label: "Sales (All time)", value: "0", change: "0%", icon: ShoppingBag },
        { label: "Page views", value: "0", change: "0%", icon: Eye },
        { label: "Conversion", value: "0%", change: "0%", icon: TrendingUp },
      ];

  const recentOrders = data?.recent_orders || [];
  const chartData = data?.chart_data || Array(7).fill({ name: "", sales: 0 });
  return (
    <DashboardLayout title="Overview">
      <div className="mb-6 flex justify-end">{/* Toggle Demo Data button removed */}</div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const tints = ["bg-tint-mint", "bg-tint-peach", "bg-tint-lilac", "bg-tint-rose"];
          return (
            <div
              key={s.label}
              className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe-sm transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-xl border-[3px] border-border ${tints[i % tints.length]} shadow-vibe-sm`}
                >
                  <s.icon className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="rounded-full border-[3px] border-border bg-tint-cream px-3 py-1 text-xs font-black shadow-vibe-sm">
                  {s.change}
                </span>
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
            <Link
              to="/dashboard/creator/earnings"
              className="text-sm font-black text-foreground hover:underline"
            >
              View earnings →
            </Link>
          </div>
          <div className="mt-8 h-64 w-full">
            <Suspense
              fallback={<div className="h-full w-full animate-pulse rounded-2xl bg-muted/50" />}
            >
              <DashboardChart chartData={chartData} />
            </Suspense>
          </div>
        </div>
        <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe flex flex-col">
          <h2 className="font-display text-2xl font-black text-foreground">Quick actions</h2>
          <div className="mt-6 flex flex-col gap-4">
            <Link
              to="/dashboard/creator/add-product"
              className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-tint-peach p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe"
            >
              + Add a new product <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
            <Link
              to="/dashboard/creator/withdrawals"
              className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-white p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe"
            >
              Withdraw funds <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
            <Link
              to="/dashboard/creator/earnings"
              className="flex items-center justify-between rounded-2xl border-[3px] border-border bg-white p-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe"
            >
              View earnings <ArrowUpRight className="h-5 w-5 stroke-[3px]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-black text-foreground">Recent Orders</h2>
          <Link
            to="/dashboard/creator/orders"
            className="rounded-xl border-[3px] border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1"
          >
            View all
          </Link>
        </div>
        {recentOrders.length > 0 ? (
          <div className="mt-6">
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-base">
                <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
                  <tr>
                    <th className="py-4">Product</th>
                    <th className="py-4">Amount</th>
                    <th className="py-4">Buyer Email</th>
                    <th className="py-4">Date</th>
                    <th className="py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[3px] divide-border font-bold">
                  {recentOrders.map((o: Order) => (
                    <tr key={o.id} className="transition-colors hover:bg-muted/50">
                      <td className="py-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm bg-tint-mint`}
                          >
                            <PackageOpen className="h-6 w-6 stroke-[2.5]" />
                          </div>
                          <span className="font-black line-clamp-1">Order #{o.id}</span>
                        </div>
                      </td>
                      <td>₦{Number(o.amount).toLocaleString("en-US")}</td>
                      <td>{o.buyer_email}</td>
                      <td>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className="rounded-full border-[3px] border-border bg-tint-peach px-3 py-1 text-xs font-black shadow-vibe-sm">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="flex flex-col gap-4 sm:hidden">
              {recentOrders.map((o: Order) => (
                <div
                  key={o.id}
                  className="rounded-2xl border-[3px] border-border bg-white p-5 shadow-vibe-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm bg-tint-mint">
                        <PackageOpen className="h-5 w-5 stroke-[2.5]" />
                      </div>
                      <span className="font-black text-lg">#{o.id}</span>
                    </div>
                    <span className="rounded-full border-[3px] border-border bg-tint-peach px-2 py-0.5 text-xs font-black shadow-vibe-sm">
                      {o.status}
                    </span>
                  </div>
                  <div className="text-2xl font-black mb-2">
                    ₦{Number(o.amount).toLocaleString("en-US")}
                  </div>
                  <div className="flex justify-between text-sm text-foreground/70 font-bold border-t-[3px] border-border pt-3">
                    <span className="truncate mr-2">{o.buyer_email}</span>
                    <span className="shrink-0">{new Date(o.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No recent orders"
            description="When customers buy your products, they will appear here."
            icon={<ShoppingBag className="h-10 w-10 text-foreground stroke-[2.5]" />}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
