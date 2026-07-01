import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, PackageOpen, Download } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { dashboardData } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/empty-state";
import { User, Order } from "@/types";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/lib/auth";

type OverviewSearch = {
  access_token?: string;
};

export const Route = createFileRoute("/dashboard/overview")({
  validateSearch: (search: Record<string, unknown>): OverviewSearch => ({
    access_token: search.access_token ? (search.access_token as string) : undefined,
  }),
  head: () => ({ meta: [{ title: "Overview | Cetoh" }] }),
  component: Overview,
});

function Overview() {
  const { access_token } = Route.useSearch();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(!!access_token);

  useEffect(() => {
    if (!access_token) return;

    let active = true;
    async function verifyLink() {
      if (!access_token) return;
      try {
        await api.get("/auth/verify-access-link/", {
          params: { token: access_token },
        });
        if (!active) return;

        window.localStorage.setItem("guest_token", access_token);
        window.localStorage.setItem("dashboard_role", "customer");

        toast.success("Access link verified successfully!");

        // Redirect to overview page WITHOUT the query parameter
        navigate({
          to: "/dashboard/overview",
          replace: true,
        });
      } catch (err: any) {
        if (!active) return;
        const msg = err.response?.data?.detail || "Invalid or expired access link.";
        toast.error(msg);
        navigate({
          to: "/login",
          replace: true,
        });
      } finally {
        if (active) {
          setVerifying(false);
        }
      }
    }

    verifyLink();
    return () => {
      active = false;
    };
  }, [access_token, navigate]);

  const { data: profileUser, isLoading: profileLoading } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      const currentUser = await fetchCurrentUser();
      if (!currentUser) {
        throw new Error("Not authenticated");
      }
      return currentUser;
    },
    enabled:
      typeof window !== "undefined" && !verifying && !window.localStorage.getItem("guest_token"),
    retry: false,
  });

  const [tab, setTab] = useState<"purchases" | "downloads" | "account" | "notifications">(
    "purchases",
  );
  const tabs = [
    { id: "purchases", label: "Purchase History" },
    { id: "downloads", label: "Active Downloads" },
    { id: "account", label: "Account Settings" },
    { id: "notifications", label: "Notifications" },
  ] as const;

  if (verifying || profileLoading) {
    return (
      <DashboardLayout title="Overview">
        <div className="flex flex-col items-center justify-center p-12 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary stroke-[3px]" />
          <p className="font-bold text-foreground/70">
            {verifying ? "Verifying access link..." : "Loading profile..."}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const user = profileUser || ({ id: "guest", email: "Magic-link guest" } as User);

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
  const guestToken =
    typeof window !== "undefined" ? window.localStorage.getItem("guest_token") : null;

  const { data: purchases = [], isLoading } = useQuery<Order[]>({
    queryKey: ["purchases", guestToken],
    queryFn: async () => {
      const res = await api.get("/orders/purchases/", {
        params: guestToken ? { token: guestToken } : {},
      });
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const handleDownload = (o: Order) => {
    const emailQuery = guestToken ? `?email=${o.buyer_email}` : "";
    window.open(
      `${api.defaults.baseURL || "/api"}/orders/${o.transaction_reference}/download/${emailQuery}`,
      "_blank",
    );
  };

  const getProductTitle = (product: Order["product"]) => {
    if (product && typeof product === "object") return product.title;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

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
              <p className="font-black text-lg line-clamp-1">
                {getProductTitle(o.product) || `Purchase #${o.id}`}
              </p>
              <p className="text-sm font-bold text-foreground/70">
                {new Date(o.created_at).toLocaleDateString()} • ₦
                {Number(o.amount).toLocaleString("en-US")}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(o)}
            className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-background px-4 py-2 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1"
          >
            <Download className="h-4 w-4 stroke-[3px]" /> Download
          </button>
        </div>
      ))}
    </div>
  );
}

function DownloadsTab() {
  const guestToken =
    typeof window !== "undefined" ? window.localStorage.getItem("guest_token") : null;

  const { data: active = [], isLoading } = useQuery<Order[]>({
    queryKey: ["downloads", guestToken],
    queryFn: async () => {
      const res = await api.get("/orders/purchases/", {
        params: {
          active: "true",
          ...(guestToken ? { token: guestToken } : {}),
        },
      });
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const getExpiresInHours = (createdAt: string) => {
    const created = new Date(createdAt).getTime();
    const now = new Date().getTime();
    const diffMs = created + 48 * 60 * 60 * 1000 - now;
    const hours = Math.max(0, Math.floor(diffMs / (60 * 60 * 1000)));
    return hours;
  };

  const handleDownload = (o: Order) => {
    const emailQuery = guestToken ? `?email=${o.buyer_email}` : "";
    window.open(
      `${api.defaults.baseURL || "/api"}/orders/${o.transaction_reference}/download/${emailQuery}`,
      "_blank",
    );
  };

  const getProductTitle = (product: Order["product"]) => {
    if (product && typeof product === "object") return product.title;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

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
              <p className="font-black text-lg line-clamp-1">
                {getProductTitle(o.product) || `Active Link #${o.id}`}
              </p>
              <p className="text-sm font-bold text-foreground/70">
                Expires in {getExpiresInHours(o.created_at)} hours
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDownload(o)}
            className="flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-vibe-sm transition-transform hover:-translate-y-1"
          >
            <Download className="h-4 w-4 stroke-[3px]" /> Download Now
          </button>
        </div>
      ))}
    </div>
  );
}

function AccountTab({ user }: { user: User }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.display_name || user.profile?.username || "");
    }
  }, [user]);

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault();
    setSavingName(true);
    try {
      await api.put("/users/settings/", { display_name: displayName });
      toast.success("Display name updated!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update display name.");
    } finally {
      setSavingName(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!oldPassword || !newPassword)
      return toast.error("Enter both your current and new password.");
    if (newPassword.length < 8) return toast.error("New password must be at least 8 characters.");
    setSavingPw(true);
    try {
      await api.post("/users/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      toast.success("Password changed. Please log in again.");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      const data = err.response?.data;
      const msg =
        data?.old_password?.[0] ||
        data?.new_password?.[0] ||
        data?.detail ||
        "Failed to change password.";
      toast.error(msg);
    } finally {
      setSavingPw(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Display name */}
      <form
        onSubmit={handleSaveName}
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
        </div>
        <button
          type="submit"
          disabled={savingName}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-primary px-8 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
        >
          {savingName && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
          {savingName ? "Saving…" : "Save display name"}
        </button>
      </form>

      {/* Change password */}
      <form
        onSubmit={handleChangePassword}
        className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe"
      >
        <h2 className="font-display text-xl sm:text-2xl font-black text-foreground">
          Change Password
        </h2>
        <div className="mt-8 space-y-6">
          <Field label="Current Password">
            <input
              type="password"
              placeholder="••••••••"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="New Password">
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
        </div>
        <button
          type="submit"
          disabled={savingPw}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-border bg-foreground px-8 py-4 text-base font-black text-background shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
        >
          {savingPw && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
          {savingPw ? "Updating…" : "Change password"}
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
