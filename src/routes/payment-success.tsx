import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/payment-success")({
  head: () => ({ meta: [{ title: "Payment Successful | Cetoh" }] }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const orderId = "CET-" + Math.random().toString(36).slice(2, 9).toUpperCase();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-primary">Payment successful!</h1>
          <p className="mt-3 text-foreground/70">Thank you for your purchase. Your order <span className="font-mono font-semibold text-primary">{orderId}</span> is confirmed.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground/60">
            <Mail className="h-4 w-4" /> Receipt sent to your email
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/downloads" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <Download className="h-4 w-4" /> Access downloads
            </Link>
            <Link to="/marketplace" className="rounded-md border border-border px-6 py-3 text-sm font-semibold">Keep browsing</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
