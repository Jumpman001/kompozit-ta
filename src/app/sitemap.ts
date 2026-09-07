import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const routes = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/products", priority: 0.8 },
  { path: "/production", priority: 0.8 },
  { path: "/projects", priority: 0.7 },
  { path: "/services", priority: 0.7 },
  { path: "/news", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/certificates", priority: 0.6 },
  { path: "/documents", priority: 0.6 },
  { path: "/sustainability", priority: 0.7 },
  { path: "/privacy", priority: 0.3 },
];

const BASE = "https://kompozit-ta.tj";

// ru — язык по умолчанию, без префикса в адресе; tj/en — с префиксом.
const prefix = (locale: string) => (locale === routing.defaultLocale ? "" : `/${locale}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE}${prefix(l)}${r.path}`])
      ),
    },
  }));
}
