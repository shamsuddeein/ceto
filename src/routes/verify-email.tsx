import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MailCheck, RefreshCw, Loader2 } from "lucide-react";
import { SiteHeader } from "@/components/site-layout";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify Email | Cetoh" }] }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = Route.useNavigate();
  function setDigit(i: number, v: string) {
    const ch = v.replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[i] = ch;
    setCode(next);
    if (ch && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
  }
  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (code.some((c) => !c)) return toast.error("Enter all 6 digits");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Email verified!");
    setTimeout(() => navigate({ to: "/dashboard" }), 600);
  }
  async function resend() {
    setResending(true);
    await new Promise((r) => setTimeout(r, 600));
    setResending(false);
    toast.success("A new code has been sent.");
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
            <MailCheck className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-primary sm:text-3xl">
            Verify your email
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            We sent a 6-digit code to your email. Enter it below to activate your account.
          </p>
          <form className="mt-6 space-y-5" onSubmit={verify} noValidate>
            <div className="flex justify-center gap-2 sm:gap-3">
              {code.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !d && i > 0)
                      document.getElementById(`otp-${i - 1}`)?.focus();
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  className="h-12 w-10 rounded-md border border-border bg-background text-center font-display text-xl font-bold text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 sm:h-14 sm:w-12"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>
          <button
            onClick={resend}
            disabled={resending}
            className="mt-4 inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-primary disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${resending ? "animate-spin" : ""}`} /> Resend code
          </button>
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
