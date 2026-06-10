import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
const HomeSections = lazy(() => import("@/components/home-sections"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cetoh | The best way to sell your digital products online" },
      {
        name: "description",
        content:
          "Cetoh is your all-in-one e-commerce store builder to sell any kind of digital product or service to anyone in Nigeria.",
      },
      { property: "og:title", content: "Cetoh | Sell digital products online" },
      {
        property: "og:description",
        content:
          "All-in-one platform to sell digital products and services. The simplest creator platform in Nigeria.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CetohLanding,
});

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 lg:pt-32 lg:pb-36">
      <div className="pointer-events-none absolute inset-0">
         <svg className="absolute left-10 top-20 text-gold h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
         </svg>
         <div className="absolute right-20 top-32 h-4 w-4 rounded-full bg-tint-mint border-2 border-border" />
         <div className="absolute left-1/4 bottom-20 h-6 w-6 rounded-full bg-tint-peach border-2 border-border" />
      </div>

      <div className="container-page relative grid lg:grid-cols-[1fr_auto] gap-12 items-center">
        <div className="max-w-2xl text-left relative z-10">
          <div className="inline-flex items-center rounded-full border-2 border-border bg-tint-rose px-4 py-1.5 text-sm font-bold text-foreground shadow-vibe-sm mb-6">
            Built for Nigerian Creators
          </div>
          <h1 className="font-display text-5xl font-black leading-[1.1] text-foreground sm:text-6xl md:text-7xl">
            The best way to <br />
            <span className="text-primary">sell digital</span> <br />
            products.
          </h1>
          <p className="mt-6 text-lg text-foreground/80 md:text-xl font-medium leading-relaxed max-w-xl">
            Launch your store and start selling digital products in minutes. The cleanest, most reliable commerce platform for creators in Nigeria.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-full border-[3px] border-border bg-primary px-10 py-5 text-xl font-black text-white shadow-vibe shadow-vibe-hover"
            >
              Start Selling with Cetoh
            </Link>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center rounded-full border-[3px] border-border bg-white px-10 py-5 text-xl font-black text-foreground shadow-vibe shadow-vibe-hover"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-md lg:mt-0 lg:max-w-sm">
           <div className="absolute -top-10 right-0 rounded-xl border-[3px] border-border bg-gold px-4 py-2 font-bold shadow-vibe rotate-3 text-sm z-10">
              The Cetoh <br /> Creator Platform ✦
           </div>
           
           <div className="relative rounded-[2.5rem] border-[4px] border-border bg-tint-mint p-8 shadow-vibe -rotate-2 transform">
              <div className="flex items-center gap-2 mb-6 border-b-2 border-border pb-4">
                 <div className="h-4 w-4 rounded-full bg-destructive border-2 border-border shadow-vibe-sm"></div>
                 <div className="h-4 w-4 rounded-full bg-gold border-2 border-border shadow-vibe-sm"></div>
                 <div className="h-4 w-4 rounded-full bg-primary border-2 border-border shadow-vibe-sm"></div>
                 <div className="ml-auto font-bold font-mono text-sm border-2 border-border bg-white px-2 rounded-lg shadow-vibe-sm">&lt;/&gt;</div>
              </div>
              <ul className="space-y-4 text-[16px] font-bold text-foreground">
                 <li className="flex items-center gap-3">
                   <div className="rounded-full bg-tint-rose p-1 border-2 border-border shadow-vibe-sm"><svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div> 
                   Build real stores
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="rounded-full bg-tint-rose p-1 border-2 border-border shadow-vibe-sm"><svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div> 
                   Master digital sales
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="rounded-full bg-tint-rose p-1 border-2 border-border shadow-vibe-sm"><svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div> 
                   Ship & monetize
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="rounded-full bg-tint-rose p-1 border-2 border-border shadow-vibe-sm"><svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div> 
                   Instant payouts
                 </li>
              </ul>
              
              <div className="absolute -left-6 -bottom-8 rounded-xl border-2 border-border bg-tint-rose p-4 shadow-vibe rotate-[-6deg] w-64 text-sm font-bold z-10">
                 ♡ join thousands of creators building the future.
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function CetohLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <HomeSections />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
