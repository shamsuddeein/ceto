import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail, MessageCircle, MapPin } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Cetoh" },
    { name: "description", content: "Get in touch with the Cetoh team." },
  ] }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Thanks! We'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content">
      <section className="container-page py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-base font-black uppercase tracking-widest text-primary">Contact us</p>
            <h1 className="mt-4 font-display text-4xl font-black text-foreground md:text-6xl">We'd love to hear from you.</h1>
            <p className="mt-6 text-lg font-medium text-foreground/80">Sales questions, partnership ideas, press, or just a hello - drop us a line.</p>
            <ul className="mt-10 space-y-6 text-base font-bold text-foreground">
              <li className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border-[3px] border-border bg-tint-mint shadow-vibe-sm"><Mail className="h-6 w-6 text-foreground" /></div>
                hello@cetoh.com
              </li>
              <li className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border-[3px] border-border bg-tint-peach shadow-vibe-sm"><MessageCircle className="h-6 w-6 text-foreground" /></div>
                Live chat - Mon-Fri, 9-6 GMT
              </li>
              <li className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border-[3px] border-border bg-tint-lilac shadow-vibe-sm"><MapPin className="h-6 w-6 text-foreground" /></div>
                Lagos · Nairobi · Cape Town · Remote
              </li>
            </ul>
          </div>
          <form onSubmit={submit} className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 md:p-12 shadow-vibe">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name"><input required className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
              <Field label="Email"><input required type="email" className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
            </div>
            <div className="mt-6"><Field label="Subject"><input required className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field></div>
            <div className="mt-6"><Field label="Message"><textarea required rows={6} className="mt-2 w-full rounded-2xl border-[3px] border-border bg-background px-4 py-4 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none" /></Field></div>
            <button type="submit" disabled={loading} className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe shadow-vibe-hover disabled:opacity-70">
              {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />} {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold">{label}</span>{children}</label>;
}
