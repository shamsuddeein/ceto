import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ArrowUpRight, Users, Eye, CreditCard, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard/creator/analytics")({
  component: AnalyticsComponent,
});

const data = [
  { name: "Mon", revenue: 120, views: 400 },
  { name: "Tue", revenue: 210, views: 600 },
  { name: "Wed", revenue: 180, views: 500 },
  { name: "Thu", revenue: 290, views: 800 },
  { name: "Fri", revenue: 350, views: 1000 },
  { name: "Sat", revenue: 480, views: 1200 },
  { name: "Sun", revenue: 520, views: 1500 },
];

function AnalyticsComponent() {
  return (
    <DashboardLayout title="Analytics">
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe transition-transform hover:-translate-y-1">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="font-display text-lg font-black text-foreground">Total Revenue</h2>
              <div className="rounded-xl border-[3px] border-border bg-tint-mint p-2 shadow-vibe-sm">
                <CreditCard className="h-5 w-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="mt-4 font-display text-4xl font-black text-foreground">
                ₦1,245,000
              </div>
              <p className="mt-3 flex items-center text-sm font-bold text-foreground">
                <span className="inline-flex items-center rounded-full bg-tint-mint px-2 py-0.5 text-xs mr-2 border-2 border-border shadow-vibe-sm">
                  <ArrowUpRight className="mr-1 h-3 w-3 stroke-[3px]" /> +15.2%
                </span>{" "}
                from last week
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe transition-transform hover:-translate-y-1">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="font-display text-lg font-black text-foreground">Page Views</h2>
              <div className="rounded-xl border-[3px] border-border bg-tint-peach p-2 shadow-vibe-sm">
                <Eye className="h-5 w-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="mt-4 font-display text-4xl font-black text-foreground">48.2K</div>
              <p className="mt-3 flex items-center text-sm font-bold text-foreground">
                <span className="inline-flex items-center rounded-full bg-tint-mint px-2 py-0.5 text-xs mr-2 border-2 border-border shadow-vibe-sm">
                  <ArrowUpRight className="mr-1 h-3 w-3 stroke-[3px]" /> +8.1%
                </span>{" "}
                from last week
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe transition-transform hover:-translate-y-1">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="font-display text-lg font-black text-foreground">Conversion Rate</h2>
              <div className="rounded-xl border-[3px] border-border bg-tint-lilac p-2 shadow-vibe-sm">
                <Activity className="h-5 w-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="mt-4 font-display text-4xl font-black text-foreground">3.4%</div>
              <p className="mt-3 flex items-center text-sm font-bold text-foreground">
                <span className="inline-flex items-center rounded-full bg-tint-mint px-2 py-0.5 text-xs mr-2 border-2 border-border shadow-vibe-sm">
                  <ArrowUpRight className="mr-1 h-3 w-3 stroke-[3px]" /> +1.2%
                </span>{" "}
                from last week
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe transition-transform hover:-translate-y-1">
            <div className="flex flex-row items-center justify-between pb-2">
              <h2 className="font-display text-lg font-black text-foreground">New Customers</h2>
              <div className="rounded-xl border-[3px] border-border bg-tint-rose p-2 shadow-vibe-sm">
                <Users className="h-5 w-5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="mt-4 font-display text-4xl font-black text-foreground">1,204</div>
              <p className="mt-3 flex items-center text-sm font-bold text-foreground">
                <span className="inline-flex items-center rounded-full bg-tint-mint px-2 py-0.5 text-xs mr-2 border-2 border-border shadow-vibe-sm">
                  <ArrowUpRight className="mr-1 h-3 w-3 stroke-[3px]" /> +12.5%
                </span>{" "}
                from last week
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
          <div className="mb-8">
            <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">
              Revenue & Traffic Overview
            </h2>
          </div>
          <div>
            <div className="h-[400px] w-full pt-4 font-bold">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#101828" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#101828" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A8F0CB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#A8F0CB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                    strokeWidth={2}
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--foreground))"
                    fontSize={14}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="hsl(var(--foreground))"
                    fontSize={14}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value}`}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "4px solid hsl(var(--border))",
                      borderRadius: "1rem",
                      color: "hsl(var(--foreground))",
                      boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                    }}
                    itemStyle={{
                      color: "hsl(var(--foreground))",
                      fontWeight: "900",
                      fontFamily: "Fredoka",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#A8F0CB"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorViews)"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#101828"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
