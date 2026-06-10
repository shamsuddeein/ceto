import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

export const Route = createFileRoute("/add-product")({
  head: () => ({ meta: [{ title: "Add Product | Cetoh" }] }),
  component: AddProduct,
});

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"ebook" | "course" | "template" | "service">("ebook");
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Product saved as draft!");
    setLoading(false);
  }
  return (
    <DashboardLayout title="Add Product">
      <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Product details">
            <Field label="Product title">
              <input required placeholder="e.g. Mastering Notion in 30 Days" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" />
            </Field>
            <Field label="Short description">
              <textarea rows={3} placeholder="One sentence that grabs attention." className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none" />
            </Field>
            <Field label="Full description">
              <textarea rows={6} placeholder="Describe what's inside, who it's for, and what they'll learn." className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none" />
            </Field>
          </Card>
          <Card title="Product files">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream p-12 text-center transition-all hover:bg-tint-peach hover:shadow-vibe-sm">
              <div className="rounded-full border-[3px] border-border bg-white p-4 shadow-vibe-sm mb-2"><Upload className="h-8 w-8 text-foreground stroke-[2.5]" /></div>
              <span className="text-lg font-black text-foreground">Upload your file</span>
              <span className="text-sm font-bold text-foreground/70">PDF, ZIP, MP4 - up to 2GB</span>
              <input type="file" className="hidden" />
            </label>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Type">
            <div className="grid grid-cols-2 gap-4">
              {(["ebook","course","template","service"] as const).map((t) => (
                <button type="button" key={t} onClick={() => setType(t)} className={`rounded-xl border-[3px] px-4 py-3 text-base font-black capitalize transition-all ${type === t ? "border-border bg-tint-mint text-foreground shadow-vibe-sm translate-x-1" : "border-transparent bg-background text-foreground/70 hover:border-border hover:bg-tint-cream hover:shadow-vibe-sm hover:-translate-y-1"}`}>{t}</button>
              ))}
            </div>
          </Card>
          <Card title="Pricing">
            <Field label="Price (NGN)">
              <div className="flex items-center rounded-2xl border-[3px] border-border bg-background shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none overflow-hidden">
                <span className="pl-4 font-black text-foreground/50">₦</span>
                <input type="number" min={0} defaultValue={15000} className="w-full bg-transparent px-3 py-3 font-bold text-foreground outline-none" />
              </div>
            </Field>
            <Field label="Category">
              <select className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none cursor-pointer">
                <option>eBooks</option><option>Courses</option><option>Templates</option><option>Audio</option><option>Services</option>
              </select>
            </Field>
          </Card>
          <Card title="Cover image">
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream text-foreground/60">
              <ImageIcon className="mb-2 h-10 w-10 stroke-[2.5]" />
              <span className="text-sm font-bold">No cover image</span>
            </div>
            <button type="button" className="mt-4 w-full rounded-xl border-[3px] border-border bg-white py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-peach">Upload cover</button>
          </Card>
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform">
            {loading && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />} {loading ? "Publishing..." : "Publish product"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
      <h3 className="font-display text-2xl font-black text-foreground">{title}</h3>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-base font-black text-foreground">{label}</span>{children}</label>;
}
