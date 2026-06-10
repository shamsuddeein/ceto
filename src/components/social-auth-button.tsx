import { Loader2 } from "lucide-react";

type Provider = "google" | "x" | "facebook";

function ProviderIcon({ provider }: { provider: Provider }) {
  if (provider === "google") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 48 48" aria-hidden>
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.4l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C40.5 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z" />
      </svg>
    );
  }
  if (provider === "x") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2H21.5l-7.5 8.575L23 22h-6.875l-5.39-7.04L4.5 22H1.243l8.04-9.193L1 2h7.04l4.875 6.444L18.244 2zm-1.2 18h1.86L7.05 4h-2L17.044 20z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path fill="#1877F2" d="M24 12a12 12 0 1 0-13.875 11.853V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.383A12.003 12.003 0 0 0 24 12z" />
      <path fill="#fff" d="M16.671 15.47L17.203 12h-3.328V9.75c0-.95.465-1.875 1.956-1.875h1.514V4.922s-1.373-.234-2.686-.234c-2.741 0-4.533 1.661-4.533 4.668V12H7.078v3.47h3.047v8.383a12.094 12.094 0 0 0 3.75 0V15.47h2.796z" />
    </svg>
  );
}

export function SocialAuthButton({
  provider,
  children,
  loading,
  ...rest
}: {
  provider: Provider;
  children: React.ReactNode;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:opacity-60"
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ProviderIcon provider={provider} />}
      {children}
    </button>
  );
}
