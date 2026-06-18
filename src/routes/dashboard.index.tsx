import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { profile as mockProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const user =
      typeof window !== "undefined" && window.localStorage.getItem("mock_token")
        ? mockProfile
        : null;

    if (!user) {
      navigate({ to: "/login", replace: true });
    } else if (user.profile?.username) {
      navigate({ to: "/dashboard/creator", replace: true });
    } else {
      navigate({ to: "/dashboard/overview", replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
