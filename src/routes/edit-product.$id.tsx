import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Trash2, Upload, Save } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Product } from "@/types";
import { tintClass } from "@/lib/mock-products";
import { products as mockProducts } from "@/lib/mock-data";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/edit-product/$id")({
  head: ({ params }) => ({ meta: [{ title: `Edit Product | Cetoh` }] }),
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate();
  const { data: p = null, isLoading: pLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/catalog/products/${id}/`);
      return res.data;
    },
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [saving, setSaving] = useState(false);

  // File and upload states
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [digitalFileName, setDigitalFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (p) {
      setTitle(p.title || "");
      setPrice(Number(p.price) || 0);
      setDesc(p.description || "");
      setIsPublished(p.is_published ?? false);
      setCoverPreview(p.cover_image || null);
      setDigitalFileName(p.digital_file ? p.digital_file.split("/").pop() || "" : "");
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

  // --- S3 Presigned Upload Helper ---
  async function performPresignedUpload(
    file: File,
    onProgress?: (pct: number) => void,
  ): Promise<string> {
    const res = await api.post("/catalog/products/upload/", {
      filename: file.name,
      content_type: file.type,
      file_size: file.size,
    });
    const { upload_url, file_key } = res.data;

    const isMock = upload_url.includes("mock-s3-bucket");

    if (isMock) {
      if (onProgress) {
        for (let i = 10; i <= 100; i += 10) {
          onProgress(i);
          await new Promise((r) => setTimeout(r, 80));
        }
      }
      return file_key;
    }

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", upload_url, true);
      xhr.setRequestHeader("Content-Type", file.type);

      if (xhr.upload && onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = Math.round((e.loaded / e.total) * 100);
            onProgress(pct);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`S3 upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("S3 upload network error"));
      xhr.send(file);
    });

    return file_key;
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let coverImageValue: any = null;
      let digitalFileValue: any = null;

      // Handle Cover Image upload
      if (coverFile) {
        try {
          const res = await api.post("/catalog/products/upload/", {
            filename: coverFile.name,
            content_type: coverFile.type,
            file_size: coverFile.size,
          });
          if (res.data.upload_url && !res.data.upload_url.includes("mock-s3-bucket")) {
            coverImageValue = await performPresignedUpload(coverFile);
          } else {
            coverImageValue = coverFile;
          }
        } catch {
          coverImageValue = coverFile;
        }
      }

      // Handle Digital File upload
      if (digitalFile) {
        setUploading(true);
        try {
          const res = await api.post("/catalog/products/upload/", {
            filename: digitalFile.name,
            content_type: digitalFile.type,
            file_size: digitalFile.size,
          });
          if (res.data.upload_url && !res.data.upload_url.includes("mock-s3-bucket")) {
            digitalFileValue = await performPresignedUpload(digitalFile, setUploadProgress);
          } else {
            // Local fallback mock animation
            for (let i = 20; i <= 100; i += 20) {
              setUploadProgress(i);
              await new Promise((r) => setTimeout(r, 100));
            }
            digitalFileValue = digitalFile;
          }
        } catch {
          digitalFileValue = digitalFile;
        } finally {
          setUploading(false);
        }
      }

      // Check if we need to use FormData for local uploads (when File objects exist)
      const useFormData = coverImageValue instanceof File || digitalFileValue instanceof File;

      if (useFormData) {
        const fd = new FormData();
        fd.append("title", title);
        fd.append("description", desc);
        fd.append("price", String(price));
        fd.append("is_published", String(isPublished));
        if (coverImageValue) fd.append("cover_image", coverImageValue);
        if (digitalFileValue) fd.append("digital_file", digitalFileValue);

        await api.patch(`/catalog/products/${id}/`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const payload: any = {
          title,
          description: desc,
          price,
          is_published: isPublished,
        };
        if (coverImageValue) payload.cover_image = coverImageValue;
        if (digitalFileValue) payload.digital_file = digitalFileValue;

        await api.patch(`/catalog/products/${id}/`, payload);
      }

      toast.success("Product updated successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update product.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/catalog/products/${id}/`);
      toast.success("Product deleted successfully!");
      navigate({ to: "/dashboard/creator/my-products" });
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to delete product.");
    }
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
            <div className="mt-6 rounded-2xl border-[3px] border-dashed border-border bg-muted p-8 text-center relative">
              <Upload className="mx-auto h-10 w-10 stroke-[2] text-foreground/50" />
              <p className="mt-3 text-base font-bold text-foreground/70">
                {digitalFileName
                  ? `Selected file: ${digitalFileName}`
                  : `Current file: ${p.digital_file ? p.digital_file.split("/").pop() : "No file uploaded"}`}
              </p>
              {digitalFile && (
                <p className="text-xs font-bold text-foreground/60 mt-1">
                  File size: {(digitalFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
              <label className="mt-4 inline-block cursor-pointer rounded-xl border-[3px] border-border bg-white px-5 py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1">
                Replace file
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setDigitalFile(file);
                      setDigitalFileName(file.name);
                    }
                  }}
                />
              </label>
            </div>
            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-xs font-bold text-foreground/70 mb-1">
                  <span>Uploading file...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
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
              {coverPreview ? (
                <img src={coverPreview} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/40 font-bold text-sm">
                  No Cover Image
                </div>
              )}
            </div>
            <label className="mt-4 block w-full text-center cursor-pointer rounded-xl border-[3px] border-border bg-tint-cream py-2.5 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1">
              Change cover
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCoverFile(file);
                    setCoverPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
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
            onClick={handleDelete}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-border bg-tint-rose py-4 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1"
          >
            <Trash2 className="h-5 w-5 stroke-[3px]" /> Delete product
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
