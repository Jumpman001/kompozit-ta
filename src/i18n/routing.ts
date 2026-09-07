import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // ru — основной язык сайта, без префикса в адресе (/about).
  // tj — таджикский, en — английский, оба с префиксом (/tj/about, /en/about).
  locales: ["ru", "tj", "en"],
  defaultLocale: "ru",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
