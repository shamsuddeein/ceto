import { api } from "@/lib/axios";
import { User } from "@/types";

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const res = await api.get("/users/profile/");
    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export function clearClientSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem("dashboard_role");
  window.localStorage.removeItem("guest_token");
  window.localStorage.removeItem("mock_token");
  window.localStorage.removeItem("mock_role");
}
