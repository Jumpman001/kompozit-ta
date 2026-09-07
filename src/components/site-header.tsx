"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "./logo";
import { routing } from "@/i18n/routing";

const NAV_KEYS = [
  { href: "/about", key: "about" as const, index: "01" },
  { href: "/products", key: "products" as const, index: "02" },
  { href: "/production", key: "production" as const, index: "03" },
  { href: "/projects", key: "projects" as const, index: "04" },
  { href: "/services", key: "services" as const, index: "05" },
  { href: "/news", key: "news" as const, index: "06" },
  { href: "/contact", key: "contact" as const, index: "07" },
];

const LANGUAGE_LABEL: Record<string, string> = {
  ru: "RU",
  tj: "TJ",
  en: "EN",
};

function LanguageSwitcher({
  className,
  textColor,
  linkClassName = "",
  onNavigate,
}: {
  className?: string;
  textColor?: string;
  /** Доп. классы для самих ссылок — на телефоне нужны крупнее, чтобы попасть пальцем */
  linkClassName?: string;
  onNavigate?: () => void;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={className}>
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          onClick={onNavigate}
          aria-current={l === locale ? "true" : undefined}
          className={`ff-mono text-xs uppercase tracking-[0.08em] transition-colors ${linkClassName} ${textColor ?? ""} ${
            l === locale ? "font-semibold opacity-100" : "opacity-55 hover:opacity-100"
          }`}
        >
          {LANGUAGE_LABEL[l] ?? l}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("Nav");
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Once scrolled, the header wears its own light "liquid glass" tint —
  // text is always dark ink against it, no matter what's behind. Before
  // that, the header is fully transparent, so text must match whatever
  // that page's top section actually is (light paper vs. dark ink).
  const inkText = scrolled || !dark;
  const textColor = inkText ? "text-[var(--ink-soft)]" : "text-[var(--paper)]";
  const textColorHover = inkText ? "hover:text-[var(--ink)]" : "hover:text-[var(--paper)]/70";
  const iconColor = inkText ? "text-[var(--ink)]" : "text-[var(--paper)]";
  const iconBorder = inkText ? "border-[var(--line-2)]" : "border-[var(--paper)]/40";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "liquid-glass backdrop-blur-xl backdrop-saturate-150 border-b border-transparent"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[var(--container)] items-center justify-between px-5 py-3 sm:px-8 xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-x-6">
          <Link
            href="/"
            aria-label={t("logoAlt")}
            className="-my-1 shrink-0 justify-self-start py-1"
          >
            {/* Два слоя: тёмный текст для светлого фона, белый — для тёмного.
                Плавно подменяются вместе с остальными цветами шапки. */}
            <span className="relative block shrink-0">
              <Logo
                className={`h-9 w-auto transition-opacity duration-300 sm:h-10 ${
                  inkText ? "opacity-100" : "opacity-0"
                }`}
              />
              <Logo
                light
                hidden
                className={`absolute inset-0 h-9 w-auto transition-opacity duration-300 sm:h-10 ${
                  inkText ? "opacity-0" : "opacity-100"
                }`}
              />
            </span>
          </Link>

          <nav className="hidden items-center justify-center gap-3.5 xl:flex">
            {NAV_KEYS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`link-underline whitespace-nowrap text-[0.85rem] font-medium tracking-tight transition-colors duration-300 ${textColor} ${textColorHover}`}
              >
                {t(n.key)}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-4">
            <LanguageSwitcher
              className="hidden items-center gap-2.5 xl:flex"
              textColor={textColor}
            />
            <Link
              href="/contact"
              className="hidden whitespace-nowrap rounded-full bg-[var(--ink)] px-5 py-2.5 text-[0.9rem] font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)] sm:inline-block"
            >
              {t("cta")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("openMenu")}
              className={`grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 xl:hidden ${iconBorder} ${iconColor}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile editorial overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-[var(--paper)] px-6 pb-10 pt-5 xl:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo className="h-[60px] w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeMenu")}
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] text-[var(--ink)]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {NAV_KEYS.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-[var(--line)] py-4"
                >
                  <span className="ff-head text-3xl font-bold tracking-tight text-[var(--ink)]">
                    {t(n.key)}
                  </span>
                  <span className="ff-mono text-xs text-[var(--muted)]">{n.index}</span>
                </Link>
              ))}
            </nav>

            <LanguageSwitcher
              className="mt-6 flex items-center gap-3"
              linkClassName="grid min-h-11 min-w-14 place-items-center rounded-full border border-[var(--line-2)] text-sm"
              onNavigate={() => setOpen(false)}
            />

            <div className="mt-auto pt-4 space-y-2 ff-mono text-sm text-[var(--muted)]">
              <a href="tel:+992900841177" className="block text-[var(--ink)]">
                {t("phone")}
              </a>
              <a href="mailto:info@composite.tj" className="block">
                {t("email")}
              </a>
              <p>{t("address")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
