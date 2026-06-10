import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { AuthHeader } from "@/components/auth-header";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset Password | Cetoh" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = Route.useNavigate();
  const reqs = [
    { label: "At least 8 characters", ok: pw.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(pw) },
    { label: "Contains a letter", ok: /[a-zA-Z]/.test(pw) },
    { label: "Passwords match", ok: pw.length > 0 && pw === pw2 },
  ];
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (reqs.some((r) => !r.ok)) return toast.error("Fix password requirements");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    toast.success("Password updated. Sign in with your new password.");
    setTimeout(() => navigate({ to: "/login" }), 1500);
  }
  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />
      <main className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
        <div className="w-full max-w-md rounded-2xl bg-card p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] sm:p-10">
          {done ? (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h1 className="mt-4 font-display text-2xl font-bold text-primary">Password updated</h1>
              <p className="mt-2 text-sm text-foreground/70">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-primary sm:text-3xl">Set a new password</h1>
              <p className="mt-2 text-sm text-foreground/70">Choose a strong password you haven't used before.</p>
              <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
                <PasswordField label="New password" value={pw} onChange={setPw} show={show} setShow={setShow} disabled={loading} />
                <PasswordField label="Confirm password" value={pw2} onChange={setPw2} show={show} setShow={setShow} disabled={loading} />
                <ul className="space-y-1 text-xs">
                  {reqs.map((r) => (
                    <li key={r.label} className={r.ok ? "text-primary" : "text-foreground/60"}>
                      {r.ok ? "✓" : "○"} {r.label}
                    </li>
                  ))}
                </ul>
                <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />} {loading ? "Updating..." : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, setShow, disabled }: { label: string; value: string; onChange: (v: string) => void; show: boolean; setShow: (v: boolean) => void; disabled: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <div className="flex items-center rounded-md border border-border bg-background pr-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
        <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} autoComplete="new-password" className="w-full bg-transparent px-4 py-3 text-sm outline-none" />
        <button type="button" onClick={() => setShow(!show)} className="rounded p-1 text-foreground/60 hover:text-primary" aria-label="Toggle password">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </label>
  );
}
