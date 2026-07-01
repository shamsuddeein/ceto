import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MailCheck, RefreshCw, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-layout";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      uid: (search.uid as string) || "",
      token: (search.token as string) || "",
      email: (search.email as string) || "",
    };
  },
  head: () => ({ meta: [{ title: "Verify Email | Cetoh" }] }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const { uid, token, email } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendEmail, setResendEmail] = useState(email || "");
  const navigate = Route.useNavigate();

  // If uid + token are in the URL, auto-verify immediately
  useEffect(() => {
    if (uid && token) {
      autoVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, token]);

  async function autoVerify() {
    setLoading(true);
    try {
      await api.post("/auth/verify-email/", { uid, token });
      toast.success("Email verified successfully!");
      setTimeout(() => navigate({ to: "/dashboard" }), 1500);
    } catch (err: any) {
      toast.error(
        err.response?.data?.detail ||
          "Verification link is invalid or has expired. Request a new one below.",
      );
    } finally {
      setLoading(false);
    }
  }

  // Real resend — calls POST /api/auth/resend-verification/
  async function resend(e: React.FormEvent) {
    e.preventDefault();
    if (!resendEmail.trim()) return toast.error("Enter your email address");
    setResending(true);
    try {
      await api.post("/auth/resend-verification/", { email: resendEmail });
      toast.success("A new verification link has been sent to your email.");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main
        id="main-content"
        className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-10"
      >
        <div className="w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
            {loading ? (
              <Loader2 className="h-7 w-7 animate-spin text-primary" />
            ) : (
              <MailCheck className="h-7 w-7 text-primary" />
            )}
          </div>

          {uid && token ? (
            // Link-based flow: just show status
            <>
              <h1 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
                {loading ? "Verifying your email…" : "Email verified!"}
              </h1>
              <p className="mt-2 text-sm text-foreground/70">
                {loading
                  ? "Please wait while we confirm your link."
                  : "Redirecting you to your dashboard…"}
              </p>
            </>
          ) : (
            // No link in URL — show "check your inbox" + resend form
            <>
              <h1 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
                Check your inbox
              </h1>
              <p className="mt-2 text-sm text-foreground/70">
                We sent a verification link to your email. Click the link to activate your account.
              </p>

              <div className="mt-8 rounded-xl border border-border bg-background p-6 text-left">
                <p className="text-sm font-semibold text-foreground">Didn't get the email?</p>
                <p className="mt-1 text-xs text-foreground/60">
                  Check your spam folder, or resend the link below.
                </p>
                <form onSubmit={resend} className="mt-4 flex flex-col gap-3">
                  <input
                    type="email"
                    id="resend-email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="your@email.com"
                    disabled={resending}
                    className="w-full rounded-md border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    id="resend-btn"
                    disabled={resending}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    <RefreshCw className={`h-4 w-4 ${resending ? "animate-spin" : ""}`} />
                    {resending ? "Sending…" : "Resend verification link"}
                  </button>
                </form>
              </div>
            </>
          )}

          <p className="mt-6 text-xs text-foreground/60">
            Wrong email?{" "}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Sign up again
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
