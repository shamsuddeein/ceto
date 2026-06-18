import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";

export const Route = createFileRoute("/dashboard/creator/add-product")({
  head: () => ({ meta: [{ title: "Add Product | Cetoh" }] }),
  component: AddProduct,
});

const CATEGORIES = ["eBooks", "Courses", "Templates", "Audio", "Services"] as const;
type ProductType = "ebook" | "course" | "template" | "service";

function AddProduct() {
  // Form state
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [type, setType] = useState<ProductType>("ebook");
  const [price, setPrice] = useState("15000");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);

  // Loading states
  const [submitting, setSubmitting] = useState(false);
  const [aiDescLoading, setAiDescLoading] = useState(false);
  const [aiPriceLoading, setAiPriceLoading] = useState(false);

  // --- AI: Generate Description ---
  async function handleGenerateDescription() {
    if (!title.trim()) {
      toast.error("Enter a product title first so the AI has something to work with.");
      return;
    }
    setAiDescLoading(true);
    try {
      // Mocked — replace with: await api.post("/ai/describe-product/", { title, category, keywords: type })
      await new Promise((r) => setTimeout(r, 1400));
      const generated = `${title} is a practical ${type} designed for creators who want results fast. It covers everything from the fundamentals to advanced strategies — giving you a clear, actionable path from day one. Perfect for anyone ready to monetise their knowledge on Cetoh.`;
      setFullDesc(generated);
      toast.success("Description generated.");
    } catch {
      toast.error("Could not generate description. Try again.");
    } finally {
      setAiDescLoading(false);
    }
  }

  // --- AI: Suggest Price ---
  async function handleSuggestPrice() {
    if (!title.trim()) {
      toast.error("Enter a product title first so the AI can suggest a price.");
      return;
    }
    setAiPriceLoading(true);
    try {
      // Mocked — replace with: await api.post("/ai/suggest-price/", { title, category, description: fullDesc })
      await new Promise((r) => setTimeout(r, 1200));
      const suggestions: Record<ProductType, string> = {
        ebook: "4500",
        course: "25000",
        template: "12000",
        service: "75000",
      };
      const suggested = suggestions[type];
      setPrice(suggested);
      toast.success(
        `Suggested price: ₦${Number(suggested).toLocaleString("en-US")} — based on similar ${type}s on Cetoh.`,
      );
    } catch {
      toast.error("Could not suggest a price. Try again.");
    } finally {
      setAiPriceLoading(false);
    }
  }

  // --- Submit ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Product title is required.");
    if (!fullDesc.trim()) return toast.error("Full description is required.");
    setSubmitting(true);
    try {
      // Mocked — replace with: await api.post("/catalog/products/", { title, description: fullDesc, price, category, type })
      await new Promise((r) => setTimeout(r, 900));
      toast.success("Product saved as draft!");
    } catch {
      toast.error("Could not save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isAnyLoading = submitting || aiDescLoading || aiPriceLoading;

  return (
    <DashboardLayout title="Add Product">
      <form onSubmit={handleSubmit} className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Product details */}
          <Card title="Product details">
            <Field label="Product title">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isAnyLoading}
                placeholder="e.g. Mastering Notion in 30 Days"
                className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
              />
            </Field>

            <Field label="Short description">
              <textarea
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                disabled={isAnyLoading}
                placeholder="One sentence that grabs attention."
                className="w-full resize-none rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
              />
            </Field>

            {/* Full description with AI button */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-base font-black text-foreground">Full description</span>
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isAnyLoading}
                  className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-tint-mint px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm transition-all hover:-translate-y-1 hover:shadow-vibe disabled:opacity-60"
                >
                  {aiDescLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin stroke-[3px]" />
                  ) : (
                    <Sparkles className="h-4 w-4 stroke-[2.5]" />
                  )}
                  {aiDescLoading ? "Generating..." : "Write with AI"}
                </button>
              </div>
              <textarea
                rows={6}
                required
                value={fullDesc}
                onChange={(e) => setFullDesc(e.target.value)}
                disabled={isAnyLoading}
                placeholder="Describe what's inside, who it's for, and what they'll learn."
                className="w-full resize-none rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
              />
              {aiDescLoading && (
                <p className="mt-2 text-xs font-bold text-foreground/60">
                  Generating a description based on your title and product type...
                </p>
              )}
            </div>
          </Card>

          {/* Product files */}
          <Card title="Product files">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream p-12 text-center transition-all hover:bg-tint-peach hover:shadow-vibe-sm">
              <div className="mb-2 rounded-full border-[3px] border-border bg-white p-4 shadow-vibe-sm">
                <Upload className="h-8 w-8 stroke-[2.5] text-foreground" />
              </div>
              <span className="text-lg font-black text-foreground">Upload your file</span>
              <span className="text-sm font-bold text-foreground/70">PDF, ZIP, MP4 — up to 2GB</span>
              <input type="file" className="hidden" disabled={isAnyLoading} />
            </label>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Type */}
          <Card title="Type">
            <div className="grid grid-cols-2 gap-3">
              {(["ebook", "course", "template", "service"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  disabled={isAnyLoading}
                  className={`rounded-xl border-[3px] px-4 py-3 text-sm font-black capitalize transition-all ${
                    type === t
                      ? "translate-x-1 border-border bg-tint-mint text-foreground shadow-vibe-sm"
                      : "border-transparent bg-background text-foreground/70 hover:border-border hover:bg-tint-cream hover:shadow-vibe-sm hover:-translate-y-1"
                  } disabled:opacity-60`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>

          {/* Pricing with AI suggestion */}
          <Card title="Pricing">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-base font-black text-foreground">Price (NGN)</span>
                <button
                  type="button"
                  onClick={handleSuggestPrice}
                  disabled={isAnyLoading}
                  className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-tint-peach px-3 py-1.5 text-xs font-black text-foreground shadow-vibe-sm transition-all hover:-translate-y-1 hover:shadow-vibe disabled:opacity-60"
                >
                  {aiPriceLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin stroke-[3px]" />
                  ) : (
                    <Sparkles className="h-3.5 w-3.5 stroke-[2.5]" />
                  )}
                  {aiPriceLoading ? "Thinking..." : "Suggest price"}
                </button>
              </div>
              <div className="flex items-center overflow-hidden rounded-2xl border-[3px] border-border bg-background shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none">
                <span className="pl-4 font-black text-foreground/50">₦</span>
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isAnyLoading}
                  className="w-full bg-transparent px-3 py-3 font-bold text-foreground outline-none disabled:opacity-60"
                />
              </div>
              {aiPriceLoading && (
                <p className="mt-2 text-xs font-bold text-foreground/60">
                  Analysing similar {type}s to suggest a competitive price...
                </p>
              )}
            </div>

            <div className="mt-6">
              <span className="mb-2 block text-base font-black text-foreground">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isAnyLoading}
                className="w-full appearance-none cursor-pointer rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* Cover image */}
          <Card title="Cover image">
            <div className="flex aspect-[4/3] flex-col items-center justify-center rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream text-foreground/60">
              <ImageIcon className="mb-2 h-10 w-10 stroke-[2.5]" />
              <span className="text-sm font-bold">No cover image</span>
            </div>
            <button
              type="button"
              disabled={isAnyLoading}
              className="mt-4 w-full rounded-xl border-[3px] border-border bg-white py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-peach disabled:opacity-60"
            >
              Upload cover
            </button>
          </Card>

          {/* Submit */}
          <button
            type="submit"
            disabled={isAnyLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-lg font-black text-white shadow-vibe transition-transform hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70"
          >
            {submitting && <Loader2 className="h-6 w-6 animate-spin stroke-[3px]" />}
            {submitting ? "Publishing..." : "Publish product"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe sm:p-8">
      <h3 className="font-display text-xl font-black text-foreground sm:text-2xl">{title}</h3>
      <div className="mt-6 space-y-6">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-black text-foreground">{label}</span>
      {children}
    </label>
  );
}
