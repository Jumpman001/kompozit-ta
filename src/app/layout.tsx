import type { Metadata } from "next";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kompozit-ta.tj"),
  title: {
    default: "КОМПОЗИТ Т.А. — стеклопластиковые трубы | Душанбе",
    template: "%s · КОМПОЗИТ Т.А.",
  },
  description:
    "Завод стеклопластиковых (ГРП) труб полного цикла в Душанбе, Таджикистан. Напорные и безнапорные трубопроводы для водоснабжения, гидроэнергетики и нефтегаза. Срок службы 50+ лет.",
  keywords: [
    "стеклопластиковые трубы",
    "ГРП трубы",
    "Душанбе",
    "Таджикистан",
    "КОМПОЗИТ Т.А.",
    "напорные трубы",
    "водовод",
  ],
  openGraph: {
    title: "КОМПОЗИТ Т.А. — стеклопластиковые трубы нового поколения",
    description:
      "Завод ГРП-труб полного цикла в Душанбе. Коррозионная стойкость, малый вес, срок службы 50+ лет.",
    type: "website",
    locale: "ru_RU",
    siteName: "КОМПОЗИТ Т.А.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${unbounded.variable} ${manrope.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-svh overflow-x-clip bg-[var(--paper)] text-[var(--ink)] font-[family-name:var(--font-body)] selection:bg-[var(--cyan)]/20">
        {children}
      </body>
    </html>
  );
}
