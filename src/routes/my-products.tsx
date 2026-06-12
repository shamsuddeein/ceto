import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Search, MoreHorizontal, Edit, Eye, Trash2, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { tintClass, getProductIcon } from "@/lib/mock-products";

export const Route = createFileRoute("/my-products")({
  head: () => ({ meta: [{ title: "My Products | Cetoh" }] }),
  component: MyProducts,
});

function MyProducts() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "live" | "draft">("all");

  const { data: myProducts = [], isLoading } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const res = await api.get("/catalog/my-products/");
      return res.data;
    }
  });

  const list = Array.isArray(myProducts) ? myProducts.filter((p: any) => (p.title || "").toLowerCase().includes(q.toLowerCase()))
    .filter((p: any) => {
      if (status === "all") return true;
      if (status === "live") return p.is_published;
      if (status === "draft") return !p.is_published;
      return true;
    }) : [];
  return (
    <DashboardLayout title="My Products">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-1 items-center gap-3 rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none">
            <Search className="h-5 w-5 text-foreground stroke-[3px]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your products..." className="w-full bg-transparent text-base font-bold text-foreground outline-none placeholder:text-foreground/50" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="rounded-[1.5rem] border-[3px] border-border bg-white px-4 py-3 text-base font-bold text-foreground shadow-vibe-sm outline-none appearance-none cursor-pointer">
            <option value="all">All status</option><option value="live">Live</option><option value="draft">Draft</option>
          </select>
        </div>
        <Link to="/add-product" className="inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-6 py-3 text-base font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1 hover:shadow-vibe">
          <Plus className="h-5 w-5 stroke-[3px]" /> New product
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : list.length === 0 ? (
          <div className="col-span-full py-20 text-center text-foreground/60">No products found.</div>
        ) : list.map((p: any, i: number) => (
          <div key={p.id} className="overflow-hidden rounded-[2.5rem] border-[4px] border-border bg-white shadow-vibe transition-transform hover:-translate-y-2">
            <div className={`flex aspect-[4/3] items-center justify-center p-6 border-b-[4px] border-border ${tintClass((i % 4) as any)} relative`}>
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                (() => {
                  const Icon = getProductIcon('ebook');
                  return <Icon className="h-20 w-20 text-foreground stroke-[2.5] relative z-10" />;
                })()
              )}
            </div>
            <div className="p-6 relative z-10 bg-white">
              <div className="flex items-center justify-between">
                <span className={`rounded-full border-[3px] border-border px-3 py-1 text-xs font-black shadow-vibe-sm ${p.is_published ? 'bg-tint-mint text-foreground' : 'bg-muted text-foreground/70'}`}>{p.is_published ? 'Live' : 'Draft'}</span>
                <button className="rounded-full border-[3px] border-transparent p-1.5 hover:border-border hover:bg-tint-cream hover:shadow-vibe-sm transition-all"><MoreHorizontal className="h-5 w-5 stroke-[3px]" /></button>
              </div>
              <h3 className="mt-4 font-display text-xl font-black text-foreground line-clamp-1">{p.title}</h3>
              <div className="mt-3 flex items-center justify-between text-sm font-bold text-foreground/70">
                <span>{p.currency} {Number(p.price).toLocaleString('en-US')}</span>
                <span>{0} sales</span>
                <span className="text-foreground">{p.currency} 0</span>
              </div>
              <div className="mt-6 flex gap-3">
                <Link to="/edit-product/$id" params={{ id: String(p.id) }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-white py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-cream">
                  <Edit className="h-4 w-4 stroke-[3px]" /> Edit
                </Link>
                <Link to="/products/$id" params={{ id: String(p.id) }} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-white py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-cream">
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
