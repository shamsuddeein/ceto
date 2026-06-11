import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-layout";
import { MOCK_PRODUCTS, tintClass, getProductIcon } from "@/lib/mock-products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout | Cetoh" }] }),
  component: Checkout,
});

function Checkout() {
  const items = MOCK_PRODUCTS.slice(0, 2);
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const total = subtotal;
  const [loading, setLoading] = useState(false);
  const navigate = Route.useNavigate();
  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    toast.success("Payment successful!");
    navigate({ to: "/payment-success" });
  }
  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <main id="main-content">
      <section className="container-page py-10">
        <h1 className="font-display text-3xl font-bold text-primary">Checkout</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          <form onSubmit={pay} className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-primary">Contact</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><input required className="input" /></Field>
                <Field label="Email"><input required type="email" className="input" /></Field>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-primary"><ShieldCheck className="h-5 w-5" /> Secure Payment</h2>
              <div className="mt-4 rounded-lg border border-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Paystack</p>
                    <p className="text-xs text-foreground/60">Pay securely with Card, Bank Transfer, or USSD.</p>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-4 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Connecting to Paystack...</> : <><Lock className="h-4 w-4" /> Pay ₦{total.toLocaleString('en-US')} via Paystack</>}
            </button>
            <p className="text-center text-xs text-foreground/60">Secured by Paystack</p>
          </form>
          <aside className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-lg font-semibold text-primary">Order summary</h2>
              <ul className="mt-4 space-y-3">
                {items.map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-md ${tintClass(p.tint)}`}>
                      {(() => {
                        const Icon = getProductIcon(p.type);
                        return <Icon className="h-6 w-6 text-primary stroke-[1.5]" />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold line-clamp-1">{p.title}</p>
                      <p className="text-xs text-foreground/60">{p.creator}</p>
                    </div>
                    <span className="text-sm font-semibold">₦{p.price.toLocaleString('en-US')}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between text-foreground/70"><span>Subtotal</span><span>₦{subtotal.toLocaleString('en-US')}</span></div>
                <div className="flex justify-between pt-2 font-display text-base font-bold text-primary"><span>Total</span><span>₦{total.toLocaleString('en-US')}</span></div>
              </div>
              <div className="mt-6 rounded-lg bg-primary-soft/50 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h4 className="text-sm font-semibold text-primary">30-Day Money-Back Guarantee</h4>
                    <p className="mt-1 text-xs text-foreground/70">If you're not satisfied, we'll refund your purchase no questions asked.</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/marketplace" className="block text-center text-sm text-foreground/60 hover:text-primary">← Continue shopping</Link>
          </aside>
        </div>
      </section>
      </main>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-card);border-radius:0.5rem;padding:0.625rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--color-primary);box-shadow:0 0 0 2px color-mix(in oklab, var(--color-primary) 20%, transparent)}`}</style>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-semibold text-foreground">{label}</span>{children}</label>;
}
