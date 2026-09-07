import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { CookieSettingsButton } from "./cookie-consent";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const linkClass =
    "link-underline inline-flex min-h-11 items-center whitespace-nowrap transition-colors hover:text-[var(--ink)]";

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-[var(--container)] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Logo className="h-[81px] w-auto" />

        <div className="flex flex-col gap-2 ff-mono text-xs text-[var(--muted)] sm:items-end">
          <span>© {new Date().getFullYear()} КОМПОЗИТ Т.А. · {t("location")}</span>

          <nav className="flex flex-wrap items-center gap-x-5 sm:justify-end">
            <Link href="/sustainability" className={linkClass}>
              {t("sustainability")}
            </Link>
            <Link href="/documents" className={linkClass}>
              {t("documents")}
            </Link>
            <Link href="/certificates" className={linkClass}>
              {t("certs")}
            </Link>
            <Link href="/privacy" className={linkClass}>
              {t("privacy")}
            </Link>
            <CookieSettingsButton className={linkClass} />
          </nav>
        </div>
      </div>
    </footer>
  );
}
