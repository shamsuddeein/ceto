import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Inbox, ShoppingBag, X } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { EmptyState } from "@/components/ui/empty-state";
import { Order } from "@/types";
import { orders as mockOrders } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/creator/orders")({
  head: () => ({ meta: [{ title: "Orders & Sales | Cetoh" }] }),
  component: Orders,
});

function Orders() {
  const [q, setQ] = useState("");

  const orders = mockOrders;

  const list = orders.filter((o: Order) =>
    (String(o.id) + String(o.buyer) + String(o.product)).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DashboardLayout title="Orders & Sales">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Total orders" value={String(orders.length)} />
        <Stat label="Revenue (30d)" value={`₦0`} />
        <Stat label="Refund rate" value="0%" />
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none">
        <Search className="h-5 w-5 text-foreground stroke-[3px] shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search orders, buyers, products..."
          className="w-full bg-transparent text-base font-bold text-foreground outline-none placeholder:text-foreground/50"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="rounded-full bg-muted p-1 hover:bg-muted-foreground/20 text-foreground/70 shrink-0"
          >
            <X className="h-4 w-4 stroke-[3px]" />
          </button>
        )}
      </div>

      <div className="mt-8 rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe">
        {list.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="When a customer purchases your product, their order details will appear here. Share your products to get started!"
            icon={<ShoppingBag className="h-10 w-10 text-foreground stroke-[2.5]" />}
          />
        ) : (
          <div className="mt-2">
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full text-base">
                <thead className="text-left text-sm font-black uppercase tracking-wider text-foreground/60 border-b-[3px] border-border">
                  <tr>
                    <th className="px-5 py-4">Order</th>
                    <th className="py-4">Date</th>
                    <th className="py-4">Buyer</th>
                    <th className="py-4">Product</th>
                    <th className="py-4">Amount</th>
                    <th className="py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-[3px] divide-border font-medium">
                  {list.map((o: Order) => (
                    <tr key={o.id} className="transition-colors hover:bg-muted/50">
                      <td className="px-5 py-4 font-mono text-sm">{o.id}</td>
                      <td>{o.date}</td>
                      <td className="text-foreground/70">{o.buyer}</td>
                      <td className="font-semibold line-clamp-1">{o.product as string}</td>
                      <td className="font-semibold text-foreground">
                        ₦{Number(o.amount).toLocaleString("en-US")}
                      </td>
                      <td>
                        <span
                          className={`rounded-full border-[3px] border-border px-3 py-1 text-xs font-black shadow-vibe-sm ${o.status === "Completed" ? "bg-tint-mint text-foreground" : o.status === "Refunded" ? "bg-tint-rose text-foreground" : "bg-tint-cream text-foreground"}`}
                        >
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
              {list.map((o: Order) => (
                <div
                  key={o.id}
                  className="rounded-2xl border-[3px] border-border bg-white p-5 shadow-vibe-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-black">#{o.id}</span>
                    <span
                      className={`rounded-full border-[3px] border-border px-2 py-0.5 text-xs font-black shadow-vibe-sm ${o.status === "Completed" ? "bg-tint-mint text-foreground" : o.status === "Refunded" ? "bg-tint-rose text-foreground" : "bg-tint-cream text-foreground"}`}
                    >
                      {o.status}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-foreground">
                    ₦{Number(o.amount).toLocaleString("en-US")}
                  </div>
                  <div className="mt-2 line-clamp-1 font-bold text-foreground/80">
                    {o.product as string}
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-foreground/70 font-bold border-t-[3px] border-border pt-3">
                    <span className="truncate mr-2">{o.buyer as string}</span>
                    <span className="shrink-0">{o.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border-[4px] border-border bg-white p-6 shadow-vibe-sm transition-transform hover:-translate-y-1">
      <p className="font-display text-4xl font-black text-foreground">{value}</p>
      <p className="mt-2 text-base font-bold text-foreground/70">{label}</p>
    </div>
  );
}
