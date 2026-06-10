import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye, EyeOff, BookOpen, GraduationCap, Crown, Star, Shirt, Ticket,
  Search, ShoppingCart, ChevronDown, Banknote, Timer, Pencil, ShoppingBag,
  Instagram, Facebook, Youtube, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth-header";
import { SocialAuthButton } from "@/components/social-auth-button";
import signupBook from "@/assets/signup-book.png";
import signupIllustration from "@/assets/signup-illustration.png";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Cetoh account" },
      { name: "description", content: "Join the first creators on Cetoh and start selling digital products and services in Nigeria." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const rules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    letter: /[a-zA-Z]/.test(password),
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return toast.error("Please enter your first and last name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email address.");
    if (!(rules.length && rules.number && rules.letter)) return toast.error("Password must meet all requirements.");
    if (password !== confirm) return toast.error("Passwords don't match.");
    if (!agree) return toast.error("Please agree to the Terms of Service and Privacy Policy.");
    setLoading(true);
    try {
      // TODO: Replace with real registration API call
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ firstName, lastName, email, password }),
      // });
      // if (!res.ok) throw new Error(await res.text());
      await new Promise((r) => setTimeout(r, 1000));
      toast.success("Account created! Check your email to verify.");
    } catch {
      toast.error("Couldn't create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: "google" | "x" | "facebook") {
    setSocialLoading(provider);
    try {
      // TODO: Replace with real OAuth redirect
      // window.location.href = `/api/auth/${provider}`;
      await new Promise((r) => setTimeout(r, 700));
      toast.info(`Continuing with ${provider === "x" ? "X" : provider[0].toUpperCase() + provider.slice(1)}...`);
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthHeader />

      {/* Top banner */}
      <div className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="container-page flex flex-col items-center justify-center gap-3 py-6 text-center md:flex-row md:gap-8 md:py-5">
          <img src={signupBook} alt="" width={96} height={96} className="hidden h-20 w-auto -mb-10 md:block" loading="lazy" />
          <div className="md:text-center">
            <p className="text-base font-semibold">Empowering creators. Enriching lives.</p>
            <p className="text-sm font-semibold text-gold">Built for Nigerian creators</p>
            <p className="mt-1 text-xs text-primary-foreground/85 md:text-sm">
              Earn on your terms by selling digital products and services online.
            </p>
          </div>
        </div>
      </div>

      <main className="grid gap-0 lg:grid-cols-2">
        {/* Left: signup form */}
        <section className="px-4 py-8 sm:px-6 md:px-12 md:py-10 lg:py-16">
          <div className="mx-auto w-full max-w-md">
            {/* progress */}
            <div className="mb-6 flex gap-2 sm:mb-8">
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div className="h-1 flex-1 rounded-full bg-border" />
            </div>

            <h1 className="text-center font-display text-4xl font-black text-foreground sm:text-5xl">
              Create your Cetoh account
            </h1>
            <p className="mt-4 text-center text-base font-medium text-foreground/80">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-primary hover:underline">Log in</Link>
            </p>

            <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="signup-first-name" label="First Name" placeholder="First name" value={firstName} onChange={setFirstName} disabled={loading} autoComplete="given-name" />
                <Field id="signup-last-name" label="Last Name" placeholder="Last name" value={lastName} onChange={setLastName} disabled={loading} autoComplete="family-name" />
              </div>
              <Field id="signup-email" label="Email Address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} disabled={loading} autoComplete="email" />
              <PasswordField id="signup-password" label="Password" value={password} onChange={setPassword} disabled={loading} autoComplete="new-password" />
              <ul className="space-y-1.5 text-xs text-foreground/75">
                {[
                  { label: "Must contain 8 characters", ok: rules.length },
                  { label: "Must contain a number", ok: rules.number },
                  { label: "Must contain a letter", ok: rules.letter },
                ].map((t) => (
                  <li key={t.label} className="flex items-center gap-2">
                    <span className={`grid h-4 w-4 place-items-center rounded-full text-primary-foreground transition-colors ${t.ok ? "bg-primary" : "bg-border"}`}>
                      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {t.label}
                  </li>
                ))}
              </ul>
              <PasswordField id="signup-confirm-password" label="Confirm password" value={confirm} onChange={setConfirm} disabled={loading} autoComplete="new-password" />

              <label htmlFor="signup-agree" className="flex items-start gap-2 pt-1 text-sm text-foreground/80">
                <input
                  id="signup-agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                />
                <span>
                  I agree to the Cetoh <Link className="font-semibold text-primary hover:underline" to="/terms">Terms of Service</Link> and{" "}
                  <Link className="font-semibold text-primary hover:underline" to="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover disabled:opacity-70"
              >
                {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />}
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <div className="relative my-6 flex items-center">
              <div className="h-px flex-1 bg-border" />
              <span className="px-3 text-xs text-foreground/60">or sign up with</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3 mt-4">
              <SocialAuthButton provider="google" loading={socialLoading === "google"} disabled={!!socialLoading} onClick={() => handleSocial("google")}>Sign up with Google</SocialAuthButton>
              <SocialAuthButton provider="x" loading={socialLoading === "x"} disabled={!!socialLoading} onClick={() => handleSocial("x")}>Sign up with X (Twitter)</SocialAuthButton>
              <SocialAuthButton provider="facebook" loading={socialLoading === "facebook"} disabled={!!socialLoading} onClick={() => handleSocial("facebook")}>Sign up with Facebook</SocialAuthButton>
            </div>
          </div>
        </section>

        {/* Right: marketing panel */}
        <section className="relative overflow-hidden bg-primary-soft/40 px-4 py-10 sm:px-6 md:px-10 lg:py-16">
          <div className="pointer-events-none absolute right-10 top-16 grid grid-cols-6 gap-2 opacity-40">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-primary" />
            ))}
          </div>
          <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary-soft/70" />

          <div className="relative mx-auto max-w-xl text-center">
            <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
              Join our first creators today!
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/80">
              Sell digital products and services effortlessly and enjoy 0% commission for your first 3 months.
            </p>
          </div>

          {/* Demo store mockup */}
          <div className="relative mx-auto mt-10 max-w-2xl">
            {/* Floating left card */}
            <div className="absolute -left-2 -top-6 z-10 flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-3 pr-5 shadow-vibe-sm md:-left-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-mint text-foreground shadow-vibe-sm">
                <Banknote className="h-5 w-5" />
              </span>
              <div className="text-left">
                <p className="text-lg font-black text-foreground leading-tight">0%</p>
                <p className="text-xs font-bold text-foreground/80">Commission for 3 months</p>
              </div>
            </div>
            {/* Floating right card */}
            <div className="absolute -right-2 -top-6 z-10 flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-3 pr-5 shadow-vibe-sm md:-right-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-peach text-foreground shadow-vibe-sm">
                <Timer className="h-5 w-5" />
              </span>
              <div className="text-left">
                <p className="text-lg font-black text-foreground leading-tight">Only 3 min</p>
                <p className="text-xs font-bold text-foreground/80">to setup your store</p>
              </div>
            </div>

            <img
              src={signupIllustration}
              alt="Creator workspace illustration"
              width={640}
              height={640}
              loading="lazy"
              className="w-full rounded-[2.5rem] border-[4px] border-border bg-white shadow-vibe"
            />

            {/* bottom floating cards */}
            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                <div>
                  <p className="text-sm font-black text-foreground">Instant <span className="text-primary">Naira payouts</span></p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-xl leading-none">🇳🇬</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-rose text-foreground shadow-vibe-sm">
                  <Pencil className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold text-foreground">Create beautiful<br />sales &amp; landing pages</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-mint text-foreground shadow-vibe-sm">
                  <ShoppingBag className="h-5 w-5" />
                </span>
                <p className="text-sm font-bold text-foreground">Sell and buy all kind<br />of digital products</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Reusable form components ---------- */

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-foreground">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        disabled={disabled}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
      />
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  disabled,
  autoComplete,
}: {
  id: string;
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-foreground">{label}</label>
      <div className="relative mt-2">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          disabled={disabled}
          autoComplete={autoComplete}
          className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 pr-12 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-3 grid place-items-center text-foreground/60"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.575L23 22h-6.875l-5.39-7.04L4.5 22H1.243l8.04-9.193L1 2h7.04l4.875 6.444L18.244 2z" />
    </svg>
  );
}

function ProductCard({ tint, icon, title, price }: { tint: string; icon: React.ReactNode; title: string; price?: string }) {
  return (
    <div>
      <div className={`grid h-24 place-items-center rounded-lg ${tint} text-primary`}>
        {icon}
      </div>
      <p className="mt-2 line-clamp-2 text-xs font-semibold text-foreground">{title}</p>
      {price && <p className="text-xs font-bold text-primary">{price}</p>}
    </div>
  );
}
