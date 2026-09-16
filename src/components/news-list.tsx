"use client";

import * as React from "react";
import { Img } from "@/components/img";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ImageIcon, Play, X } from "lucide-react";
import { useTranslations } from "next-intl";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Видео можно прикрепить двумя способами:
 *   video: { type: "youtube", id: "XXXXXXXXXXX" }   — ID ролика из ссылки youtube
 *   video: { type: "file", src: "/news/clip.mp4" }   — файл, положенный в public/news
 */
type Video = { type: "youtube"; id: string } | { type: "file"; src: string };

type News = {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  cover?: string;
  body: string[];
  photos: string[];
  video?: Video;
};

/* Не переведено на JSON: cover/photos/video — одинаковые файлы для всех
   языков. Чтобы добавить новость, впишите новый ключ (n3Date, n3Title...)
   в messages/*.json и новую запись сюда. */
function useNews(): News[] {
  const t = useTranslations("News");
  return [
    {
      id: "open-2021",
      date: t("n1Date"),
      category: t("n1Category"),
      title: t("n1Title"),
      excerpt: t("n1Excerpt"),
      cover: "/factory-aerial.jpg",
      body: [t("n1Body1"), t("n1Body2")],
      photos: [],
      video: { type: "youtube", id: "9GrooVp7ATA" },
    },
    {
      id: "58km",
      date: t("n2Date"),
      category: t("n2Category"),
      title: t("n2Title"),
      excerpt: t("n2Excerpt"),
      cover: "/projects/p04_2.jpg",
      body: [t("n2Body1"), t("n2Body2")],
      photos: ["/projects/p04_1.jpg", "/projects/p04_2.jpg", "/projects/p06_1.jpg"],
    },
  ];
}

function VideoEmbed({ video }: { video: Video }) {
  const t = useTranslations("News");
  if (video.type === "youtube") {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl border border-[var(--line-2)] bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.id}`}
          title={t("videoLabel")}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <video
      controls
      preload="metadata"
      className="w-full rounded-xl border border-[var(--line-2)] bg-black"
      src={video.src}
    />
  );
}

function NewsModal({ item, onClose }: { item: News; onClose: () => void }) {
  const t = useTranslations("News");
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
        aria-label={item.title}
        className="relative z-10 max-h-[92svh] w-full max-w-2xl overflow-y-auto border border-[var(--line-2)] bg-[var(--paper)] sm:rounded-2xl"
        initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <div className="flex items-center gap-3 ff-mono text-xs uppercase tracking-[0.14em]">
              <span className="text-[var(--cyan-ink)]">{item.date}</span>
              <span className="text-[var(--muted)]">{item.category}</span>
            </div>
            <h3 className="mt-2 ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)] sm:text-2xl">
              {item.title}
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
          {item.cover && (
            <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-[var(--line-2)] bg-[var(--paper-2)]">
              <Img
                src={item.cover}
                alt={item.title}
                fill
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {item.body.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-[var(--ink-soft)]" : "leading-relaxed text-[var(--muted)]"}
              >
                {p}
              </p>
            ))}
          </div>

          {item.video && (
            <div className="mt-7">
              <div className="eyebrow mb-3">{t("videoLabel")}</div>
              <VideoEmbed video={item.video} />
            </div>
          )}

          {item.photos.length > 0 && (
            <div className="mt-7">
              <div className="eyebrow mb-3">{t("photosLabel")}</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {item.photos.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-2)] bg-[var(--paper-2)]"
                  >
                    <Img
                      src={src}
                      alt={`${item.title} — ${t("photosLabel")} ${i + 1}`}
                      fill
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NewsList() {
  const t = useTranslations("News");
  const news = useNews();
  const [active, setActive] = React.useState<News | null>(null);

  return (
    <>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActive(n)}
            aria-haspopup="dialog"
            className="group flex flex-col text-left"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-[var(--line-2)] bg-[var(--paper-2)]">
              {n.cover ? (
                <>
                  <Img
                    src={n.cover}
                    alt={n.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {n.video && (
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-[var(--ink)]/70 text-[var(--paper)] backdrop-blur">
                        <Play className="size-5 translate-x-0.5" />
                      </span>
                    </span>
                  )}
                </>
              ) : (
                <span className="grid h-full place-items-center text-[var(--muted)]">
                  <ImageIcon className="size-6" aria-hidden="true" />
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 ff-mono text-[0.7rem] uppercase tracking-[0.12em]">
              <span className="text-[var(--cyan-ink)]">{n.date}</span>
              <span className="text-[var(--muted)]">{n.category}</span>
            </div>
            <h3 className="mt-2 ff-head text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--cyan-ink)]">
              {n.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{n.excerpt}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
              {t("readMore")}
              <ArrowRight
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && <NewsModal item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
