import { Link } from "@tanstack/react-router";
import { type Product, tintClass, getProductIcon } from "@/lib/mock-products";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: p.id }}
      className="group flex flex-col overflow-hidden rounded-[2rem] border-[3px] border-border bg-white shadow-vibe-sm transition-transform hover:-translate-y-2 hover:shadow-vibe"
    >
      <div className={`flex aspect-[4/3] items-center justify-center border-b-[3px] border-border ${tintClass(p.tint)} p-6`}>
        {(() => {
          const Icon = getProductIcon(p.type);
          return <Icon className="h-16 w-16 text-foreground stroke-[2.5]" />;
        })()}
      </div>
      <div className="flex flex-col gap-1.5 p-6">
        <h3 className="font-display text-[18px] font-black text-foreground leading-snug">{p.title}</h3>
        <span className="mt-2 text-lg font-black text-foreground/80">₦{p.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
    </Link>
  );
}
