import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Camera, HelpCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { profile as mockProfile } from "@/lib/mock-data";
import { User } from "@/types";

export const Route = createFileRoute("/dashboard/creator/profile")({
  head: () => ({ meta: [{ title: "Creator Profile | Cetoh" }] }),
  component: CreatorProfile,
});

function CreatorProfile() {
  const user = mockProfile;
  const isLoading = false;

  const [tab, setTab] = useState<"profile" | "payouts" | "password" | "security">("profile");
  const tabs = [
    { id: "profile", label: "Profile Settings" },
    { id: "payouts", label: "Payout Settings" },
    { id: "password", label: "Change Password" },
    { id: "security", label: "Security" },
  ] as const;

  if (isLoading) {
    return (
      <DashboardLayout title="Settings">
        <div className="flex justify-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl">
        {/* Sidebar Tabs */}
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:w-64 shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 whitespace-nowrap text-left rounded-xl border-[3px] px-5 py-3 sm:px-6 text-sm sm:text-base font-black transition-all ${
                tab === t.id
                  ? "border-border bg-tint-mint text-foreground shadow-vibe-sm lg:-translate-y-1"
                  : "border-transparent bg-transparent text-foreground/70 hover:border-border hover:bg-tint-cream lg:hover:-translate-y-1 hover:shadow-vibe-sm"
              }`}
            >
              {t.label}{" "}
              {t.id === "security" && (
                <span className="ml-2 inline-block rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] text-white uppercase shadow-sm">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {tab === "profile" && <ProfileTab user={user} />}
          {tab === "payouts" && <PayoutsTab user={user} />}
          {tab === "password" && <PasswordTab />}
          {tab === "security" && <SecurityTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({
  label,
  helpText,
  children,
}: {
  label: string;
  helpText?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block w-full">
      <span className="mb-2 block text-sm font-black text-foreground uppercase tracking-wider">
        {label}
      </span>
      {children}
      {helpText && <p className="mt-2 text-xs font-bold text-foreground/60">{helpText}</p>}
    </label>
  );
}

function ProfileTab({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);

  // Form State
  const [firstName, setFirstName] = useState("Deen");
  const [lastName, setLastName] = useState("Yusuf");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("2001-02-28");
  const [creatorType, setCreatorType] = useState("");
  const [storeDesc, setStoreDesc] = useState("");

  // Socials
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");
  const [contactNumber, setContactNumber] = useState("+2349124449345");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Profile updated successfully!");
    } catch (err: unknown) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe flex flex-col gap-8"
    >
      <div>
        <h2 className="font-display text-2xl font-black text-foreground">Profile settings</h2>
        <p className="mt-1 text-sm font-bold text-foreground/60">
          Update your profile and ensure your information is up to date
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="First Name">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
        <Field label="Last Name">
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
      </div>

      <Field label="Email Address" helpText="Verify Email">
        <input
          disabled
          value={user?.email || "talktodeen@gmail.com"}
          className="w-full rounded-2xl border-[3px] border-border bg-tint-mint/30 px-4 py-3 font-bold text-foreground outline-none cursor-not-allowed"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Gender">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Date Of Birth">
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
      </div>

      <Field label="Creator Type">
        <select
          value={creatorType}
          onChange={(e) => setCreatorType(e.target.value)}
          className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none"
        >
          <option value="">Select creator type</option>
          <option>Digital Artist</option>
          <option>Writer</option>
          <option>Developer</option>
          <option>Musician</option>
        </select>
      </Field>

      <Field label="Store Description">
        <textarea
          rows={4}
          value={storeDesc}
          onChange={(e) => setStoreDesc(e.target.value)}
          placeholder="Tell us about your store..."
          className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none resize-none"
        />
      </Field>

      <div className="border-t-[3px] border-border pt-8">
        <h3 className="mb-1 text-sm font-black uppercase tracking-wider text-foreground">
          Social Media Details (Visible on Store)
        </h3>
        <p className="mb-6 text-xs font-bold text-foreground/60">
          At least one social media link is required
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Twitter/X">
            <input
              placeholder="@username"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="Instagram">
            <input
              placeholder="@username"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="Facebook">
            <input
              placeholder="@username or URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="TikTok">
            <input
              placeholder="@username"
              value={tiktok}
              onChange={(e) => setTiktok(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="LinkedIn">
            <input
              placeholder="LinkedIn url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
          <Field label="YouTube">
            <input
              placeholder="@username"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
            />
          </Field>
        </div>
      </div>

      <Field label="Contact Number For Internal Comms And Reminders">
        <input
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border-[3px] border-border bg-primary px-10 py-4 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

function PayoutsTab({ user }: { user: User }) {
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
      await new Promise((r) => setTimeout(r, 600));
      toast.success("Payout method saved successfully!");
    } catch (err: unknown) {
      toast.error("Failed to save payout method");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe"
    >
      <h2 className="font-display text-2xl font-black text-foreground">Payout Settings</h2>
      <div className="mt-8 space-y-6">
        <Field label="Payout Method">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none appearance-none cursor-pointer"
          >
            <option>Bank transfer</option>
            <option>Mobile money</option>
          </select>
        </Field>
        <Field label="Account Holder Name">
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
        <Field label="Account Number">
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
        <Field label="Bank Name">
          <input
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-primary px-8 py-3 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
      >
        {loading && <Loader2 className="h-5 w-5 animate-spin stroke-[3px]" />}{" "}
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

function PasswordTab() {
  const [loading, setLoading] = useState(false);
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Password updated!");
  }
  return (
    <form
      onSubmit={handleSave}
      className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe"
    >
      <h2 className="font-display text-2xl font-black text-foreground">Change Password</h2>
      <div className="mt-8 space-y-6">
        <Field label="Current Password">
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
        <Field label="New Password">
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl border-[3px] border-border bg-background px-4 py-3 font-bold text-foreground outline-none shadow-vibe-sm transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none"
          />
        </Field>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-xl border-[3px] border-border bg-primary px-8 py-3 text-base font-black text-white shadow-vibe hover:-translate-y-1 hover:shadow-vibe-hover disabled:opacity-70 transition-transform"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

function SecurityTab() {
  return (
    <div className="rounded-[2.5rem] border-[4px] border-border bg-white p-6 sm:p-8 shadow-vibe flex flex-col gap-6">
      <h2 className="font-display text-2xl font-black text-foreground">Security Settings</h2>
      <div className="rounded-2xl border-[3px] border-border bg-tint-peach p-6 shadow-vibe-sm">
        <h3 className="font-black text-lg">Two-Factor Authentication</h3>
        <p className="text-sm font-bold text-foreground/70 mt-2">
          Add an extra layer of security to your account.
        </p>
        <button className="mt-4 rounded-xl border-[3px] border-border bg-white px-6 py-2 font-black shadow-vibe-sm transition-transform hover:-translate-y-1">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}
