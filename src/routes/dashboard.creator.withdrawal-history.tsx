import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/creator/withdrawal-history")({
  head: () => ({ meta: [{ title: "Withdrawal History | Cetoh" }] }),
  component: WithdrawalHistory,
});

const HISTORY = [
  { id: "WD-2041", date: "Jun 5, 2026", method: "Bank • ****4521", amount: 120000, status: "Paid" },
  { id: "WD-2017", date: "May 20, 2026", method: "Bank • ****4521", amount: 85000, status: "Paid" },
  { id: "WD-1998", date: "May 4, 2026", method: "Bank • ****4521", amount: 42000, status: "Paid" },
  {
    id: "WD-1980",
    date: "Apr 18, 2026",
    method: "Bank • ****4521",
    amount: 175000,
    status: "Paid",
  },
  { id: "WD-1962", date: "Apr 2, 2026", method: "Bank • ****4521", amount: 60000, status: "Paid" },
  { id: "WD-1944", date: "Mar 19, 2026", method: "Bank • ****4521", amount: 98000, status: "Paid" },
  { id: "WD-1922", date: "Mar 4, 2026", method: "Bank • ****4521", amount: 134000, status: "Paid" },
];

function WithdrawalHistory() {
  const total = HISTORY.reduce((s, h) => s + h.amount, 0);
  return (
    <DashboardLayout title="Withdrawal History">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe mb-10">
        <div>
          <p className="text-base font-bold text-foreground/70">Lifetime withdrawn</p>
          <p className="font-display text-4xl font-black text-foreground mt-1">
            ₦{total.toLocaleString("en-US")}
          </p>
        </div>
        <Link
          to="/withdrawals"
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-primary px-6 py-4 text-base font-black text-white shadow-vibe transition-transform hover:-translate-y-1 hover:shadow-vibe-hover"
        >
          + New withdrawal
        </Link>
      </div>
      <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
        <div className="overflow-x-auto">
          <table className="min-w-full text-base">
            <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="py-4">Date</th>
                <th className="py-4">Method</th>
                <th className="py-4">Amount</th>
                <th className="py-4">Status</th>
                <th className="py-4">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y-[3px] divide-border font-medium">
              {HISTORY.map((h) => (
                <tr key={h.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-mono text-sm">{h.id}</td>
                  <td>{h.date}</td>
                  <td className="text-foreground/70">{h.method}</td>
                  <td className="font-semibold text-foreground">
                    ₦{h.amount.toLocaleString("en-US")}
                  </td>
                  <td>
                    <span className="rounded-full border-[3px] border-border bg-tint-mint px-3 py-1 text-xs font-black shadow-vibe-sm text-foreground">
                      {h.status}
                    </span>
                  </td>
                  <td>
                    <button className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-tint-cream px-4 py-2 text-xs font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-peach">
                      <Download className="h-4 w-4 stroke-[3px]" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
