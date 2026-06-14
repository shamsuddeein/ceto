import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { Product } from "@/types";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { products as mockProducts } from "@/lib/mock-data";
import { useDebounce } from "@/hooks/use-debounce";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search | Cetoh" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 300);

  const products = mockProducts;
  const isLoading = false;

  const results = useMemo(() => {
    if (!debouncedQ.trim()) return products;
    const lower = debouncedQ.toLowerCase();
    return products.filter(
      (p: Product) =>
        p.title.toLowerCase().includes(lower) ||
        (p.creator?.username && p.creator.username.toLowerCase().includes(lower)),
    );
  }, [debouncedQ, products]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <section className="border-b border-border bg-surface">
          <div className="container-page py-10">
            <h1 className="font-display text-3xl font-bold text-primary">Search</h1>
            <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
              <SearchIcon className="h-5 w-5 text-foreground/50" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, creators, categories..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-foreground/50"
              />
            </div>
            <p className="mt-3 text-sm text-foreground/60">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
          </div>
        </section>
        <section className="container-page py-10">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground/60">
              No products match "{q}". Try another keyword.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p: Product) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
