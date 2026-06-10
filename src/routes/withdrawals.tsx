import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Loader2, Building2 } from "lucide-react";

export const Route = createFileRoute("/withdrawals")({
  head: () => ({ meta: [{ title: "Withdraw Funds | Cetoh" }] }),
  component: Withdrawals,
});

function Withdrawals() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const balance = 384200;
  const history = [
    { id: "WD-2041", date: "Jun 5, 2026", method: "Bank • ****4521", amount: 120000, status: "Paid" },
    { id: "WD-2017", date: "May 20, 2026", method: "Bank • ****4521", amount: 85000, status: "Paid" },
    { id: "WD-1998", date: "May 4, 2026", method: "Bank • ****4521", amount: 42000, status: "Paid" },
    { id: "WD-1980", date: "Apr 18, 2026", method: "Bank • ****4521", amount: 175000, status: "Paid" },
  ];
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = parseFloat(amount);
    if (!v || v <= 0) return toast.error("Enter a valid amount");
    if (v > balance) return toast.error("Amount exceeds balance");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success(`Withdrawal of ₦${v.toLocaleString('en-US')} requested`);
    setAmount("");
    setLoading(false);
  }
  return (
    <DashboardLayout title="Withdraw Funds">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <form onSubmit={submit} className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe flex flex-col justify-between">
          <div>
            <h2 className="font-display text-3xl font-black text-foreground">Request a withdrawal</h2>
            <p className="mt-2 text-base font-bold text-foreground/70">Funds usually arrive within 1–3 business days.</p>
            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-2 block text-base font-black text-foreground">Amount (NGN)</span>
                <div className="flex items-center rounded-2xl border-[3px] border-border bg-background shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none overflow-hidden">
                  <span className="pl-4 font-black text-foreground/50">₦</span>
                  <input type="number" min={1} max={balance} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-transparent px-3 py-4 font-bold text-foreground outline-none" />
                  <button type="button" onClick={() => setAmount(String(balance))} className="mr-3 rounded-lg border-[3px] border-border bg-tint-mint px-3 py-1.5 text-xs font-black shadow-vibe-sm hover:-translate-y-1 transition-transform">MAX</button>
                </div>
                <span className="mt-2 block text-sm font-bold text-foreground/60">Available: ₦{balance.toLocaleString('en-US')}.00</span>
              </label>
              <label className="block">
                <span className="mb-2 block text-base font-black text-foreground">Payout method</span>
                <div className="flex items-center gap-4 rounded-2xl border-[3px] border-border bg-tint-cream p-4 shadow-vibe-sm">
                  <div className="rounded-xl border-[3px] border-border bg-white p-2 shadow-vibe-sm">
                    <Building2 className="h-6 w-6 stroke-[2.5] text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-black text-foreground">Bank account</p>
                    <p className="text-sm font-bold text-foreground/70">Stanbic Bank •••• 4521</p>
                  </div>
                  <button type="button" className="rounded-xl border-[3px] border-border bg-white px-4 py-2 text-sm font-black shadow-vibe-sm hover:-translate-y-1 transition-transform">Change</button>
                </div>
              </label>
            </div>
          </div>
          <button type="submit" disabled={loading} className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-all">
            {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />} {loading ? "Submitting..." : "Request withdrawal"}
          </button>
        </form>
        <aside className="rounded-[2.5rem] border-[4px] border-border bg-tint-lilac p-8 shadow-vibe flex flex-col justify-center text-center">
          <p className="text-lg font-bold text-foreground/80">Available balance</p>
          <p className="mt-2 font-display text-5xl font-black text-foreground">₦{balance.toLocaleString('en-US')}</p>
          <p className="mt-6 inline-flex items-center justify-center rounded-full border-[3px] border-border bg-white px-4 py-2 text-sm font-black shadow-vibe-sm mx-auto">Min withdrawal: ₦10,000</p>
          <p className="mt-4 text-sm font-bold text-foreground/70">No fees on bank payouts.</p>
        </aside>
      </div>

      <div className="mt-10 rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
        <h2 className="font-display text-2xl font-black text-foreground">Withdrawal history</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-base">
            <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
              <tr><th className="py-4">ID</th><th className="py-4">Date</th><th className="py-4">Method</th><th className="py-4">Amount</th><th className="py-4">Status</th></tr>
            </thead>
            <tbody className="divide-y-[3px] divide-border font-bold">
              {history.map((h) => (
                <tr key={h.id} className="transition-colors hover:bg-muted/50">
                  <td className="py-4 font-mono text-sm">{h.id}</td>
                  <td className="py-4">{h.date}</td>
                  <td className="py-4 text-foreground/70">{h.method}</td>
                  <td className="py-4 font-black text-foreground">₦{h.amount.toLocaleString('en-US')}</td>
                  <td className="py-4"><span className="rounded-full border-[3px] border-border bg-tint-mint px-3 py-1 text-xs font-black shadow-vibe-sm">{h.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
