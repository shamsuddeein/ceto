import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ArrowDownToLine, Wallet, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/earnings")({
  head: () => ({ meta: [{ title: "Earnings | Cetoh" }] }),
  component: Earnings,
});

function Earnings() {
  const tx = Array.from({ length: 8 }, (_, i) => ({
    id: `TX-${1000 + i}`,
    date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString(),
    product: ["Notion System", "Marketing eBook", "UI Handbook", "Funnel Course"][i % 4],
    buyer: ["alex@", "maria@", "kofi@", "ada@"][i % 4] + "mail.com",
    gross: [29000, 49000, 19000, 79000][i % 4],
  }));
  return (
    <DashboardLayout title="Earnings">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat icon={Wallet} label="Available balance" value="₦384,200.00" tone="primary" />
        <Stat icon={TrendingUp} label="Pending clearance" value="₦41,800.00" />
        <Stat icon={ArrowDownToLine} label="Total withdrawn" value="₦822,000.00" />
      </div>
      <div className="mt-10 flex flex-col gap-6 rounded-[2.5rem] border-[4px] border-border bg-tint-peach p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between shadow-vibe">
        <div>
          <p className="text-lg font-bold text-foreground/80">Ready to cash out?</p>
          <p className="font-display text-4xl font-black text-foreground">Withdraw your earnings</p>
        </div>
        <Link to="/withdrawals" className="rounded-full border-[3px] border-border bg-white px-8 py-4 text-lg font-black text-foreground shadow-vibe-sm hover:-translate-y-1 hover:shadow-vibe transition-all whitespace-nowrap">Withdraw funds</Link>
      </div>
      <div className="mt-10 rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
        <h2 className="font-display text-2xl font-black text-foreground">Recent transactions</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-base">
            <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
              <tr><th className="py-4">Date</th><th className="py-4">Product</th><th className="py-4">Buyer</th><th className="py-4">Gross</th><th className="py-4">Fee</th><th className="py-4">Net</th></tr>
            </thead>
            <tbody className="divide-y-[3px] divide-border font-medium">
              {tx.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-muted/50">
                  <td className="py-4">{t.date}</td>
                  <td className="py-4 font-semibold">{t.product}</td>
                  <td className="py-4 text-foreground/70">{t.buyer}</td>
                  <td className="py-4">₦{t.gross.toLocaleString('en-US')}</td>
                  <td className="py-4 text-foreground/60">₦{(t.gross * 0.10).toLocaleString('en-US')}</td>
                  <td className="py-4 font-semibold text-foreground">₦{(t.gross * 0.90).toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: React.ElementType; label: string; value: string; tone?: "primary" }) {
  const isPrimary = tone === "primary";
  return (
    <div className={`rounded-[2rem] border-[4px] border-border p-6 shadow-vibe transition-transform hover:-translate-y-1 ${isPrimary ? "bg-tint-mint" : "bg-white"}`}>
      <div className={`inline-flex rounded-xl border-[3px] border-border p-2 shadow-vibe-sm ${isPrimary ? "bg-white" : "bg-tint-lilac"}`}>
        <Icon className="h-6 w-6 stroke-[2.5] text-foreground" />
      </div>
      <p className="mt-6 font-display text-4xl font-black text-foreground">{value}</p>
      <p className="mt-2 text-base font-bold text-foreground/70">{label}</p>
    </div>
  );
}
