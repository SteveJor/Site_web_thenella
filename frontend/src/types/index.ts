// ─── Auth ──────────────────────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  token_type: string;
  username: string;
}

// ─── Biography ────────────────────────────────────────────────────────────

export interface Biography {
  id: number;
  name: string;
  subtitle_en: string;
  subtitle_fr: string;
  bio_text1_en: string;
  bio_text1_fr: string;
  bio_text2_en: string;
  bio_text2_fr: string;
  bio_text3_en: string;
  bio_text3_fr: string;
  image_url: string;
  updated_at: string;
}

// ─── Achievement ──────────────────────────────────────────────────────────

export interface Achievement {
  id: number;
  icon: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  order: number;
  created_at: string;
}

// ─── Music ────────────────────────────────────────────────────────────────

export interface Music {
  id: number;
  title: string;
  year: number | null;
  description_en: string;
  description_fr: string;
  cover_url: string;
  listen_url: string;
  order: number;
  created_at: string;
}

// ─── Gallery ──────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: number;
  image_url: string;
  caption_en: string;
  caption_fr: string;
  order: number;
  created_at: string;
}

// ─── YouTube ──────────────────────────────────────────────────────────────

export interface YoutubeVideo {
  id: number;
  video_id: string;
  title: string;
  description: string;
  is_featured: boolean;
  order: number;
  created_at: string;
}

export interface YoutubeChannel {
  id: number;
  channel_url: string;
  channel_name: string;
  channel_description_en: string;
  channel_description_fr: string;
}

// ─── Social Media ─────────────────────────────────────────────────────────

export interface SocialMediaLink {
  id: number;
  label_en: string;
  label_fr: string;
  url: string;
  icon: string;
}

export interface SocialMedia {
  id: number;
  platform: string;
  description_en: string;
  description_fr: string;
  links: SocialMediaLink[];
}

// ─── Contact ──────────────────────────────────────────────────────────────

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

// ─── Language ─────────────────────────────────────────────────────────────

export type Lang = "en" | "fr";
