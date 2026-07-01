import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-layout";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/checkout-simulation")({
  validateSearch: (search: Record<string, unknown>): { ref?: string } => {
    return {
      ref: search.ref ? (search.ref as string) : undefined,
    };
  },
  head: () => ({ meta: [{ title: "Paystack Simulator | Cetoh" }] }),
  component: CheckoutSimulation,
});

function CheckoutSimulation() {
  const { ref } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const navigate = Route.useNavigate();

  async function handlePayment(success: boolean) {
    if (!ref) {
      toast.error("Missing transaction reference.");
      return;
    }
    setLoading(true);

    try {
      if (success) {
        // Send mock success webhook
        await api.post("/orders/webhook/", {
          event: "charge.success",
          data: {
            reference: ref,
          },
        });
        toast.success("Payment simulated successfully!");
        setTimeout(() => {
          navigate({ to: "/payment-success" });
        }, 1500);
      } else {
        toast.error("Payment failed simulation.");
        setLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Webhook simulation failed.");
      setLoading(false);
    }
  }

  if (!ref) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="flex justify-center items-center py-20">
          <div className="max-w-md text-center bg-card p-8 border-[3px] border-border rounded-3xl shadow-vibe">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive stroke-[2.5]" />
            <h1 className="mt-4 font-display text-2xl font-black">Invalid Reference</h1>
            <p className="mt-2 text-sm text-foreground/75">
              Could not locate a transaction reference for this checkout session.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tint-cream">
      <SiteHeader />
      <main
        id="main-content"
        className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-10"
      >
        <div className="w-full max-w-md rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-[3px] border-border bg-tint-mint shadow-vibe-sm">
            <CreditCard className="h-7 w-7 text-foreground" />
          </div>

          <h1 className="mt-6 font-display text-2xl font-black text-foreground sm:text-3xl">
            Paystack Sandbox
          </h1>
          <p className="mt-2 text-sm font-bold text-foreground/70">
            Simulating transaction for order ref:{" "}
            <span className="font-mono text-primary">{ref}</span>
          </p>

          <div className="mt-8 rounded-2xl border-[3px] border-border bg-background p-6 text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary stroke-[2.5]" />
              <div>
                <p className="text-sm font-black text-foreground">Sandbox Environment</p>
                <p className="text-xs text-foreground/60">
                  This page mocks Paystack checkout gateway webhook triggers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={() => handlePayment(true)}
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-75 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" /> Processing...
                </>
              ) : (
                "Simulate Successful Payment"
              )}
            </button>
            <button
              onClick={() => handlePayment(false)}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-full border-[3px] border-border bg-white py-4 text-base font-black text-foreground shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-75 transition-all cursor-pointer"
            >
              Simulate Cancel/Failure
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
