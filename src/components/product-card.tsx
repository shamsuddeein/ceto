import { Link } from "@tanstack/react-router";
import { type Product, tintClass, getProductIcon } from "@/lib/mock-products";

export function ProductCard({ p }: { p: Product }) {
  // Map category to icon, fallback to generic
  const categoryName = p.category?.name || p.type || "Other";
  const tint = p.tint || "peach";

  return (
    <Link
      to="/products/$id"
      params={{ id: p.id.toString() }}
      className="group flex flex-col overflow-hidden rounded-[2rem] border-[3px] border-border bg-white shadow-vibe-sm transition-transform hover:-translate-y-2 hover:shadow-vibe"
    >
      <div
        className={`flex aspect-[4/3] items-center justify-center border-b-[3px] border-border ${tintClass(tint)} p-6 relative overflow-hidden`}
      >
        {p.cover_image ? (
          <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
        ) : (
          (() => {
            const Icon = getProductIcon(categoryName.toLowerCase());
            return <Icon className="h-16 w-16 text-foreground stroke-[2.5]" />;
          })()
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-6">
        <h2 className="font-display text-[18px] font-black text-foreground leading-snug line-clamp-2">
          {p.title}
        </h2>
        <span className="mt-2 text-lg font-black text-foreground/80">
          {p.currency || "₦"}
          {Number(p.price).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </Link>
  );
}
