import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

// "cyrillic" не включает таджикские буквы ғ, қ, ӯ, ҳ, ҷ — браузер брал их
// из системного шрифта, отсюда разнобой начертания. Нужен "cyrillic-ext".
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  // 800 добавлен: на таджикской версии Manrope подменяет собой жирные
  // заголовки (см. globals.css), а без веса 800 браузер брал вместо
  // него случайный системный шрифт — тот самый "не жирный" на скрине.
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// У OpenGraph свой формат локали (xx_XX) — сопоставляем вручную.
const OG_LOCALE: Record<Locale, string> = {
  ru: "ru_RU",
  tj: "tg_TJ",
  en: "en_US",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://kompozit-ta.tj"),
    title: {
      default: t("title"),
      template: `%s · ${t("siteName")}`,
    },
    description: t("description"),
    keywords: t("keywords")
      .split(",")
      .map((k) => k.trim()),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: OG_LOCALE[locale as Locale] ?? "ru_RU",
      siteName: t("siteName"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Разрешает статический рендер (SSG) страниц под этот язык.
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      data-locale={locale}
      className={`${unbounded.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-svh overflow-x-clip bg-[var(--paper)] text-[var(--ink)] font-[family-name:var(--font-body)] selection:bg-[var(--cyan)]/20">
        <NextIntlClientProvider>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
