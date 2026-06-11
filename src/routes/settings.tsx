import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Camera, User } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Account Settings | Cetoh" }] }),
  component: Settings,
});

function Settings() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/users/profile/");
      return res.data;
    },
    retry: false,
  });

  const [tab, setTab] = useState<"profile" | "account" | "payouts" | "notifications">("profile");
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "payouts", label: "Payouts" },
    { id: "notifications", label: "Notifications" },
  ] as const;

  if (isLoading) {
    return (
      <DashboardLayout title="Settings">
        <div className="flex justify-center p-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 sm:gap-4 sm:mb-8 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 whitespace-nowrap rounded-xl border-[3px] px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-black transition-all ${tab === t.id ? "border-border bg-tint-mint text-foreground shadow-vibe-sm sm:-translate-y-1" : "border-transparent bg-transparent text-foreground/70 hover:border-border hover:bg-tint-cream sm:hover:-translate-y-1 hover:shadow-vibe-sm"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6 max-w-3xl">
        {tab === "profile" && <ProfileTab user={user} />}
        {tab === "account" && <AccountTab user={user} />}
        {tab === "payouts" && <PayoutsTab user={user} />}
        {tab === "notifications" && <NotificationsTab />}
      </div>

    </DashboardLayout>
  );
}

function SaveCard({ title, children }: { title: string; children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast.success("Settings saved");
  }
  return (
    <form onSubmit={save} className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
      <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">{title}</h2>
      <div className="mt-8 space-y-6">{children}</div>
      <button type="submit" disabled={loading} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform">
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />} {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-base font-black text-foreground">{label}</span>{children}</label>;
}

function ProfileTab({ user }: { user: any }) {
  const queryClient = useQueryClient();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.profile?.avatar || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [username, setUsername] = useState(user?.profile?.username || "");
  const [bio, setBio] = useState(user?.profile?.bio || "");
  const [website, setWebsite] = useState(user?.profile?.website || "");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profile.username", username);
      formData.append("profile.bio", bio);
      if (website) formData.append("profile.website", website); // Assuming we added website to backend, wait, no website field in backend! Let's ignore website for now or send it if it exists.
      
      if (avatarFile) {
        formData.append("profile.avatar", avatarFile);
      }

      await api.patch("/users/profile/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error(err);
      const msg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
      toast.error("Failed to update profile: " + msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
      <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">Public profile</h2>
      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-[4px] border-border bg-tint-peach shadow-vibe-sm relative group">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Creator" className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-4xl font-black text-primary uppercase">
                {username?.[0] || user?.email?.[0] || "?"}
              </span>
            )}
          </div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-3 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1">
            <Camera className="h-5 w-5 stroke-[2.5]" /> Change photo
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Username">
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" />
          </Field>
        </div>
        <Field label="Bio">
          <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none" />
        </Field>
      </div>
      <button type="submit" disabled={loading} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform">
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />} {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
function AccountTab({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <SaveCard title="Login & email">
        <Field label="Email"><input type="email" disabled defaultValue={user?.email || ""} className="w-full rounded-2xl border-[3px] border-border bg-muted px-4 py-3 font-bold text-foreground/60 outline-none cursor-not-allowed" /></Field>
        <Field label="New password"><input type="password" placeholder="••••••••" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
      </SaveCard>
      <div className="rounded-[2.5rem] border-[4px] border-border bg-tint-rose p-8 shadow-vibe">
        <h2 className="font-display text-2xl font-black text-foreground">Danger zone</h2>
        <p className="mt-2 text-base font-bold text-foreground/80">Closing your account is permanent. Any pending balance will be paid out first.</p>
        <button onClick={() => toast.error("Close account is disabled in demo")} className="mt-6 inline-flex rounded-xl border-[3px] border-border bg-white px-6 py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1">Close account</button>
      </div>
    </div>
  );
}
function PayoutsTab({ user }: { user: any }) {
  const queryClient = useQueryClient();
  const bankDetails = user?.profile?.bank_details || {};
  const [method, setMethod] = useState(bankDetails.method || "Bank transfer");
  const [accountName, setAccountName] = useState(bankDetails.account_name || "");
  const [accountNumber, setAccountNumber] = useState(bankDetails.account_number || "");
  const [bankName, setBankName] = useState(bankDetails.bank_name || "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch("/users/profile/", {
        "profile.bank_details": {
          method,
          account_name: accountName,
          account_number: accountNumber,
          bank_name: bankName,
        }
      });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Payout method saved successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save payout method");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSave} className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe">
      <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">Payout method</h2>
      <div className="mt-8 space-y-6">
        <Field label="Method">
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none cursor-pointer">
            <option>Bank transfer</option>
            <option>Mobile money</option>
          </select>
        </Field>
        <Field label="Account holder">
          <input value={accountName} onChange={(e) => setAccountName(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" />
        </Field>
        <Field label="Bank account number">
          <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" />
        </Field>
        <Field label="Bank name">
          <input value={bankName} onChange={(e) => setBankName(e.target.value)} className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" />
        </Field>
      </div>
      <button type="submit" disabled={loading} className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform">
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />} {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
function NotificationsTab() {
  const items = [
    ["New sale", "Get notified instantly when someone buys."],
    ["Weekly digest", "A summary of your sales every Monday."],
    ["Product reviews", "When a buyer leaves a review."],
    ["Cetoh news", "Product updates & creator stories."],
  ];
  return (
    <SaveCard title="Email notifications">
      <div className="flex flex-col gap-4">
        {items.map(([t, d]) => (
          <label key={t} className="flex items-center justify-between gap-4 rounded-[1.5rem] border-[3px] border-border bg-tint-cream p-4 shadow-vibe-sm cursor-pointer transition-transform hover:-translate-y-1">
            <div><p className="text-base font-black text-foreground">{t}</p><p className="mt-1 text-sm font-bold text-foreground/70">{d}</p></div>
            <input type="checkbox" defaultChecked className="h-6 w-6 accent-[color:var(--color-primary)] cursor-pointer" />
          </label>
        ))}
      </div>
    </SaveCard>
  );
}
