import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { MOCK_PRODUCTS, tintClass, getProductIcon } from "@/lib/mock-products";
import { toast } from "sonner";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "My Downloads | Cetoh" }] }),
  component: Downloads,
});

function Downloads() {
  const items = MOCK_PRODUCTS.slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
      <section className="container-page py-12">
        <h1 className="font-display text-3xl font-bold text-primary">My Downloads</h1>
        <p className="mt-2 text-foreground/70">All your purchases in one place. Re-download anytime.</p>
        <ul className="mt-8 space-y-3">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg ${tintClass(p.tint)}`}>
                {(() => {
                  const Icon = getProductIcon(p.type);
                  return <Icon className="h-7 w-7 text-primary stroke-[1.5]" />;
                })()}
              </div>
              <div className="flex-1 min-w-0">
                <Link to="/products/$id" params={{ id: p.id }} className="block font-display text-base font-semibold text-foreground hover:text-primary line-clamp-1">{p.title}</Link>
                <p className="text-xs text-foreground/60">{p.category} · Purchased recently</p>
              </div>
              <button onClick={() => toast.success("Download started")} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4" /> Download
              </button>
            </li>
          ))}
        </ul>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
