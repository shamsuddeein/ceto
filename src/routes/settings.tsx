import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import avatarImg from "@/assets/avatar.png";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Account Settings | Cetoh" }] }),
  component: Settings,
});

function Settings() {
  const [tab, setTab] = useState<"profile" | "account" | "payouts" | "notifications">("profile");
  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "payouts", label: "Payouts" },
    { id: "notifications", label: "Notifications" },
  ] as const;
  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`rounded-xl border-[3px] px-6 py-3 text-base font-black transition-all ${tab === t.id ? "border-border bg-tint-mint text-foreground shadow-vibe-sm -translate-y-1" : "border-transparent bg-transparent text-foreground/70 hover:border-border hover:bg-tint-cream hover:-translate-y-1 hover:shadow-vibe-sm"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6 max-w-3xl">
        {tab === "profile" && <ProfileTab />}
        {tab === "account" && <AccountTab />}
        {tab === "payouts" && <PayoutsTab />}
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
    <form onSubmit={save} className="rounded-[2.5rem] border-[4px] border-border bg-white p-8 shadow-vibe">
      <h2 className="font-display text-2xl font-black text-foreground">{title}</h2>
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

function ProfileTab() {
  return (
    <SaveCard title="Public profile">
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 overflow-hidden rounded-full border-[4px] border-border bg-tint-peach shadow-vibe-sm relative group cursor-pointer">
          <img src={avatarImg} alt="Creator" className="h-full w-full object-cover" />
        </div>
        <button type="button" className="inline-flex items-center gap-2 rounded-xl border-[3px] border-border bg-white px-4 py-3 text-sm font-black shadow-vibe-sm transition-transform hover:-translate-y-1"><Camera className="h-5 w-5 stroke-[2.5]" /> Change photo</button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Display name"><input defaultValue="Creator Name" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
        <Field label="Username"><input defaultValue="creator" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
      </div>
      <Field label="Bio"><textarea rows={3} defaultValue="Helping founders ship better digital products." className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none" /></Field>
      <Field label="Website"><input defaultValue="https://" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
    </SaveCard>
  );
}
function AccountTab() {
  return (
    <div className="space-y-6">
      <SaveCard title="Login & email">
        <Field label="Email"><input type="email" defaultValue="me@example.com" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
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
function PayoutsTab() {
  return (
    <SaveCard title="Payout method">
      <Field label="Method">
        <select className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none cursor-pointer"><option>Bank transfer</option><option>Mobile money</option></select>
      </Field>
      <Field label="Account holder"><input defaultValue="Creator Name" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
      <Field label="Bank account number"><input defaultValue="0123456789" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
      <Field label="Bank name"><input defaultValue="Stanbic Bank" className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none" /></Field>
    </SaveCard>
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
