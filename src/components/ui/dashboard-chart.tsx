import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardChart({ chartData }: { chartData: Record<string, unknown>[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fontWeight: 700, fill: "var(--color-foreground)" }}
          dy={10}
        />
        <YAxis
          tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}k`)}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fontWeight: 700, fill: "var(--color-foreground)" }}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-xl border-[3px] border-border bg-foreground px-3 py-1.5 text-xs font-black text-background shadow-vibe-sm">
                  ₦{Number(payload[0].value).toLocaleString()}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="sales"
          fill="var(--color-tint-mint)"
          radius={[8, 8, 0, 0]}
          activeBar={{ fill: "var(--color-tint-peach)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
