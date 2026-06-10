import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AuthHeader } from "@/components/auth-header";
import { SocialAuthButton } from "@/components/social-auth-button";
import loginIllustration from "@/assets/login-illustration.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in to Cetoh" },
      { name: "description", content: "Log in to your Cetoh account to sell digital products and services online." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    try {
      // TODO: Replace with real auth API call
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ identifier, password }),
      // });
      // if (!res.ok) throw new Error(await res.text());
      await new Promise((r) => setTimeout(r, 900));
      toast.success("Welcome back! Redirecting...");
    } catch {
      toast.error("Invalid credentials. Please try again.");
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
      <main className="relative overflow-hidden">
        {/* decorative shapes */}
        <div className="pointer-events-none absolute left-10 top-24 h-24 w-24 rounded-full border-[3px] border-border bg-tint-mint shadow-vibe opacity-80" />
        <div className="pointer-events-none absolute right-10 bottom-24 h-32 w-32 rotate-12 rounded-lg border-[3px] border-border bg-tint-peach shadow-vibe opacity-80" />
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full border-[3px] border-border bg-tint-rose shadow-vibe-sm opacity-40" />

        <div className="container-page relative grid min-h-[calc(100vh-4rem)] items-center gap-8 py-8 md:py-12 lg:grid-cols-2 lg:gap-10">
          {/* Illustration */}
          <div className="order-2 flex items-end justify-center lg:order-1">
            <img
              src={loginIllustration}
              alt="Hand holding phone with shopping cart"
              width={640}
              height={640}
              loading="lazy"
              className="w-3/4 max-w-md sm:w-2/3 lg:w-full"
            />
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
                  <label htmlFor="login-identifier" className="block text-sm font-semibold text-foreground">
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
                    <label htmlFor="login-password" className="block text-sm font-semibold text-foreground">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
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
