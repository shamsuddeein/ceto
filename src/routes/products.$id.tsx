import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { MOCK_PRODUCTS, tintClass, getProductIcon } from "@/lib/mock-products";
import { Star, Check, Shield, Download, Share2 } from "lucide-react";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const p = MOCK_PRODUCTS.find((x) => x.id === params.id);
    return { meta: [
      { title: p ? `${p.title} | Cetoh` : "Product | Cetoh" },
      { name: "description", content: p?.title ?? "Digital product on Cetoh" },
    ] };
  },
  component: ProductDetails,
  errorComponent: ({ error }) => <div className="p-10 text-center">Error: {error.message}</div>,
});

function ProductDetails() {
  const { id } = Route.useParams();
  const p = MOCK_PRODUCTS.find((x) => x.id === id);
  if (!p) return <div className="p-10 text-center">Product not found.</div>;
  const related = MOCK_PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-10">
        <nav className="mb-6 text-sm text-foreground/60">
          <Link to="/marketplace" className="hover:text-primary">Marketplace</Link>
          <span className="mx-2">/</span>
          <span>{p.category}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className={`flex aspect-[4/3] items-center justify-center rounded-3xl p-10 ${tintClass(p.tint)}`}>
            {(() => {
              const Icon = getProductIcon(p.type);
              return <Icon className="h-40 w-40 text-primary stroke-[1.5]" />;
            })()}
          </div>
          <div className="flex flex-col">
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary self-start">{p.category}</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-primary md:text-4xl">{p.title}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-foreground/70">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold text-gold" />{p.rating.toFixed(1)}</span>
              <span>·</span>
              <span>{p.sales} sold</span>
              <span>·</span>
              <span>by <Link to="/creators/$username" params={{ username: p.creatorHandle.replace("@","") }} className="font-semibold text-primary hover:underline">{p.creator}</Link></span>
            </div>
            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              A high-quality digital product crafted to help you level up. Get instant access after purchase, with lifetime updates included.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/80">
              {["Instant download after purchase","Lifetime updates","Money-back guarantee","Direct support from creator"].map((f) => (
                <li key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{f}</li>
              ))}
            </ul>
            <div className="mt-8 flex items-end justify-between rounded-2xl border border-border bg-card p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-foreground/60">Price</p>
                <p className="font-display text-4xl font-bold text-primary">₦{p.price.toLocaleString('en-US')}</p>
              </div>
              <Link to="/checkout" className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Buy now</Link>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-foreground/60">
              <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Secure checkout</span>
              <span className="flex items-center gap-1"><Download className="h-4 w-4" /> Instant delivery</span>
              <button className="flex items-center gap-1 hover:text-primary"><Share2 className="h-4 w-4" /> Share</button>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="font-display text-2xl font-bold text-primary">You might also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.id} p={r} />)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
