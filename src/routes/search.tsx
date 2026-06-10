import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { MOCK_PRODUCTS } from "@/lib/mock-products";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search | Cetoh" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = q.trim()
    ? MOCK_PRODUCTS.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.creator.toLowerCase().includes(q.toLowerCase()))
    : MOCK_PRODUCTS;
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
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
          <p className="mt-3 text-sm text-foreground/60">{results.length} result{results.length === 1 ? "" : "s"}</p>
        </div>
      </section>
      <section className="container-page py-10">
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-foreground/60">
            No products match "{q}". Try another keyword.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
