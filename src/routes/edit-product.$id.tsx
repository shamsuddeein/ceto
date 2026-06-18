import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Trash2, Upload, Save } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Product } from "@/types";
import { tintClass } from "@/lib/mock-products";
import { products as mockProducts } from "@/lib/mock-data";

export const Route = createFileRoute("/edit-product/$id")({
  head: ({ params }) => ({ meta: [{ title: `Edit Product | Cetoh` }] }),
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const p = mockProducts.find((x) => String(x.id) === String(id));
  const pLoading = false;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (p) {
      setTitle(p.title || "");
      setPrice(Number(p.price) || 0);
      setDesc(p.description || "");
      setIsPublished(p.is_published ?? false);
    }
  }, [p]);

  if (pLoading)
    return (
      <DashboardLayout title="Edit Product">
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );

  if (!p)
    return (
      <DashboardLayout title="Edit Product">
        <p className="text-center text-foreground/60 py-20">Product not found.</p>
      </DashboardLayout>
    );

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Product updated successfully!");
    setSaving(false);
  }

  return (
    <DashboardLayout title="Edit Product">
      <Link
        to="/dashboard/creator/my-products"
        className="mb-8 inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1"
      >
        <ArrowLeft className="h-4 w-4 stroke-[3px]" /> Back to My Products
      </Link>

      <form onSubmit={save} className="grid max-w-5xl gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Product Details */}
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
            <h2 className="font-display text-xl font-black text-foreground">Product Details</h2>
            <div className="mt-6 space-y-6">
              <label className="block">
                <span className="mb-2 block text-base font-black text-foreground">Title</span>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Ultimate Notion Template Pack"
                  className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-base font-black text-foreground">Description</span>
                <textarea
                  rows={6}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Describe what your customers will get…"
                  className="w-full resize-none rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
                />
              </label>
            </div>
          </div>

          {/* Digital File */}
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
            <h2 className="font-display text-xl font-black text-foreground">Digital File</h2>
            <div className="mt-6 rounded-2xl border-[3px] border-dashed border-border bg-muted p-8 text-center">
              <Upload className="mx-auto h-10 w-10 stroke-[2] text-foreground/50" />
              <p className="mt-3 text-base font-bold text-foreground/70">
                Current file:{" "}
                <span className="font-mono text-foreground">
                  {p.digital_file ? p.digital_file.split("/").pop() : "No file uploaded"}
                </span>
              </p>
              <button
                type="button"
                onClick={() => toast.error("File replace coming in a future update")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-white px-5 py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1"
              >
                Replace file
              </button>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe">
            <h2 className="font-display text-xl font-black text-foreground">Pricing</h2>
            <div className="mt-6">
              <label className="block">
                <span className="mb-2 block text-base font-black text-foreground">Price (NGN)</span>
                <div className="flex items-center rounded-2xl border-[3px] border-border bg-background shadow-vibe-sm transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-none overflow-hidden">
                  <span className="pl-4 font-black text-foreground/50">₦</span>
                  <input
                    type="number"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-transparent px-3 py-3 font-bold text-foreground outline-none"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe">
            <h2 className="font-display text-xl font-black text-foreground">Cover Image</h2>
            <div
              className={`mt-6 aspect-[4/3] rounded-2xl border-[3px] border-border overflow-hidden relative ${tintClass(p.tint || "mint")}`}
            >
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/40 font-bold text-sm">
                  No Cover Image
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => toast.error("Cover replace coming in a future update")}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-tint-cream px-5 py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1"
            >
              <Upload className="h-4 w-4 stroke-[3px]" /> Change cover
            </button>
          </div>

          {/* Publish status */}
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 shadow-vibe">
            <h2 className="font-display text-xl font-black text-foreground">Visibility</h2>
            <label className="mt-6 flex cursor-pointer items-center justify-between gap-4 rounded-2xl border-[3px] border-border bg-tint-cream p-4 shadow-vibe-sm transition-transform hover:-translate-y-1">
              <div>
                <p className="text-base font-black text-foreground">
                  {isPublished ? "Live" : "Draft"}
                </p>
                <p className="mt-0.5 text-sm font-bold text-foreground/70">
                  {isPublished ? "Visible in marketplace" : "Not visible to buyers yet"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={() => setIsPublished(!isPublished)}
                className="h-6 w-6 accent-[color:var(--color-primary)] cursor-pointer"
              />
            </label>
          </div>

          {/* Action buttons */}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-all"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />
            ) : (
              <Save className="h-5 w-5 stroke-[3px]" />
            )}{" "}
            {saving ? "Saving..." : "Save changes"}
          </button>

          <button
            type="button"
            onClick={() => toast.error("Delete disabled in demo")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-tint-rose py-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1"
          >
            <Trash2 className="h-5 w-5 stroke-[3px]" /> Delete product
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
