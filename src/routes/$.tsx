import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { ArrowLeft, Home } from "lucide-react";

export const Route = createFileRoute("/$")({
  component: NotFoundCatchAll,
});

function NotFoundCatchAll() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <h1 className="relative font-display text-[8rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-emerald-200 opacity-90 sm:text-[12rem]">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Lost in the marketplace
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-foreground/70">
            We couldn't find the page you're looking for. It might be coming soon, or it never existed in the first place.
          </p>

          <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 text-sm font-semibold text-foreground transition-all hover:bg-accent hover:border-primary/30"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </button>
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-105"
            >
              <Home className="h-4 w-4" /> Go to Homepage
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
