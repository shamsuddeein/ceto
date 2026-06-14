import { createFileRoute, redirect } from "@tanstack/react-router";
import { profile as mockProfile } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    // In a real app, you would check the auth context here.
    // For the prototype, we check localStorage.
    const user =
      typeof window !== "undefined" && window.localStorage.getItem("mock_token")
        ? mockProfile
        : null;

    if (!user) {
      throw redirect({
        to: "/login",
      });
    }

    if (user.profile?.username) {
      throw redirect({
        to: "/dashboard/creator",
      });
    }

    throw redirect({
      to: "/dashboard/overview",
    });
  },
});
