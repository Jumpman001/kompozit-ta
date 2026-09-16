"use client";

import * as React from "react";
import { Img } from "@/components/img";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ImageIcon, Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

type Stage = { n: string; title: string; text: string };

type Tech = {
  n: string;
  title: string;
  short: string;
  body: string[];
  stages?: Stage[];
  photos: string[];
  photoSlots: number;
};

function useTechs(): Tech[] {
  const t = useTranslations("Production");
  return [
    {
      n: "01",
      title: t("t1Title"),
      short: t("t1Short"),
      body: [t("t1Body1"), t("t1Body2")],
      stages: [
        { n: "01", title: t("t1Stage1Title"), text: t("t1Stage1Text") },
        { n: "02", title: t("t1Stage2Title"), text: t("t1Stage2Text") },
        { n: "03", title: t("t1Stage3Title"), text: t("t1Stage3Text") },
        { n: "04", title: t("t1Stage4Title"), text: t("t1Stage4Text") },
        { n: "05", title: t("t1Stage5Title"), text: t("t1Stage5Text") },
        { n: "06", title: t("t1Stage6Title"), text: t("t1Stage6Text") },
      ],
      photos: [
        "/production/stage-liner.jpg",
        "/production/stage-drying.jpg",
        "/production/stage-winder.jpg",
        "/production/stage-qc.jpg",
        "/production/stage-hydrotest.jpg",
        "/production/stage-mechtest.jpg",
      ],
      photoSlots: 3,
    },
    {
      n: "02",
      title: t("t2Title"),
      short: t("t2Short"),
      body: [t("t2Body1")],
      photos: [],
      photoSlots: 3,
    },
    {
      n: "03",
      title: t("t3Title"),
      short: t("t3Short"),
      body: [t("t3Body1")],
      photos: [],
      photoSlots: 3,
    },
    {
      n: "04",
      title: t("t4Title"),
      short: t("t4Short"),
      body: [t("t4Body1")],
      photos: [],
      photoSlots: 3,
    },
    {
      n: "05",
      title: t("t5Title"),
      short: t("t5Short"),
      body: [t("t5Body1")],
      photos: [],
      photoSlots: 3,
    },
    {
      n: "06",
      title: t("t6Title"),
      short: t("t6Short"),
      body: [t("t6Body1")],
      photos: [],
      photoSlots: 3,
    },
  ];
}

function PhotoArea({ tech }: { tech: Tech }) {
  const t = useTranslations("Production");
  return (
    <div className="mt-7">
      <div className="eyebrow mb-3">{t("photosLabel")}</div>
      {tech.photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tech.photos.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-2)] bg-[var(--paper-2)]"
            >
              <Img
                src={src}
                alt={`${tech.title} — ${t("photoPlaceholder")} ${i + 1}`}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Array.from({ length: tech.photoSlots }).map((_, i) => (
            <div
              key={i}
              className="grid aspect-[16/10] place-items-center rounded-lg border border-dashed border-[var(--line-2)] bg-[var(--paper-2)] text-[var(--muted)]"
            >
              <div className="flex flex-col items-center gap-1.5">
                <ImageIcon className="size-5" aria-hidden="true" />
                <span className="ff-mono text-[0.6rem] uppercase tracking-[0.12em]">
                  {t("photoPlaceholder")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TechModal({ tech, onClose }: { tech: Tech; onClose: () => void }) {
  const t = useTranslations("Production");
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={onClose}
        className="absolute inset-0 bg-[var(--ink)]/55 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={tech.title}
        className="relative z-10 max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-[var(--line-2)] bg-[var(--paper)] sm:rounded-2xl"
        initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="ff-mono text-sm text-[var(--cyan-ink)]">{tech.n}</span>
              <span className="ff-mono text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
                {t("techLabel")}
              </span>
            </div>
            <h3 className="mt-2 ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
              {tech.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[var(--line-2)] text-[var(--ink)] transition-colors hover:bg-[var(--paper-2)]"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <div className="space-y-4">
            {tech.body.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-[var(--ink-soft)]" : "leading-relaxed text-[var(--muted)]"}
              >
                {p}
              </p>
            ))}
          </div>

          {tech.stages && (
            <div className="mt-8">
              <div className="eyebrow mb-4">{t("stagesLabel")}</div>
              <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                {tech.stages.map((s) => (
                  <div key={s.n} className="border-t border-[var(--line-2)] pt-4">
                    <div className="flex items-baseline gap-3">
                      <span className="ff-mono text-sm text-[var(--cyan-ink)]">{s.n}</span>
                      <h4 className="ff-head text-base font-semibold text-[var(--ink)]">
                        {s.title}
                      </h4>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <PhotoArea tech={tech} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProductionTech() {
  const t = useTranslations("Production");
  const techs = useTechs();
  const [active, setActive] = React.useState<Tech | null>(null);

  return (
    <div className="mt-24">
      <div className="flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
        <h3 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
          {t("techListTitle")}
        </h3>
        <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          {t("techListCount")}
        </span>
      </div>

      <div className="mt-px grid gap-px overflow-hidden border-x border-b border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {techs.map((tech) => (
          <button
            key={tech.n}
            type="button"
            onClick={() => setActive(tech)}
            aria-haspopup="dialog"
            className="group flex h-full w-full flex-col items-start bg-[var(--paper-2)] p-7 text-left transition-colors hover:bg-[var(--paper)] focus-visible:bg-[var(--paper)]"
          >
            <div className="flex w-full items-center justify-between">
              <span className="ff-mono text-xs text-[var(--cyan-ink)]">{tech.n}</span>
              <span className="grid size-7 place-items-center rounded-full border border-[var(--line-2)] text-[var(--cyan-ink)] transition-colors group-hover:border-[var(--cyan-ink)] group-hover:bg-[var(--cyan-ink)] group-hover:text-[var(--paper)]">
                <Plus className="size-4" />
              </span>
            </div>
            <h4 className="mt-5 ff-head text-lg font-semibold text-[var(--ink)]">{tech.title}</h4>
            <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
              {tech.short}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
              {t("moreLabel")}
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && <TechModal tech={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
