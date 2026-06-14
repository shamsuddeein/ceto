import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { APIError, Product } from "@/types";
import { tintClass } from "@/lib/mock-products";
import { products as mockProducts } from "@/lib/mock-data";

export const Route = createFileRoute("/edit-product/$id")({
  head: ({ params }) => ({ meta: [{ title: `Edit ${params.id} | Cetoh` }] }),
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const p = mockProducts.find((x) => String(x.id) === String(id));
  const pLoading = false;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (p) {
      setTitle(p.title || "");
      setPrice(Number(p.price) || 0);
      setDesc(p.description || "");
    }
  }, [p]);

  const updateMutation = {
    isPending: false,
    mutate: (data: Partial<Product>) => {
      toast.success("Product updated successfully");
    },
  };

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
        <p className="text-center text-foreground/60">Product not found.</p>
      </DashboardLayout>
    );

  async function save(e: React.FormEvent) {
    e.preventDefault();
    updateMutation.mutate({ title, price, description: desc });
  }
  return (
    <DashboardLayout title="Edit Product">
      <Link
        to="/my-products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to my products
      </Link>
      <form onSubmit={save} className="grid max-w-5xl gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Product details">
            <Field label="Title">
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={6}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="input resize-none"
              />
            </Field>
          </Card>
          <Card title="Files">
            <div className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-foreground/60">
              Current file:{" "}
              <span className="font-mono text-foreground">
                {p.digital_file ? p.digital_file.split("/").pop() : "No file uploaded"}
              </span>{" "}
              ·{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => toast.error("File replace requires Week 3 integration")}
              >
                Replace
              </button>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Pricing">
            <Field label="Price (USD)">
              <input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input"
              />
            </Field>
          </Card>
          <Card title="Cover">
            <div className="aspect-[4/3] rounded-lg bg-muted relative overflow-hidden">
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => toast.error("Cover replace requires Week 3 integration")}
              className="mt-3 w-full rounded-md border border-border py-2 text-sm font-semibold"
            >
              Change cover
            </button>
          </Card>
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
          >
            {updateMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
            {updateMutation.isPending ? "Saving..." : "Save changes"}
          </button>
          <button
            type="button"
            onClick={() => toast.error("Delete disabled")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-destructive/30 py-3 text-sm font-semibold text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" /> Delete product
          </button>
        </div>
      </form>
      <style>{`.input{width:100%;border:1px solid var(--color-border);background:var(--color-card);border-radius:0.5rem;padding:0.5rem 0.75rem;font-size:0.875rem;outline:none}.input:focus{border-color:var(--color-primary);box-shadow:0 0 0 2px color-mix(in oklab, var(--color-primary) 20%, transparent)}`}</style>
    </DashboardLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-semibold text-primary">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
