import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Upload, Loader2, Image as ImageIcon, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Category } from "@/types";

export const Route = createFileRoute("/dashboard/creator/add-product")({
  head: () => ({ meta: [{ title: "Add Product | Cetoh" }] }),
  component: AddProduct,
});

type ProductType = "ebook" | "course" | "template" | "service";

function AddProduct() {
  const navigate = Route.useNavigate();

  // Form state
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [type, setType] = useState<ProductType>("ebook");
  const [price, setPrice] = useState("15000");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number>("");

  // File and upload states
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [digitalFileName, setDigitalFileName] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Loading states
  const [submitting, setSubmitting] = useState(false);
  const [aiDescLoading, setAiDescLoading] = useState(false);
  const [aiPriceLoading, setAiPriceLoading] = useState(false);

  // Fetch categories dynamically from API
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/catalog/categories/");
      return res.data.results || [];
    },
  });

  // Set default category when categories list loads
  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const selectedCategory = categories.find((c) => String(c.id) === String(selectedCategoryId));
  const categoryName = selectedCategory ? selectedCategory.name : "";

  // --- AI: Generate Description ---
  async function handleGenerateDescription() {
    if (!title.trim()) {
      toast.error("Enter a product title first so the AI has something to work with.");
      return;
    }
    setAiDescLoading(true);
    try {
      const res = await api.post("/ai/describe-product/", {
        title,
        category: categoryName || "Digital Product",
        keywords: type,
      });
      setFullDesc(res.data.description);
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
      const res = await api.post("/ai/suggest-price/", {
        title,
        category: categoryName || "Digital Product",
        description: fullDesc,
      });
      setPrice(String(res.data.suggested_price_ngn));
      toast.success(
        `Suggested price: ₦${Number(res.data.suggested_price_ngn).toLocaleString("en-US")} — ${res.data.reasoning}`,
      );
    } catch {
      toast.error("Could not suggest a price. Try again.");
    } finally {
      setAiPriceLoading(false);
    }
  }

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

    // Check if it's the mock S3 bucket URL
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

  // --- Submit ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return toast.error("Product title is required.");
    if (!fullDesc.trim()) return toast.error("Full description is required.");
    if (!selectedCategoryId) return toast.error("Please select a category.");
    setSubmitting(true);
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
        fd.append("description", fullDesc);
        fd.append("price", price);
        fd.append("category_id", String(selectedCategoryId));
        fd.append("is_published", "true");
        if (coverImageValue) fd.append("cover_image", coverImageValue);
        if (digitalFileValue) fd.append("digital_file", digitalFileValue);

        await api.post("/catalog/products/", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        const payload: any = {
          title,
          description: fullDesc,
          price: Number(price),
          category_id: Number(selectedCategoryId),
          is_published: true,
        };
        if (coverImageValue) payload.cover_image = coverImageValue;
        if (digitalFileValue) payload.digital_file = digitalFileValue;

        await api.post("/catalog/products/", payload);
      }

      toast.success("Product published successfully!");
      navigate({ to: "/dashboard/creator/my-products" });
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Could not save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isAnyLoading = submitting || aiDescLoading || aiPriceLoading || uploading;

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
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream p-12 text-center transition-all hover:bg-tint-peach hover:shadow-vibe-sm relative">
              <div className="mb-2 rounded-full border-[3px] border-border bg-white p-4 shadow-vibe-sm">
                <Upload className="h-8 w-8 stroke-[2.5] text-foreground" />
              </div>
              <span className="text-lg font-black text-foreground">
                {digitalFileName || "Upload your file"}
              </span>
              <span className="text-sm font-bold text-foreground/70">
                {digitalFile
                  ? `${(digitalFile.size / 1024 / 1024).toFixed(2)} MB`
                  : "PDF, ZIP, MP4 — up to 2GB"}
              </span>
              <input
                type="file"
                className="hidden"
                disabled={isAnyLoading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setDigitalFile(file);
                    setDigitalFileName(file.name);
                  }
                }}
              />
            </label>
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
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                disabled={isAnyLoading}
                className="w-full appearance-none cursor-pointer rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none disabled:opacity-60"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Cover image */}
          <Card title="Cover image">
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center rounded-[2rem] border-[4px] border-dashed border-border bg-tint-cream text-foreground/60 overflow-hidden">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon className="mb-2 h-10 w-10 stroke-[2.5]" />
                  <span className="text-sm font-bold">No cover image</span>
                </>
              )}
            </div>
            <label className="mt-4 block w-full text-center cursor-pointer rounded-xl border-[3px] border-border bg-white py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-peach">
              {coverFile ? "Change cover" : "Upload cover"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isAnyLoading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCoverFile(file);
                    setCoverPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
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
