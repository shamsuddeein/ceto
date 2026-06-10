import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode, Profiler } from "react";
import { Toaster } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { Search, Home, ArrowLeft } from "lucide-react";

import appCss from "../styles.css?url";


function NotFoundComponent() {
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
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
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

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cetoh | The best way to sell your digital products online" },
      { name: "description", content: "Cetoh is the simplest e-commerce store builder to sell any kind of digital product or service to anyone in Nigeria." },
      { name: "author", content: "Cetoh" },
      { property: "og:title", content: "Cetoh | Sell digital products online" },
      { property: "og:description", content: "The simplest platform to sell digital products and services in Nigeria." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@cetoh" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Nunito:wght@400..800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RouteBenchmark() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const location = useRouterState({ select: (s) => s.location });
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setStartTime(performance.now());
      console.log(`[Benchmark] Navigating to ${location.pathname}...`);
    } else if (startTime > 0) {
      const duration = performance.now() - startTime;
      console.log(
        `%c[Benchmark] Loaded ${location.pathname} in ${duration.toFixed(2)}ms`,
        "color: #10b981; font-weight: bold;"
      );
    }
  }, [isLoading, location.pathname]);

  return null;
}

function onRenderProfile(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  if (actualDuration > 5) {
    console.log(
      `%c[Profiler] [${id}] ${phase} render took ${actualDuration.toFixed(2)}ms`,
      "color: #3b82f6;"
    );
  }
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <RouteBenchmark />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Profiler id="AppOutlet" onRender={onRenderProfile}>
        <Outlet />
      </Profiler>
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
