import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-layout";
import { SocialAuthButton } from "@/components/social-auth-button";
import { APIError } from "@/types";
import loginIllustration from "@/assets/setup-person-cartoon.png";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in to Cetoh" },
      {
        name: "description",
        content: "Log in to your Cetoh account to sell digital products and services online.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error("Enter your username or email to continue.");
      return;
    }
    if (!password) {
      toast.error("Enter your password to continue.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      await new Promise((r) => setTimeout(r, 600));
      if (typeof window !== "undefined") {
        window.localStorage.setItem("mock_token", "mock-session-token");
      }
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => (window.location.href = "/dashboard"), 1000);
    } catch (err: APIError | unknown) {
      const apiErr = err as APIError;
      const msg = apiErr.response?.data?.detail || "Invalid credentials. Please try again.";
      setErrorMsg(msg);
      toast.error(msg);
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
      <SiteHeader />
      <main id="main-content" className="relative overflow-hidden">
        {/* decorative shapes */}
        <div className="pointer-events-none absolute left-10 top-24 hidden h-24 w-24 rounded-full border-[3px] border-border bg-tint-mint opacity-80 shadow-vibe lg:block" />
        <div className="pointer-events-none absolute bottom-24 right-10 hidden h-32 w-32 rotate-12 rounded-lg border-[3px] border-border bg-tint-peach opacity-80 shadow-vibe lg:block" />
        <div className="pointer-events-none absolute -left-32 top-40 hidden h-80 w-80 rounded-full border-[3px] border-border bg-tint-rose opacity-40 shadow-vibe-sm lg:block" />

        <div className="container-page relative grid min-h-[calc(100vh-4rem)] items-center gap-8 py-6 md:py-12 lg:grid-cols-2 lg:gap-10">
          {/* Illustration Block */}
          <div className="relative order-2 hidden h-full min-h-[500px] w-full flex-col justify-end overflow-hidden rounded-[2.5rem] border-[4px] border-border bg-tint-mint p-8 shadow-vibe lg:order-1 lg:flex">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Huge Typography Background */}
            <div className="absolute -left-10 top-12 rotate-[-5deg] font-display text-[100px] font-black leading-none text-foreground/5 whitespace-nowrap select-none md:text-[140px]">
              CREATE.
            </div>
            <div className="absolute -right-10 top-44 rotate-[5deg] font-display text-[100px] font-black leading-none text-foreground/5 whitespace-nowrap select-none md:text-[140px]">
              SELL.
            </div>

            {/* Geometric Accents */}
            <div className="absolute top-10 right-10 h-16 w-16 rotate-12 rounded-2xl border-[4px] border-border bg-tint-peach shadow-vibe"></div>
            <div className="absolute top-40 left-8 h-12 w-12 rounded-full border-[4px] border-border bg-tint-rose shadow-vibe"></div>

            {/* Character Image */}
            <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[320px] items-end justify-center">
              {/* Behind-Character Graphic (Solid Circle) */}
              <div className="absolute bottom-8 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border-[4px] border-border bg-gold shadow-vibe md:h-72 md:w-72" />

              <img
                src={loginIllustration}
                alt="Creator"
                width={640}
                height={640}
                loading="lazy"
                className="relative z-10 w-full drop-shadow-2xl mix-blend-darken scale-110 translate-y-4"
              />
            </div>

            {/* Floating Badges */}
            <div className="absolute left-6 top-12 z-20 rotate-[-4deg] rounded-full border-[3px] border-border bg-white px-5 py-2.5 font-bold text-foreground shadow-vibe">
              👋 Welcome back!
            </div>

            <div className="absolute bottom-16 right-8 z-20 flex rotate-[4deg] items-center gap-3 rounded-2xl border-[4px] border-border bg-white p-4 shadow-vibe">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-[3px] border-border bg-primary text-white text-lg sm:text-xl shadow-vibe-sm">
                💰
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-foreground/70 uppercase tracking-wider">
                  Today's Sales
                </p>
                <p className="font-display text-lg sm:text-2xl font-black text-foreground leading-none mt-1">
                  ₦145,000
                </p>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="order-1 mx-auto w-full max-w-md lg:order-2">
            <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe sm:p-8 md:p-10">
              <h1 className="text-center font-display text-4xl font-black text-foreground sm:text-5xl">
                Log in to Cetoh
              </h1>
              <p className="mt-3 text-center text-sm text-foreground/70">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-primary hover:underline">
                  Create one for free.
                </Link>
              </p>

              <form className="mt-6 space-y-5 sm:mt-8" onSubmit={handleSubmit} noValidate>
                {/* Username / Email */}
                <div>
                  <label
                    htmlFor="login-identifier"
                    className="block text-sm font-semibold text-foreground"
                  >
                    Username or Email
                  </label>
                  <input
                    id="login-identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Username or Email address"
                    autoComplete="username"
                    disabled={loading}
                    className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-semibold text-foreground"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative mt-2">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={loading}
                      className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 pr-12 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-3 grid place-items-center text-foreground/60"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {errorMsg && (
                  <div className="rounded-xl border-[3px] border-border bg-tint-peach p-3 text-sm font-bold text-foreground shadow-vibe-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover disabled:opacity-70 mt-4"
                >
                  {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />}
                  {loading ? "Signing in..." : "Continue"}
                </button>
              </form>

              <div className="relative my-6 flex items-center">
                <div className="h-px flex-1 bg-border" />
                <span className="px-3 text-xs text-foreground/60">or continue with</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-3">
                <SocialAuthButton
                  provider="google"
                  loading={socialLoading === "google"}
                  disabled={!!socialLoading}
                  onClick={() => handleSocial("google")}
                >
                  Login with Google
                </SocialAuthButton>
                <SocialAuthButton
                  provider="x"
                  loading={socialLoading === "x"}
                  disabled={!!socialLoading}
                  onClick={() => handleSocial("x")}
                >
                  Login with X (or Twitter)
                </SocialAuthButton>
                <SocialAuthButton
                  provider="facebook"
                  loading={socialLoading === "facebook"}
                  disabled={!!socialLoading}
                  onClick={() => handleSocial("facebook")}
                >
                  Login with Facebook
                </SocialAuthButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
