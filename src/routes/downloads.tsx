import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, PackageOpen } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { toast } from "sonner";
import { products as mockProducts } from "@/lib/mock-data";
import { Product } from "@/types";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "My Downloads | Cetoh" }] }),
  component: Downloads,
});

function Downloads() {
  const items = [] as Product[];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="container-page py-12">
          <h1 className="font-display text-3xl font-bold text-primary">My Downloads</h1>
          <p className="mt-2 text-foreground/70">
            All your purchases in one place. Re-download anytime.
          </p>

          {items.length === 0 ? (
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20 text-center">
              <PackageOpen className="h-16 w-16 text-foreground/20" />
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                No downloads yet
              </h3>
              <p className="mt-2 max-w-sm text-sm text-foreground/60">
                When you purchase a product on Cetoh, it will appear here for you to download
                instantly.
              </p>
              <Link
                to="/marketplace"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Explore marketplace
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-3">
              {items.map((p: Product) => (
                <li
                  key={p.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted`}
                  >
                    {p.cover_image ? (
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Download className="h-7 w-7 text-primary stroke-[1.5]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/products/$id"
                      params={{ id: p.id }}
                      className="block font-display text-base font-semibold text-foreground hover:text-primary line-clamp-1"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-foreground/60">
                      {p.category?.name || "Product"} · Purchased recently
                    </p>
                  </div>
                  <button
                    onClick={() => toast.success("Download started")}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Download className="h-4 w-4" /> Download
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
