import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-layout";
import { CATEGORIES, tintClass } from "@/lib/mock-products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [
    { title: "Browse Categories | Cetoh" },
    { name: "description", content: "Explore digital products by category - eBooks, courses, templates, and more." },
  ] }),
  component: Categories,
});

function Categories() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
      <section className="container-page py-12 md:py-16">
        <h1 className="font-display text-3xl font-bold text-primary sm:text-4xl">Browse Categories</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">Find exactly what you need from our growing catalog of creator products.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/marketplace" className={`group flex flex-col justify-between rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${tintClass(c.tint)}`}>
              <div>
                <h2 className="font-display text-2xl font-bold text-primary">{c.name}</h2>
                <p className="mt-1 text-sm text-foreground/70">{c.count.toLocaleString()} products</p>
              </div>
              <div className="mt-8 flex items-center justify-end text-primary">
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
