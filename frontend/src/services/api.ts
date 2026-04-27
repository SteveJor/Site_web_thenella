import { API_BASE_URL } from "../config/constants";

function getToken(): string | null {
  return localStorage.getItem("thenella_token");
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as object) || {}),
  };
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Erreur réseau" }));
    throw new Error(err.detail || "Erreur serveur");
  }
  if (res.status === 204) return null as T;
  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────

export const authApi = {
  login: (username: string, password: string) =>
    request<{ access_token: string; token_type: string; username: string }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ username, password }) }
    ),
  me: () => request<{ id: number; username: string; email: string }>("/auth/me"),
};

// ─── Biography ───────────────────────────────────────────────────────────

export const biographyApi = {
  get: () => request<any>("/biography"),
  update: (data: any) => request<any>("/biography", { method: "PUT", body: JSON.stringify(data) }),
};

// ─── Achievements ────────────────────────────────────────────────────────

export const achievementsApi = {
  getAll: () => request<any[]>("/achievements"),
  create: (data: any) => request<any>("/achievements", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request<any>(`/achievements/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request<any>(`/achievements/${id}`, { method: "DELETE" }),
};

// ─── Music ───────────────────────────────────────────────────────────────

export const musicApi = {
  getAll: () => request<any[]>("/music"),
  create: (data: any) => request<any>("/music", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request<any>(`/music/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request<any>(`/music/${id}`, { method: "DELETE" }),
};

// ─── Gallery ─────────────────────────────────────────────────────────────

export const galleryApi = {
  getAll: () => request<any[]>("/gallery"),
  create: (data: any) => request<any>("/gallery", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request<any>(`/gallery/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request<any>(`/gallery/${id}`, { method: "DELETE" }),
};

// ─── YouTube ─────────────────────────────────────────────────────────────

export const youtubeApi = {
  getVideos: () => request<any[]>("/youtube/videos"),
  createVideo: (data: any) =>
    request<any>("/youtube/videos", { method: "POST", body: JSON.stringify(data) }),
  updateVideo: (id: number, data: any) =>
    request<any>(`/youtube/videos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteVideo: (id: number) =>
    request<any>(`/youtube/videos/${id}`, { method: "DELETE" }),
  getChannel: () => request<any>("/youtube/channel"),
  updateChannel: (data: any) =>
    request<any>("/youtube/channel", { method: "PUT", body: JSON.stringify(data) }),
};

// ─── Social Media ─────────────────────────────────────────────────────────

export const socialMediaApi = {
  getAll: () => request<any[]>("/social-media"),
  create: (data: any) =>
    request<any>("/social-media", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: any) =>
    request<any>(`/social-media/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request<any>(`/social-media/${id}`, { method: "DELETE" }),
};

// ─── Contact ──────────────────────────────────────────────────────────────

export const contactApi = {
  send: (data: any) =>
    request<any>("/contact", { method: "POST", body: JSON.stringify(data) }),
  getAll: (is_read?: boolean) => {
    const qs = is_read !== undefined ? `?is_read=${is_read}` : "";
    return request<any[]>(`/contact${qs}`);
  },
  markRead: (id: number) =>
    request<any>(`/contact/${id}/read`, { method: "PATCH" }),
  delete: (id: number) => request<any>(`/contact/${id}`, { method: "DELETE" }),
};
