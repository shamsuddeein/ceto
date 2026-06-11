import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
const HomeSections = lazy(() => import("@/components/home-sections"));
const Hero = lazy(() => import("@/components/home-hero"));

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



function CetohLanding() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Hero />
          <HomeSections />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
