import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-layout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot Password | Cetoh" }] }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter your email");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent. Check your inbox.");
  }
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main
        id="main-content"
        className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-10"
      >
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:p-10">
          {!sent ? (
            <>
              <h1 className="font-display text-2xl font-bold text-primary sm:text-3xl">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-foreground/70">
                Enter the email tied to your account and we'll send you a reset link.
              </p>
              <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
                  {loading ? "Sending..." : "Send reset link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
                <MailCheck className="h-7 w-7 text-primary" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-primary">
                Check your email
              </h1>
              <p className="mt-2 text-sm text-foreground/70">
                We sent a password reset link to{" "}
                <span className="font-semibold text-foreground">{email}</span>.
              </p>
              <Link
                to="/reset-password"
                className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Open reset page
              </Link>
            </div>
          )}
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to login
          </Link>
        </div>
      </main>
    </div>
  );
}
