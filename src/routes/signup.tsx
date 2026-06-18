import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  BookOpen,
  GraduationCap,
  Crown,
  Star,
  Shirt,
  Ticket,
  Search,
  ShoppingCart,
  ChevronDown,
  Banknote,
  Timer,
  Pencil,
  ShoppingBag,
  Instagram,
  Facebook,
  Youtube,
  Loader2,
  Store,
  UserRound,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-layout";
import { SocialAuthButton } from "@/components/social-auth-button";
import { APIError } from "@/types";
import signupBook from "@/assets/signup-book.png";
import logoImg from "@/assets/logo.png";

type Role = "customer" | "creator";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Cetoh account" },
      {
        name: "description",
        content:
          "Join the first creators on Cetoh and start selling digital products and services in Nigeria.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = Route.useNavigate();

  // Step 1: role selection — Step 2: credentials form
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role | null>(null);

  // Form state
  const [username, setUsername] = useState("");
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

  function handleRoleSelect(selected: Role) {
    setRole(selected);
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) return toast.error("Please select an account type first.");
    if (!username.trim()) return toast.error("Please choose a unique username.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Please enter a valid email address.");
    if (!(rules.length && rules.number && rules.letter))
      return toast.error("Password must meet all requirements.");
    if (password !== confirm) return toast.error("Passwords don't match.");
    if (!agree) return toast.error("Please agree to the Terms of Service and Privacy Policy.");

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      // Persist mock token + role so the app knows which dashboard to show
      if (typeof window !== "undefined") {
        window.localStorage.setItem("mock_token", "mock-session-token");
        window.localStorage.setItem("mock_role", role);
      }
      toast.success("Account created! Redirecting...");
      setTimeout(() => {
        navigate({ to: role === "creator" ? "/dashboard/creator" : "/dashboard/overview" });
      }, 1200);
    } catch (err: APIError | unknown) {
      const apiErr = err as APIError;
      const errorMsg =
        apiErr.response?.data?.email?.[0] ||
        apiErr.response?.data?.username?.[0] ||
        "Couldn't create your account. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial(provider: "google" | "x" | "facebook") {
    setSocialLoading(provider);
    try {
      await new Promise((r) => setTimeout(r, 700));
      toast.info(
        `Continuing with ${provider === "x" ? "X" : provider[0].toUpperCase() + provider.slice(1)}...`,
      );
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top banner */}
      <aside
        aria-label="Announcement"
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
        <div className="container-page flex flex-col items-center justify-center gap-3 py-6 text-center md:flex-row md:gap-8 md:py-5">
          <img
            src={signupBook}
            alt=""
            width={96}
            height={96}
            className="hidden h-20 w-auto -mb-10 md:block"
            loading="lazy"
          />
          <div className="md:text-center">
            <p className="text-base font-semibold">Empowering creators. Enriching lives.</p>
            <p className="text-sm font-semibold text-gold">Built for Nigerian creators</p>
            <p className="mt-1 text-xs text-primary-foreground/85 md:text-sm">
              Earn on your terms by selling digital products and services online.
            </p>
          </div>
        </div>
      </aside>

      <div className="pt-6">
        <SiteHeader />
      </div>

      <main id="main-content" className="grid gap-0 lg:grid-cols-2">
        {/* ─── Left: form / role picker ─── */}
        <section className="px-4 py-8 sm:px-6 md:px-12 md:py-10 lg:py-16">
          <div className="mx-auto w-full max-w-md">
            {/* Progress bar */}
            <div className="mb-6 flex gap-2 sm:mb-8">
              <div className="h-1 flex-1 rounded-full bg-primary" />
              <div
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step === 2 ? "bg-primary" : "bg-border"}`}
              />
            </div>

            {step === 1 ? (
              /* ── STEP 1: Choose your role ── */
              <div className="animate-fade-in-up">
                <h1 className="text-center font-display text-4xl font-black text-foreground sm:text-5xl">
                  Join Cetoh
                </h1>
                <p className="mt-4 text-center text-base font-medium text-foreground/75">
                  How do you plan to use Cetoh?
                </p>
                <p className="text-center text-sm text-foreground/55">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-primary hover:underline">
                    Log in
                  </Link>
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {/* Customer card */}
                  <button
                    type="button"
                    id="role-customer"
                    onClick={() => handleRoleSelect("customer")}
                    className="group relative flex flex-col items-center gap-4 rounded-[2rem] border-[4px] border-border bg-white p-8 shadow-vibe text-left transition-all hover:-translate-y-1 hover:border-primary hover:shadow-vibe-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {/* Icon */}
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-border bg-tint-mint shadow-vibe-sm transition-colors group-hover:bg-primary group-hover:text-white">
                      <UserRound className="h-8 w-8 stroke-[2.5] transition-colors text-foreground group-hover:text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl font-black text-foreground">Customer</p>
                      <p className="mt-2 text-sm font-medium text-foreground/65 leading-relaxed">
                        Browse and buy digital products, eBooks, courses, and more from top
                        Nigerian creators.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black text-primary group-hover:gap-3 transition-all">
                      Sign up as Customer <ArrowRight className="h-4 w-4" />
                    </div>

                    {/* Perks */}
                    <ul className="w-full space-y-2 border-t-[3px] border-border pt-4 text-xs font-semibold text-foreground/70">
                      {["Access thousands of products", "Instant delivery after purchase", "Secure checkout"].map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary stroke-[2.5]" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>

                  {/* Creator card */}
                  <button
                    type="button"
                    id="role-creator"
                    onClick={() => handleRoleSelect("creator")}
                    className="group relative flex flex-col items-center gap-4 rounded-[2rem] border-[4px] border-border bg-white p-8 shadow-vibe text-left transition-all hover:-translate-y-1 hover:border-primary hover:shadow-vibe-hover focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {/* Recommended badge */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border-[3px] border-border bg-primary px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-vibe-sm">
                      Most popular
                    </span>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border-[3px] border-border bg-tint-peach shadow-vibe-sm transition-colors group-hover:bg-primary group-hover:text-white">
                      <Store className="h-8 w-8 stroke-[2.5] transition-colors text-foreground group-hover:text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl font-black text-foreground">Creator</p>
                      <p className="mt-2 text-sm font-medium text-foreground/65 leading-relaxed">
                        Sell digital products, courses, templates, or services. Get paid directly in
                        Naira.
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-black text-primary group-hover:gap-3 transition-all">
                      Sign up as Creator <ArrowRight className="h-4 w-4" />
                    </div>

                    {/* Perks */}
                    <ul className="w-full space-y-2 border-t-[3px] border-border pt-4 text-xs font-semibold text-foreground/70">
                      {["0% commission for 3 months", "Instant Naira payouts", "Full analytics dashboard"].map((perk) => (
                        <li key={perk} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary stroke-[2.5]" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </button>
                </div>
              </div>
            ) : (
              /* ── STEP 2: Credentials form ── */
              <div className="animate-fade-in-up">
                {/* Back button + role pill */}
                <div className="mb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 rounded-xl border-[3px] border-border bg-white px-3 py-2 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-0.5"
                  >
                    <ChevronLeft className="h-4 w-4 stroke-[3px]" /> Back
                  </button>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border-[3px] border-border px-4 py-1.5 text-xs font-black shadow-vibe-sm ${
                      role === "creator" ? "bg-tint-peach" : "bg-tint-mint"
                    }`}
                  >
                    {role === "creator" ? (
                      <Store className="h-3.5 w-3.5 stroke-[2.5]" />
                    ) : (
                      <UserRound className="h-3.5 w-3.5 stroke-[2.5]" />
                    )}
                    {role === "creator" ? "Creator account" : "Customer account"}
                  </span>
                </div>

                <h1 className="text-center font-display text-4xl font-black text-foreground sm:text-5xl">
                  Create your account
                </h1>
                <p className="mt-4 text-center text-base font-medium text-foreground/80">
                  Already have an account?{" "}
                  <Link to="/login" className="font-bold text-primary hover:underline">
                    Log in
                  </Link>
                </p>

                <form className="mt-6 space-y-4 sm:mt-8" onSubmit={handleSubmit} noValidate>
                  <Field
                    id="signup-username"
                    label="Username"
                    placeholder="e.g. cetoh_creator"
                    value={username}
                    onChange={setUsername}
                    disabled={loading}
                    autoComplete="username"
                  />
                  <Field
                    id="signup-email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    disabled={loading}
                    autoComplete="email"
                  />
                  <PasswordField
                    id="signup-password"
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <ul className="space-y-1.5 text-xs text-foreground/75">
                    {[
                      { label: "Must contain 8 characters", ok: rules.length },
                      { label: "Must contain a number", ok: rules.number },
                      { label: "Must contain a letter", ok: rules.letter },
                    ].map((t) => (
                      <li key={t.label} className="flex items-center gap-2">
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full text-primary-foreground transition-colors ${t.ok ? "bg-primary" : "bg-border"}`}
                        >
                          <svg
                            viewBox="0 0 12 12"
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              d="M2.5 6.5l2.5 2.5 4.5-5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {t.label}
                      </li>
                    ))}
                  </ul>
                  <PasswordField
                    id="signup-confirm-password"
                    label="Confirm password"
                    value={confirm}
                    onChange={setConfirm}
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  {confirm && confirm !== password && (
                    <p className="text-xs font-bold text-red-500">Passwords do not match</p>
                  )}

                  <label
                    htmlFor="signup-agree"
                    className="flex items-start gap-2 pt-1 text-sm text-foreground/80"
                  >
                    <input
                      id="signup-agree"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      disabled={loading}
                      className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
                    />
                    <span>
                      I agree to the Cetoh{" "}
                      <Link className="font-semibold text-primary hover:underline" to="/terms">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link className="font-semibold text-primary hover:underline" to="/privacy">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover disabled:opacity-70"
                  >
                    {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />}
                    {loading
                      ? "Creating account..."
                      : role === "creator"
                        ? "Create Creator Account"
                        : "Create Customer Account"}
                  </button>
                </form>

                <div className="relative my-6 flex items-center">
                  <div className="h-px flex-1 bg-border" />
                  <span className="px-3 text-xs text-foreground/60">or sign up with</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-3 mt-4">
                  <SocialAuthButton
                    provider="google"
                    loading={socialLoading === "google"}
                    disabled={!!socialLoading}
                    onClick={() => handleSocial("google")}
                  >
                    Sign up with Google
                  </SocialAuthButton>
                  <SocialAuthButton
                    provider="x"
                    loading={socialLoading === "x"}
                    disabled={!!socialLoading}
                    onClick={() => handleSocial("x")}
                  >
                    Sign up with X (Twitter)
                  </SocialAuthButton>
                  <SocialAuthButton
                    provider="facebook"
                    loading={socialLoading === "facebook"}
                    disabled={!!socialLoading}
                    onClick={() => handleSocial("facebook")}
                  >
                    Sign up with Facebook
                  </SocialAuthButton>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── Right: marketing panel (adapts to step/role) ─── */}
        <section className="relative hidden overflow-hidden bg-primary-soft/40 px-4 py-10 sm:px-6 md:px-10 lg:block lg:py-16">
          <div className="pointer-events-none absolute right-10 top-16 grid grid-cols-6 gap-2 opacity-40">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-primary" />
            ))}
          </div>
          <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-primary-soft/70" />

          {step === 1 || role === "creator" ? (
            /* Creator panel */
            <div className="relative mx-auto max-w-xl text-center animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
                Join our first creators today!
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-foreground/80">
                Sell digital products and services effortlessly and enjoy 0% commission for your
                first 3 months.
              </p>

              <div className="relative mx-auto mt-8 max-w-2xl sm:mt-10">
                <div className="mb-4 hidden gap-3 sm:mb-0 sm:block">
                  <div className="relative z-10 flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-3 pr-5 shadow-vibe-sm sm:absolute sm:-left-2 sm:-top-6 md:-left-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-mint text-foreground shadow-vibe-sm">
                      <Banknote className="h-5 w-5" />
                    </span>
                    <div className="text-left">
                      <p className="text-lg font-black text-foreground leading-tight">0%</p>
                      <p className="text-xs font-bold text-foreground/80">Commission for 3 months</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-3 pr-5 shadow-vibe-sm sm:absolute sm:-right-2 sm:-top-6 md:-right-6">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-peach text-foreground shadow-vibe-sm">
                      <Timer className="h-5 w-5" />
                    </span>
                    <div className="text-left">
                      <p className="text-lg font-black text-foreground leading-tight">Only 3 min</p>
                      <p className="text-xs font-bold text-foreground/80">to setup your store</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <img src={logoImg} alt="Cetoh" className="h-7 w-auto" />
                    <div className="flex flex-1 items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-foreground/60 md:max-w-sm">
                      <Search className="h-4 w-4" /> Search for a product
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-semibold">
                        <span className="h-3 w-3 rounded-sm bg-primary" /> NGN{" "}
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <button className="relative inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                        <ShoppingCart className="h-4 w-4" /> Cart
                        <span className="absolute -right-2 -top-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          3
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-[180px_1fr]">
                    <div>
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground font-display text-xl">
                        Cetoh
                      </div>
                      <p className="mt-3 font-display text-lg font-bold text-primary">Demo Store</p>
                      <p className="mt-1 text-xs text-foreground/70">
                        You can sell anything and everything with Cetoh
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-primary">
                        <Instagram className="h-4 w-4" aria-hidden />
                        <XIcon />
                        <Facebook className="h-4 w-4" aria-hidden />
                        <Youtube className="h-4 w-4" aria-hidden />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <ProductCard tint="bg-muted" icon={<BookOpen className="h-7 w-7" />} title="Milk and Honey [eBook]" price="₦4,500.00" />
                      <ProductCard tint="bg-tint-peach" icon={<GraduationCap className="h-7 w-7" />} title="Course" price="₦30,000.00" />
                      <ProductCard tint="bg-muted" icon={<Crown className="h-7 w-7" />} title="Subscription" price="₦42,000.00" />
                      <ProductCard tint="bg-muted" icon={<Star className="h-7 w-7" />} title="Coaching Service" />
                      <ProductCard tint="bg-tint-peach" icon={<Shirt className="h-7 w-7" />} title="Good Vibes Tee" />
                      <ProductCard tint="bg-muted" icon={<Ticket className="h-7 w-7" />} title="Event Ticket" />
                    </div>
                  </div>
                </div>

                <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                    <div>
                      <p className="text-sm font-black text-foreground">
                        Instant <span className="text-primary">Naira payouts</span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <span className="text-xl leading-none">🇳🇬</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-rose text-foreground shadow-vibe-sm">
                      <Pencil className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold text-foreground">
                      Create beautiful
                      <br />
                      sales &amp; landing pages
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-white p-4 pr-6 shadow-vibe-sm">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-border bg-tint-mint text-foreground shadow-vibe-sm">
                      <ShoppingBag className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-bold text-foreground">
                      Sell and buy all kind
                      <br />
                      of digital products
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Customer panel */
            <div className="relative mx-auto max-w-xl text-center animate-fade-in-up">
              <h2 className="font-display text-2xl font-bold text-primary md:text-3xl">
                Discover amazing digital products
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-foreground/80">
                Access thousands of eBooks, courses, templates, and services created by top Nigerian
                creators — all in one place.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  { tint: "bg-tint-mint", icon: <BookOpen className="h-6 w-6 stroke-[2.5]" />, title: "Milk and Honey [eBook]", creator: "by Jane Doe", price: "₦4,500", tag: "eBook" },
                  { tint: "bg-tint-peach", icon: <GraduationCap className="h-6 w-6 stroke-[2.5]" />, title: "Creator Launch Course", creator: "by Jane Doe", price: "₦30,000", tag: "Course" },
                  { tint: "bg-tint-lilac", icon: <Crown className="h-6 w-6 stroke-[2.5]" />, title: "Notion Business Template", creator: "by Jane Doe", price: "₦15,000", tag: "Template" },
                  { tint: "bg-tint-rose", icon: <Star className="h-6 w-6 stroke-[2.5]" />, title: "1-on-1 Creator Coaching", creator: "by Jane Doe", price: "₦90,000", tag: "Service" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border-[3px] border-border bg-white p-4 shadow-vibe-sm transition-transform hover:-translate-y-0.5"
                  >
                    <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border-[3px] border-border ${item.tint} shadow-vibe-sm`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-black text-foreground truncate">{item.title}</p>
                      <p className="text-xs font-bold text-foreground/60 mt-0.5">{item.creator}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-primary text-sm">{item.price}</p>
                      <span className="inline-block mt-1 rounded-full border-[2px] border-border bg-muted px-2 py-0.5 text-[10px] font-black">{item.tag}</span>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center gap-3 rounded-2xl border-[3px] border-border bg-tint-mint p-5 shadow-vibe-sm">
                  <ShoppingCart className="h-6 w-6 stroke-[2.5] text-primary" />
                  <p className="font-black text-foreground">
                    <span className="text-primary">Instant delivery</span> after every purchase
                  </p>
                </div>
              </div>
            </div>
          )}
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
      <label htmlFor={id} className="block text-sm font-bold text-foreground">
        {label}
      </label>
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
      <label htmlFor={id} className="block text-sm font-bold text-foreground">
        {label}
      </label>
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

function ProductCard({
  tint,
  icon,
  title,
  price,
}: {
  tint: string;
  icon: React.ReactNode;
  title: string;
  price?: string;
}) {
  return (
    <div>
      <div className={`grid h-24 place-items-center rounded-lg ${tint} text-primary`}>{icon}</div>
      <p className="mt-2 line-clamp-2 text-xs font-semibold text-foreground">{title}</p>
      {price && <p className="text-xs font-bold text-primary">{price}</p>}
    </div>
  );
}
