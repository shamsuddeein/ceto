import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { ProductCard } from "@/components/product-card";
import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mock-products";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Filter, SlidersHorizontal, Loader2, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const marketplaceQueryOptions = queryOptions({
  queryKey: ["marketplace-products"],
  queryFn: async () => {
    // Simulate real API fetching for future replacement
    await new Promise((r) => setTimeout(r, 400));
    return { products: MOCK_PRODUCTS, categories: CATEGORIES };
  },
  staleTime: 1000 * 60 * 15, // Aggressive 15-minute cache
});

export const Route = createFileRoute("/marketplace")({
  head: () => ({ meta: [
    { title: "Marketplace | Discover digital products | Cetoh" },
    { name: "description", content: "Browse thousands of eBooks, courses, templates and services from Nigerian creators." },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(marketplaceQueryOptions),
  pendingComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-medium">Loading marketplace...</p>
      </div>
      <SiteFooter />
    </div>
  ),
  component: Marketplace,
});

function Marketplace() {
  const { data } = useSuspenseQuery(marketplaceQueryOptions);
  const categories = data.categories;

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return data.products;
    const lower = debouncedSearch.toLowerCase();
    return data.products.filter(
      (p) => p.title.toLowerCase().includes(lower) || p.creator.toLowerCase().includes(lower)
    );
  }, [debouncedSearch, data.products]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <section className="relative overflow-hidden border-b-[4px] border-border bg-tint-peach">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[3px] border-border bg-tint-mint shadow-vibe opacity-60" />
        <div className="container-page relative z-10 py-16 md:py-24">
          <h1 className="font-display text-4xl font-black text-foreground sm:text-5xl md:text-7xl">Discover digital products</h1>
          <p className="mt-6 max-w-2xl text-lg font-bold text-foreground/80">Hand-picked eBooks, courses, templates and services from creators you'll love.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.slice(0, 6).map((c) => (
              <span key={c.slug} className="rounded-full border-[3px] border-border bg-white px-5 py-2 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-cream cursor-pointer">{c.name}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="container-page py-10">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2 text-foreground stroke-[3px]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for ebooks, templates, courses..."
              className="w-full rounded-[2rem] border-[3px] border-border bg-white py-5 pl-16 pr-6 text-lg font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border-[3px] border-border bg-tint-mint px-5 py-3 text-base font-black text-foreground shadow-vibe-sm">
              <Filter className="h-5 w-5 stroke-[3px]" />
              <span>{filteredProducts.length} products</span>
            </div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
