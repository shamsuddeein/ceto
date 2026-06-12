import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Loader2, Building2 } from "lucide-react";
import { api } from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/withdrawals")({
  head: () => ({ meta: [{ title: "Withdraw Funds | Cetoh" }] }),
  component: Withdrawals,
});

function Withdrawals() {
  const [amount, setAmount] = useState("");
  const queryClient = useQueryClient();

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await api.get("/finance/wallet/");
      return res.data;
    }
  });

  const { data: history = [], isLoading: historyLoading } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await api.get("/finance/withdrawals/");
      return res.data;
    }
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/users/profile/");
      return res.data;
    }
  });

  const withdrawMutation = useMutation({
    mutationFn: async (v: number) => {
      const res = await api.post("/finance/withdrawals/", { amount: v });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Withdrawal of ₦${Number(data.amount).toLocaleString('en-US')} requested`);
      setAmount("");
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
      queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.detail || "Withdrawal failed");
    }
  });

  const balance = Number(wallet?.available_balance || 0);

  if (walletLoading || historyLoading) {
    return (
      <DashboardLayout title="Withdraw Funds">
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </DashboardLayout>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = parseFloat(amount);
    if (!v || v <= 0) return toast.error("Enter a valid amount");
    if (v > balance) return toast.error("Amount exceeds available balance");
    withdrawMutation.mutate(v);
  }

  const bankDetails = profile?.bank_details || {};
  return (
    <DashboardLayout title="Withdraw Funds">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <form onSubmit={submit} className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe flex flex-col justify-between">
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
                    <p className="text-base font-black text-foreground">{bankDetails.method || "Bank account"}</p>
                    <p className="text-sm font-bold text-foreground/70">{bankDetails.bank_name || "No bank"} • {bankDetails.account_number || "No account"}</p>
                  </div>
                  <Link to="/settings" className="rounded-xl border-[3px] border-border bg-white px-4 py-2 text-sm font-black shadow-vibe-sm hover:-translate-y-1 transition-transform">Change</Link>
                </div>
              </label>
            </div>
          </div>
          <button type="submit" disabled={withdrawMutation.isPending} className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-all">
            {withdrawMutation.isPending && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />} {withdrawMutation.isPending ? "Submitting..." : "Request withdrawal"}
          </button>
        </form>
        <aside className="rounded-[2.5rem] border-[4px] border-border bg-tint-lilac p-6 sm:p-8 shadow-vibe flex flex-col justify-center text-center">
          <p className="text-lg font-bold text-foreground/80">Available balance</p>
          <p className="mt-2 font-display text-5xl font-black text-foreground">₦{balance.toLocaleString('en-US')}</p>
          <p className="mt-6 inline-flex items-center justify-center rounded-full border-[3px] border-border bg-white px-4 py-2 text-sm font-black shadow-vibe-sm mx-auto">Min withdrawal: ₦10,000</p>
          <p className="mt-4 text-sm font-bold text-foreground/70">No fees on bank payouts.</p>
        </aside>
      </div>

      <div className="mt-10 rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
        <h2 className="font-display text-2xl font-black text-foreground">Withdrawal history</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-base">
            <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
              <tr><th className="py-4">ID</th><th className="py-4">Date</th><th className="py-4">Method</th><th className="py-4">Amount</th><th className="py-4">Status</th></tr>
            </thead>
            <tbody className="divide-y-[3px] divide-border font-bold">
              {history.length > 0 ? history.map((h: any) => (
                <tr key={h.id} className="transition-colors hover:bg-muted/50">
                  <td className="py-4 font-mono text-sm">WD-{h.id}</td>
                  <td className="py-4">{new Date(h.requested_at).toLocaleDateString()}</td>
                  <td className="py-4 text-foreground/70">Bank Transfer</td>
                  <td className="py-4 font-black text-foreground">₦{Number(h.amount).toLocaleString('en-US')}</td>
                  <td className="py-4"><span className={`rounded-full border-[3px] border-border px-3 py-1 text-xs font-black shadow-vibe-sm ${h.status === 'paid' ? 'bg-tint-mint' : 'bg-tint-peach'}`}>{h.status}</span></td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="py-8 text-center text-foreground/60">No withdrawal history.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
