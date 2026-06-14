import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types";
import { products as mockProducts } from "@/lib/mock-data";
import { Loader2, Search, ShoppingCart } from "lucide-react";
import { SiInstagram, SiX, SiFacebook } from "@icons-pack/react-simple-icons";

export const Route = createFileRoute("/creators/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} on Cetoh` },
      { name: "description", content: `Browse digital products by @${params.username} on Cetoh.` },
    ],
  }),
  component: CreatorProfile,
});

function CreatorProfile() {
  const { username } = Route.useParams();

  const allProducts = mockProducts;
  const isLoading = false;

  const products = allProducts.filter(
    (p: Product) => p.creator_details?.username === username || p.creator?.username === username,
  );

  // Derive creator details from the first product, or fallback to URL param
  const profile =
    products.length > 0 && (products[0].creator_details || products[0].creator)
      ? products[0].creator_details || products[0].creator
      : { username, bio: "Turn what you know into income.", avatar_url: null };

  const name = profile.username.charAt(0).toUpperCase() + profile.username.slice(1);
  const displayAvatar = profile.username.charAt(0).toUpperCase();

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-medium">Loading store...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Left Sidebar */}
      <aside className="relative flex w-full flex-col border-r border-border/50 bg-background px-8 py-10 md:sticky md:top-0 md:h-screen md:w-80 lg:w-[400px] md:overflow-y-auto">
        {/* Logo */}
        <a href="/" className="mb-12 font-display text-2xl font-bold text-primary">
          cetoh.
        </a>

        {/* Profile Avatar */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-md overflow-hidden">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={name} className="h-full w-full object-cover" />
          ) : (
            displayAvatar
          )}
        </div>

        <h1 className="mt-8 font-display text-3xl font-bold text-primary">{name}</h1>

        <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-foreground/80 whitespace-pre-wrap">
          {profile.bio || "Turn what you know into income."}
        </div>

        <div className="mt-10 flex gap-5 text-foreground/90">
          <a href="#" className="hover:text-primary transition-colors">
            <SiInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <SiX className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <SiFacebook className="h-5 w-5" />
          </a>
        </div>

        {/* Decorative background vectors */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
          <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full bg-primary/10" />
          <div className="absolute -bottom-10 -right-16 h-48 w-48 rounded-full bg-primary/5" />
          <div className="absolute bottom-8 left-16 h-32 w-32 rounded-full bg-primary/5" />
        </div>
      </aside>

      {/* Right Content */}
      <main id="main-content" className="flex-1 bg-[#FAFAFA] px-4 py-8 sm:px-8 md:px-12 md:py-10">
        {/* Top bar */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50" />
            <input
              type="text"
              placeholder="Search for ebooks, templates, beats..."
              className="w-full rounded-full border-none bg-white py-3.5 pl-12 pr-6 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center justify-end">
            <button className="flex items-center gap-2 font-display text-[15px] font-bold text-foreground">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm">
                  3
                </span>
              </div>
              Cart
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length > 0 ? (
            products.map((p: Product) => <ProductCard key={p.id} p={p} />)
          ) : (
            <div className="col-span-full py-20 text-center text-foreground/60">
              No products found for this creator.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
