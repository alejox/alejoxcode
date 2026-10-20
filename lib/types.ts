export type Platform = "windows" | "macos" | "linux" | "any";
export type Category = "plugin" | "script" | "overlay" | "theme" | "tool";

export interface Release {
  id: string;
  plugin_id: string;
  version: string;
  platform: Platform;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  obs_min_version: string | null;
  changelog: string | null;
  downloads: number;
  created_at: string;
}

export interface Plugin {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  category: Category;
  tags: string[];
  cover_url: string | null;
  repo_url: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  releases: Release[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  plugin: "Plugin",
  script: "Script",
  overlay: "Overlay",
  theme: "Tema",
  tool: "Herramienta",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
  any: "Multiplataforma",
};
