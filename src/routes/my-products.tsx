import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { MOCK_PRODUCTS, tintClass, getProductIcon } from "@/lib/mock-products";

export const Route = createFileRoute("/my-products")({
  head: () => ({ meta: [{ title: "My Products | Cetoh" }] }),
  component: MyProducts,
});

function MyProducts() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "live" | "draft">("all");
  const list = MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <DashboardLayout title="My Products">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none">
            <Search className="h-5 w-5 text-foreground stroke-[3px]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your products..." className="w-full bg-transparent text-base font-bold text-foreground outline-none placeholder:text-foreground/50" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 text-base font-bold text-foreground shadow-vibe-sm outline-none appearance-none cursor-pointer">
            <option value="all">All status</option><option value="live">Live</option><option value="draft">Draft</option>
          </select>
        </div>
        <Link to="/add-product" className="inline-flex items-center gap-2 rounded-full border-[3px] border-border bg-primary px-6 py-3 text-base font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe">
          <Plus className="h-5 w-5 stroke-[3px]" /> New product
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-[2.5rem] border-[4px] border-border bg-white shadow-vibe transition-transform hover:-translate-y-2">
            <div className={`flex aspect-[4/3] items-center justify-center p-6 border-b-[4px] border-border ${tintClass(p.tint)}`}>
              {(() => {
                const Icon = getProductIcon(p.type);
                return <Icon className="h-20 w-20 text-foreground stroke-[2.5]" />;
              })()}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border-[3px] border-border bg-tint-mint px-3 py-1 text-xs font-black shadow-vibe-sm">Live</span>
                <button className="rounded-full border-[3px] border-transparent p-1.5 hover:border-border hover:bg-tint-cream hover:shadow-vibe-sm transition-all"><MoreHorizontal className="h-5 w-5 stroke-[3px]" /></button>
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground line-clamp-1">{p.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm font-bold text-foreground/70">
                <span>₦{p.price.toLocaleString('en-US')}</span><span>{p.sales} sales</span><span className="text-foreground">₦{(p.price * p.sales).toLocaleString('en-US')}</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to="/edit-product/$id" params={{ id: p.id }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-white py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-cream">
                  <Edit className="h-4 w-4 stroke-[3px]" /> Edit
                </Link>
                <Link to="/products/$id" params={{ id: p.id }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-white py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-cream">
                  <Eye className="h-4 w-4 stroke-[3px]" /> View
                </Link>
                <button onClick={() => toast.error("Delete is disabled in demo")} className="rounded-xl border-[3px] border-border bg-tint-rose p-2.5 text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1" aria-label="Delete">
                  <Trash2 className="h-4 w-4 stroke-[3px]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
