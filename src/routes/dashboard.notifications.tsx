import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck, Package, Wallet, ShoppingBag, Info } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications | Cetoh" }] }),
  component: NotificationsPage,
});

type NotificationType = "sale" | "withdrawal" | "product" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "sale",
    title: "New sale",
    body: "Ada Okafor purchased Creator Launch Course for ₦30,000.",
    is_read: false,
    created_at: "2026-06-10T10:20:00.000Z",
  },
  {
    id: "n2",
    type: "withdrawal",
    title: "Withdrawal processed",
    body: "Your withdrawal of ₦120,000 has been processed and sent to your bank account.",
    is_read: false,
    created_at: "2026-06-09T09:00:00.000Z",
  },
  {
    id: "n3",
    type: "sale",
    title: "New sale",
    body: "Tunde Bello purchased Milk and Honey [eBook] for ₦4,500.",
    is_read: false,
    created_at: "2026-06-09T13:45:00.000Z",
  },
  {
    id: "n4",
    type: "product",
    title: "Product published",
    body: "Your product Notion Business Template is now live on the marketplace.",
    is_read: true,
    created_at: "2026-06-07T08:10:00.000Z",
  },
  {
    id: "n5",
    type: "info",
    title: "0% commission extended",
    body: "Great news! Your 0% commission period has been extended for another month. Keep selling!",
    is_read: true,
    created_at: "2026-06-05T12:00:00.000Z",
  },
  {
    id: "n6",
    type: "sale",
    title: "New sale",
    body: "Maryam Yusuf purchased Notion Business Template for ₦15,000.",
    is_read: true,
    created_at: "2026-06-04T15:30:00.000Z",
  },
];

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; tint: string }> = {
  sale: { icon: ShoppingBag, tint: "bg-tint-mint" },
  withdrawal: { icon: Wallet, tint: "bg-tint-peach" },
  product: { icon: Package, tint: "bg-tint-lilac" },
  info: { icon: Info, tint: "bg-tint-cream" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [markingAll, setMarkingAll] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  }

  async function markAllRead() {
    setMarkingAll(true);
    // Mocked — replace with: await api.post("/notifications/mark-all-read/")
    await new Promise((r) => setTimeout(r, 600));
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    toast.success("All notifications marked as read.");
    setMarkingAll(false);
  }

  return (
    <DashboardLayout title="Notifications">
      <div className="mx-auto max-w-3xl">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-border bg-tint-peach shadow-vibe-sm">
              <Bell className="h-5 w-5 stroke-[2.5] text-foreground" />
            </div>
            <div>
              <p className="text-lg font-black text-foreground">Activity feed</p>
              {unreadCount > 0 && (
                <p className="text-sm font-bold text-foreground/60">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              disabled={markingAll}
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-2.5 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-mint disabled:opacity-60"
            >
              {markingAll ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
                  Marking...
                </>
              ) : (
                <>
                  <CheckCheck className="h-4 w-4 stroke-[2.5]" />
                  Mark all read
                </>
              )}
            </button>
          )}
        </div>

        {/* Notification list */}
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-[4px] border-border bg-white py-24 text-center shadow-vibe">
            <div className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-border bg-tint-cream shadow-vibe-sm">
              <Bell className="h-8 w-8 stroke-[2] text-foreground/50" />
            </div>
            <p className="mt-4 font-display text-xl font-black text-foreground">All caught up</p>
            <p className="mt-1 text-sm font-bold text-foreground/60">
              New activity will appear here.
            </p>
          </div>
        ) : (
          <div className="rounded-[2.5rem] border-[4px] border-border bg-white shadow-vibe overflow-hidden">
            {notifications.map((n, idx) => {
              const cfg = TYPE_CONFIG[n.type];
              const Icon = cfg.icon;
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-4 px-6 py-5 transition-colors ${
                    !n.is_read ? "bg-tint-cream/60" : "bg-white"
                  } ${idx !== 0 ? "border-t-[3px] border-border" : ""}`}
                >
                  {/* Icon */}
                  <div
                    className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[3px] border-border ${cfg.tint} shadow-vibe-sm`}
                  >
                    <Icon className="h-5 w-5 stroke-[2.5] text-foreground" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className={`font-black text-foreground ${!n.is_read ? "text-foreground" : "text-foreground/80"}`}
                        >
                          {n.title}
                          {!n.is_read && (
                            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary align-middle" />
                          )}
                        </p>
                        <p className="mt-1 text-sm font-bold text-foreground/60 leading-snug">
                          {n.body}
                        </p>
                        <p className="mt-2 text-xs font-bold text-foreground/40">
                          {formatDate(n.created_at)}
                        </p>
                      </div>
                      {!n.is_read && (
                        <button
                          onClick={() => markRead(n.id)}
                          className="shrink-0 rounded-lg border-[2px] border-border bg-white px-3 py-1.5 text-xs font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-0.5 hover:bg-tint-mint"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
