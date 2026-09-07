"use client";

import * as React from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const FIELD =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[0.95rem] text-[var(--paper)] placeholder:text-[var(--paper)]/35 transition-colors focus:border-[var(--cyan)] focus:bg-white/[0.07] focus:outline-none";

const LABEL =
  "block ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--paper)]/55";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorKey, setErrorKey] = React.useState<string>("errorGeneric");
  const formRef = React.useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          company: data.get("company"),
          country: data.get("country"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          website: data.get("website"), // ловушка для ботов
          locale,
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (res.ok) {
        formRef.current?.reset();
        setStatus("success");
        return;
      }

      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      const map: Record<string, string> = {
        validation: "errorValidation",
        rate_limited: "errorRate",
        not_configured: "errorNotConfigured",
      };
      setErrorKey(map[payload.error ?? ""] ?? "errorGeneric");
      setStatus("error");
    } catch {
      setErrorKey("errorGeneric");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[var(--cyan)]/40 bg-[color-mix(in_srgb,var(--cyan)_10%,transparent)] p-8 sm:p-10"
      >
        <CheckCircle2 className="size-8 text-[var(--cyan)]" aria-hidden="true" />
        <h3 className="mt-5 ff-head text-2xl font-bold text-[var(--paper)]">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-md text-[var(--paper)]/70">{t("successText")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 ff-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--cyan)] transition-colors hover:text-[var(--paper)]"
        >
          {t("sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <h3 className="ff-head text-2xl font-bold text-[var(--paper)]">{t("title")}</h3>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--paper)]/60">
        {t("desc")}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="cf-name">
            {t("name")} *
          </label>
          <input
            id="cf-name"
            name="name"
            required
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-company">
            {t("company")} <span className="normal-case tracking-normal">({t("optional")})</span>
          </label>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            placeholder={t("companyPlaceholder")}
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-email">
            {t("email")} *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="cf-phone">
            {t("phone")} <span className="normal-case tracking-normal">({t("optional")})</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="cf-country">
            {t("country")} <span className="normal-case tracking-normal">({t("optional")})</span>
          </label>
          <input
            id="cf-country"
            name="country"
            autoComplete="country-name"
            placeholder={t("countryPlaceholder")}
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="cf-message">
            {t("message")} *
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            placeholder={t("messagePlaceholder")}
            className={`mt-2 resize-y ${FIELD}`}
          />
        </div>
      </div>

      {/* Ловушка для ботов: человек её не видит и не заполняет */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {t(errorKey)}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--cyan)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper)] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {t("sending")}
            </>
          ) : (
            <>
              {t("submit")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>

        <p className="max-w-sm text-[0.72rem] leading-relaxed text-[var(--paper)]/45">
          {t("privacyNote")}
        </p>
      </div>
    </form>
  );
}
