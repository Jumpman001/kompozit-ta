"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const KEY = "kta-cookie-consent";
const EVENT = "kta-consent-change";
const OPEN_EVENT = "kta-consent-open";

export type Consent = "all" | "necessary";

/* Выбор посетителя живёт в localStorage — это внешнее для React хранилище,
   поэтому читаем его через useSyncExternalStore, а не через эффект.
   Приватный режим и заблокированное хранилище не должны ронять страницу. */
function read(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// На сервере выбора нет — рисуем как «ещё не решил», баннер появится после гидратации.
const serverSnapshot = (): Consent | null => null;

export function useConsent(): Consent | null {
  return React.useSyncExternalStore(subscribe, read, serverSnapshot);
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* хранилище недоступно — выбор действует до перезагрузки */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function CookieConsent() {
  const t = useTranslations("Privacy");
  const reduce = useReducedMotion();
  const consent = useConsent();
  // Кнопка в подвале открывает баннер повторно, даже если выбор уже сделан.
  const [reopened, setReopened] = React.useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  React.useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const open = mounted && (consent === null || reopened);

  const choose = (v: Consent) => {
    setConsent(v);
    setReopened(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label={t("cookieTitle")}
          className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-6"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto flex max-w-[var(--container)] flex-col gap-5 rounded-2xl border border-[var(--line-2)] bg-[var(--paper)] p-6 shadow-[0_18px_50px_-20px_rgba(25,23,22,0.35)] sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div>
              <p className="ff-mono text-[0.66rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {t("cookieTitle")}
              </p>
              <p className="mt-2 max-w-2xl leading-relaxed text-[var(--ink-soft)]">
                {t("cookieBody")}{" "}
                <Link href="/privacy" className="link-underline text-[var(--cyan-ink)]">
                  {t("cookieMore")}
                </Link>
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <button
                type="button"
                onClick={() => choose("necessary")}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--line-2)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition-colors duration-300 hover:border-[var(--ink)]"
              >
                {t("cookieNecessary")}
              </button>
              <button
                type="button"
                onClick={() => choose("all")}
                className="inline-flex min-h-11 items-center rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
              >
                {t("cookieAcceptAll")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Кнопка в подвале — вернуть баннер и поменять решение. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("Privacy");
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {t("cookieSettings")}
    </button>
  );
}
