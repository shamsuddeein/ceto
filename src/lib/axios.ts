import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally, add interceptors here later to handle 401s and automatic token refreshing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we receive a 401 Unauthorized, we could redirect to login here
    // or attempt to hit a /api/auth/token/refresh/ endpoint automatically.
    return Promise.reject(error);
  }
);
