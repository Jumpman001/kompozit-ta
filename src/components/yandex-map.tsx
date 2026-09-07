"use client";

import { MapPin, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useConsent, setConsent } from "./cookie-consent";

const SRC =
  "https://yandex.ru/map-widget/v1/?um=constructor%3A8246d1ee1cd729a2b2a7db32b81e0515f747df1940f654103c530eed54f26c1a&source=constructor";
const MAP_LINK = "https://yandex.tj/maps/-/CTXYbQ5t";

/** Карта — внешний сервис со своими cookie. До согласия показываем заглушку,
 *  чтобы не грузить сторонний код без спроса. */
export function YandexMap() {
  const t = useTranslations("Privacy");
  const c = useTranslations("Contact");
  const consent = useConsent();

  if (consent === "all") {
    return (
      <iframe
        src={SRC}
        width="100%"
        height="416"
        frameBorder="0"
        loading="lazy"
        title={c("mapTitle")}
        className="block"
      />
    );
  }

  return (
    <div className="flex h-[416px] flex-col items-center justify-center gap-4 bg-[var(--paper-2)] px-6 text-center">
      <MapPin className="size-6 text-[var(--cyan-ink)]" aria-hidden="true" />
      <div>
        <p className="ff-head text-lg font-semibold text-[var(--ink)]">{t("mapBlockedTitle")}</p>
        <p className="mx-auto mt-2 max-w-md leading-relaxed text-[var(--muted)]">
          {t("mapBlockedBody")}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setConsent("all")}
          className="inline-flex min-h-11 items-center rounded-full bg-[var(--ink)] px-6 py-2.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
        >
          {t("mapBlockedShow")}
        </button>
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line-2)] px-6 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
        >
          {t("mapBlockedLink")}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
