import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, PackageOpen, Download } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { profile as mockProfile, dashboardData } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { User, Order } from "@/types";

export const Route = createFileRoute("/dashboard/overview")({
  head: () => ({ meta: [{ title: "Overview | Cetoh" }] }),
  component: Overview,
});

function Overview() {
  const user = mockProfile;
  const isLoading = false;

  const [tab, setTab] = useState<"purchases" | "downloads" | "account" | "notifications">(
    "purchases",
  );
  const tabs = [
    { id: "purchases", label: "Purchase History" },
    { id: "downloads", label: "Active Downloads" },
    { id: "account", label: "Account Settings" },
    { id: "notifications", label: "Notifications" },
  ] as const;

  if (isLoading) {
    return (
      <DashboardLayout title="Overview">
        <div className="flex justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Overview">
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 sm:gap-4 sm:mb-8 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 whitespace-nowrap rounded-xl border-[3px] px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-black transition-all ${tab === t.id ? "border-border bg-tint-mint text-foreground shadow-vibe-sm sm:-translate-y-1" : "border-transparent bg-transparent text-foreground/70 hover:border-border hover:bg-tint-cream sm:hover:-translate-y-1 hover:shadow-vibe-sm"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6 max-w-3xl">
        {tab === "purchases" && <PurchasesTab />}
        {tab === "downloads" && <DownloadsTab />}
        {tab === "account" && <AccountTab user={user} />}
        {tab === "notifications" && <NotificationsTab user={user} />}
      </div>
    </DashboardLayout>
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

function PurchasesTab() {
  // Using recent orders as dummy purchase history. Setting to empty for the empty state view.
  const purchases: Order[] = [];

  if (purchases.length === 0) {
    return (
      <EmptyState
        title="No purchases yet"
        description="Once you access your purchased items via the link sent to your mail, you can view them here."
        icon={<PackageOpen className="h-10 w-10 text-foreground stroke-[2.5]" />}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {purchases.map((o: Order) => (
        <div
          key={o.id}
          className="rounded-2xl border-[3px] border-border bg-white p-5 shadow-vibe-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm bg-tint-mint">
              <PackageOpen className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <p className="font-black text-lg line-clamp-1">Product Purchase #{o.id}</p>
              <p className="text-sm font-bold text-foreground/70">
                {new Date(o.created_at).toLocaleDateString()} • ₦
                {Number(o.amount).toLocaleString("en-US")}
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-background px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1">
            <Download className="h-4 w-4 stroke-[3px]" /> Download
          </button>
        </div>
      ))}
    </div>
  );
}

function DownloadsTab() {
  const purchases = dashboardData()?.recent_orders || [];
  const active = purchases.slice(0, 1); // Mock 1 active download

  if (active.length === 0) {
    return (
      <EmptyState
        title="No active downloads"
        description="Downloads are available for 48 hours after purchase."
        icon={<Download className="h-10 w-10 text-foreground stroke-[2.5]" />}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {active.map((o: Order) => (
        <div
          key={o.id}
          className="rounded-2xl border-[3px] border-border bg-tint-cream p-5 shadow-vibe-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-[3px] border-border shadow-vibe-sm bg-tint-lilac">
              <PackageOpen className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <p className="font-black text-lg line-clamp-1">Active Link #{o.id}</p>
              <p className="text-sm font-bold text-foreground/70">Expires in 47 hours</p>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1">
            <Download className="h-4 w-4 stroke-[3px]" /> Download Now
          </button>
        </div>
      ))}
    </div>
  );
}

function AccountTab({ user }: { user: User }) {
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(user?.profile?.username || "");
  const [loading, setLoading] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Settings updated successfully!");
      setPassword("");
    } catch (err: unknown) {
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSave}
        className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe"
      >
        <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">
          Account Settings
        </h2>
        <div className="mt-8 space-y-6">
          <Field label="Display Name">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full rounded-2xl border-[3px] border-border bg-muted px-4 py-3 font-bold text-foreground/60 outline-none cursor-not-allowed"
            />
          </Field>
          <Field label="New password">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
      <div className="rounded-[2.5rem] border-[4px] border-border bg-tint-rose p-8 shadow-vibe">
        <h2 className="font-display text-2xl font-black text-foreground">Danger zone</h2>
        <p className="mt-2 text-base font-bold text-foreground/80">
          Closing your account is permanent. Any pending balance will be paid out first.
        </p>
        <button
          onClick={() => toast.error("Close account is disabled in demo")}
          className="mt-6 inline-flex rounded-xl border-[3px] border-border bg-white px-6 py-3 text-base font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1"
        >
          Close account
        </button>
      </div>
    </div>
  );
}

function NotificationsTab({ user }: { user: User }) {
  const prefs = user?.profile?.notification_preferences || {};

  const [items, setItems] = useState([
    {
      id: "payment_confirmed",
      label: "Payment Confirmations",
      desc: "Get notified when a payment succeeds.",
      checked: prefs.payment_confirmed ?? true,
    },
    {
      id: "delivery_sent",
      label: "Delivery Receipts",
      desc: "Get notified when a product is delivered to you.",
      checked: prefs.delivery_sent ?? true,
    },
    {
      id: "announcements",
      label: "Platform Announcements",
      desc: "Updates and news from Cetoh.",
      checked: prefs.announcements ?? true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  function toggle(id: string) {
    setItems(items.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Notification preferences saved!");
    } catch (err: unknown) {
      toast.error("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe"
    >
      <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">Notifications</h2>
      <div className="mt-8 flex flex-col gap-4">
        {items.map((it) => (
          <label
            key={it.id}
            className="flex items-center justify-between gap-4 rounded-[1.5rem] border-[3px] border-border bg-tint-cream p-4 shadow-vibe-sm cursor-pointer transition-transform hover:-translate-y-1"
          >
            <div>
              <p className="text-base font-black text-foreground">{it.label}</p>
              <p className="mt-1 text-sm font-bold text-foreground/70">{it.desc}</p>
            </div>
            <input
              type="checkbox"
              checked={it.checked}
              onChange={() => toggle(it.id)}
              className="h-6 w-6 accent-[color:var(--color-primary)] cursor-pointer"
            />
          </label>
        ))}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
