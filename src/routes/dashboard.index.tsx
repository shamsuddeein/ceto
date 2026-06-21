import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { fetchCurrentUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
});

function DashboardIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    async function routeByProfile() {
      const user = await fetchCurrentUser();
      if (!active) return;
      if (!user) {
        navigate({ to: "/login", replace: true });
      } else if (user.creatorprofile?.username || user.profile?.username) {
        navigate({ to: "/dashboard/creator", replace: true });
      } else {
        navigate({ to: "/dashboard/overview", replace: true });
      }
    }
    routeByProfile();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
