import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { MOCK_PRODUCTS } from "@/lib/mock-products";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Orders & Sales | Cetoh" }] }),
  component: Orders,
});

const STATUSES = ["Completed", "Refunded", "Pending"] as const;

function Orders() {
  const [q, setQ] = useState("");
  const orders = Array.from({ length: 14 }, (_, i) => {
    const p = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
    return {
      id: `ORD-${5200 + i}`,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
      buyer: ["alex@", "maria@", "kofi@", "ada@", "sam@", "ngozi@"][i % 6] + "mail.com",
      product: p.title,
      amount: p.price,
      status: STATUSES[i % 3],
    };
  });
  const list = orders.filter((o) => (o.id + o.buyer + o.product).toLowerCase().includes(q.toLowerCase()));
  return (
    <DashboardLayout title="Orders & Sales">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Total orders" value={String(orders.length)} />
        <Stat label="Revenue (30d)" value={`₦${orders.reduce((s, o) => s + o.amount, 0).toLocaleString('en-US')}`} />
        <Stat label="Refund rate" value="1.2%" />
      </div>
      <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none">
        <Search className="h-5 w-5 text-foreground stroke-[3px]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search orders, buyers, products..." className="w-full bg-transparent text-base font-bold text-foreground outline-none placeholder:text-foreground/50" />
      </div>
      <div className="mt-8 rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe">
        <div className="overflow-x-auto">
          <table className="min-w-full text-base">
            <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
              <tr>
                <th className="px-5 py-4">Order</th><th className="py-4">Date</th><th className="py-4">Buyer</th><th className="py-4">Product</th><th className="py-4">Amount</th><th className="py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-[3px] divide-border font-medium">
              {list.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-5 py-4 font-mono text-sm">{o.id}</td>
                  <td>{o.date}</td>
                  <td className="text-foreground/70">{o.buyer}</td>
                  <td className="font-semibold line-clamp-1">{o.product}</td>
                  <td className="font-semibold text-foreground">₦{o.amount.toLocaleString('en-US')}</td>
                  <td>
                    <span className={`rounded-full border-[3px] border-border px-3 py-1 text-xs font-black shadow-vibe-sm ${o.status === "Completed" ? "bg-tint-mint text-foreground" : o.status === "Refunded" ? "bg-tint-rose text-foreground" : "bg-tint-cream text-foreground"}`}>{o.status}</span>
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

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe-sm transition-transform hover:-translate-y-1"><p className="font-display text-4xl font-black text-foreground">{value}</p><p className="mt-2 text-base font-bold text-foreground/70">{label}</p></div>;
}
