import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCheck, Package, Wallet, ShoppingBag, Info, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications | Cetoh" }] }),
  component: NotificationsPage,
});

type NotificationType =
  | "sale"
  | "withdrawal"
  | "product"
  | "info"
  | "payment_confirmed"
  | "delivery_sent"
  | "announcement";

interface Notification {
  id: string | number;
  type: NotificationType;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

const TYPE_CONFIG: Record<NotificationType, { icon: React.ElementType; tint: string }> = {
  sale: { icon: ShoppingBag, tint: "bg-tint-mint" },
  payment_confirmed: { icon: ShoppingBag, tint: "bg-tint-mint" },
  withdrawal: { icon: Wallet, tint: "bg-tint-mint" },
  product: { icon: Package, tint: "bg-tint-peach" },
  delivery_sent: { icon: Package, tint: "bg-tint-peach" },
  info: { icon: Info, tint: "bg-tint-cream" },
  announcement: { icon: Info, tint: "bg-tint-cream" },
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
  const queryClient = useQueryClient();
  const [markingAll, setMarkingAll] = useState(false);

  // Fetch notifications dynamically from API
  const { data: notifications = [], isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications/");
      // The API returns a paginated list of notifications: results
      return res.data.results || [];
    },
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  async function markRead(id: string | number) {
    try {
      await api.post(`/notifications/${id}/mark-read/`);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch {
      toast.error("Could not mark notification as read.");
    }
  }

  async function markAllRead() {
    setMarkingAll(true);
    try {
      await api.post("/notifications/mark-all-read/");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Could not mark all notifications as read.");
    } finally {
      setMarkingAll(false);
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Notifications">
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Notifications">
      <div className="mx-auto max-w-3xl">
        {/* Header row */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-border bg-tint-mint shadow-vibe-sm">
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
              className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-2.5 text-sm font-black text-foreground shadow-vibe-sm transition-transform hover:-translate-y-1 hover:bg-tint-peach disabled:opacity-60"
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
