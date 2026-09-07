"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const EASE = [0.16, 1, 0.3, 1] as const;

type Spec = [string, string];

/* Направления применения. Ключ = суффикс ключа перевода (areaWater и т.д.).
   Определены по назначению объекта: PN 1 — самотёчный коллектор, PN 16–25 —
   напорный водовод, PN 10 на сельхозучастке — орошение. */
const AREAS = ["water", "sewer", "irrigation", "road", "other"] as const;
type Area = (typeof AREAS)[number];

const PROJECT_AREAS: Area[] = [
  "water",      // 01 водовод Туткавул, DN 400 PN 25
  "water",      // 02 водовод Дехи Сабур, DN 400 PN 25
  "water",      // 03 насосная станция КАФ 1
  "water",      // 04 водоснабжение Кофарнихан, DN 400–700 PN 16
  "sewer",      // 05 канализация Каратегин и Зебунисо
  "irrigation", // 06 сети орошения А-1…А-4
  "road",       // 07 улица Каххоров — городские сети под дорогой
  "sewer",      // 08 коллектор Южной зоны, DN 1400 PN 1
  "road",       // 09 трасса «Рассвет-6»
  "road",       // 10 дорога Западные ворота — Чортут
  "irrigation", // 11 кооператив «Шахроми Худжанд»
  "irrigation", // 12 ирригация Кумсангирского района
  "other",      // 13 Центр развития ремёсел — сети объекта
  "sewer",      // 14 Южный коллектор CW-03, PN 1
  "other",      // 15 композитные решётки для парковок
  "irrigation", // 16 дюкер через Шурчасай, Яванский район
];

const areaKey = (a: Area) => `area${a[0].toUpperCase()}${a.slice(1)}` as const;

type Project = {
  n: string;
  title: string;
  done: boolean;
  area: Area;
  areaTitle: string;
  /** короткая подпись в списке: инвестор · продукция · объём */
  meta: string;
  spec: Spec[];
  imgs: string[];
};

type ProjectItem = {
  title: string;
  done: boolean;
  investor: string;
  /** У части объектов заказчик пока не подтверждён — строку тогда не рисуем. */
  customer?: string;
  product: string;
  pressure?: string;
  stiffness?: string;
  volume?: string;
  area?: string;
};

const imgs = (proj: number, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/p${String(proj).padStart(2, "0")}_${i + 1}.jpg`);

// Фото — одни и те же файлы для всех языков, поэтому держим их здесь,
// а не в JSON с переводами. Текст (items) приходит из messages/*.json.
const PROJECT_IMGS: string[][] = [
  imgs(1, 4),
  imgs(2, 4),
  imgs(3, 4),
  imgs(4, 4),
  imgs(5, 4),
  imgs(6, 4),
  imgs(7, 4),
  imgs(8, 4),
  imgs(9, 4),
  imgs(10, 4),
  ["/projects/p11_1.jpg", "/projects/p11_5.jpg", "/projects/p11_6.jpg", "/projects/p11_7.jpg"],
  imgs(12, 4),
  imgs(13, 4),
  imgs(14, 4),
  imgs(15, 4),
  [], // 16 — дюкер через Шурчасай, фотографий пока нет
];

function useProjects(): Project[] {
  const t = useTranslations("Projects");
  const items = t.raw("items") as ProjectItem[];

  return items.map((it, i) => {
    const area = PROJECT_AREAS[i] ?? "other";
    const spec: Spec[] = [
      [t("areaLabel"), t(areaKey(area))],
      [t("specInvestor"), it.investor],
    ];
    if (it.customer) spec.push([t("specCustomer"), it.customer]);
    spec.push([t("specProduct"), it.product]);
    if (it.pressure) spec.push([t("specPressure"), it.pressure]);
    if (it.stiffness) spec.push([t("specStiffness"), it.stiffness]);
    if (it.volume) spec.push([t("specVolume"), it.volume]);
    if (it.area) spec.push([t("specArea"), it.area]);

    return {
      n: String(i + 1).padStart(2, "0"),
      title: it.title,
      done: it.done,
      area,
      areaTitle: t(areaKey(area)),
      meta: [it.investor, it.product, it.volume ?? it.area].filter(Boolean).join(" · "),
      spec,
      imgs: PROJECT_IMGS[i] ?? [],
    };
  });
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const t = useTranslations("Projects");
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
        aria-label={project.title}
        className="relative z-10 max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-[var(--line-2)] bg-[var(--paper)] sm:rounded-2xl"
        initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/95 px-6 py-5 backdrop-blur sm:px-8">
          <div className="pr-2">
            <div className="flex items-center gap-3">
              <span className="ff-mono text-sm text-[var(--cyan-ink)]">{project.n}</span>
              <span
                className={`rounded-full border px-2.5 py-0.5 ff-mono text-[0.6rem] uppercase tracking-[0.1em] ${
                  project.done
                    ? "border-[var(--line-2)] text-[var(--muted)]"
                    : "border-[var(--cyan-ink)]/40 text-[var(--cyan-ink)]"
                }`}
              >
                {project.done ? t("statusDone") : t("statusInProgress")}
              </span>
            </div>
            <h3 className="mt-3 ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)] sm:text-2xl">
              {project.title}
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
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
            {project.spec.map(([k, v]) => (
              <div key={k} className="bg-[var(--paper)] px-4 py-3">
                <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                  {k}
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{v}</dd>
              </div>
            ))}
          </dl>

          {project.imgs.length > 0 && (
          <div className="mt-7">
            <div className="eyebrow mb-3">{t("photosLabel")}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {project.imgs.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-2)] bg-[var(--paper-2)]"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — ${t("photosLabel")} ${i + 1}`}
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

/** Читает ?area=... из адреса — чтобы со страницы продукции можно было
 *  привести сразу к отфильтрованному списку. */
function useInitialArea(): Area | "all" {
  const params = useSearchParams();
  const raw = params.get("area");
  return raw && (AREAS as readonly string[]).includes(raw) ? (raw as Area) : "all";
}

function ProjectsListInner() {
  const t = useTranslations("Projects");
  const projects = useProjects();
  const [active, setActive] = React.useState<Project | null>(null);
  const [area, setArea] = React.useState<Area | "all">(useInitialArea());

  // сколько объектов в каждом направлении — показываем прямо в кнопке
  const counts = React.useMemo(() => {
    const c = new Map<Area, number>();
    for (const p of projects) c.set(p.area, (c.get(p.area) ?? 0) + 1);
    return c;
  }, [projects]);

  const filters: { key: Area | "all"; label: string; count: number }[] = [
    { key: "all", label: t("areaAll"), count: projects.length },
    ...AREAS.filter((a) => counts.get(a)).map((a) => ({
      key: a as Area | "all",
      label: t(areaKey(a)),
      count: counts.get(a) ?? 0,
    })),
  ];

  const shown = area === "all" ? projects : projects.filter((p) => p.area === area);

  return (
    <>
      <div className="mt-16 flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
        <h2 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
          {t("objectsTitle")}
        </h2>
        <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          {t("projectsCount", { count: shown.length })}
        </span>
      </div>

      <div className="mb-8 mt-8 flex flex-wrap gap-2" role="group" aria-label={t("areaLabel")}>
        {filters.map((f) => {
          const on = f.key === area;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setArea(f.key)}
              aria-pressed={on}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 ff-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors duration-300 ${
                on
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-[var(--line-2)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
              }`}
            >
              {f.label}
              <span className={on ? "text-[var(--paper)]/60" : "text-[var(--muted)]/70"}>
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      <ul>
        {shown.map((p) => (
          <li key={p.n}>
            <button
              type="button"
              onClick={() => setActive(p)}
              aria-haspopup="dialog"
              className="group grid w-full gap-2 border-b border-[var(--line)] py-6 text-left transition-colors hover:bg-[var(--paper-2)] focus-visible:bg-[var(--paper-2)] sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="ff-mono text-sm text-[var(--cyan-ink)]">{p.n}</span>
              <div>
                <span className="ff-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
                  {p.areaTitle}
                </span>
                <h4 className="mt-1 ff-head text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--cyan-ink)]">
                  {p.title}
                </h4>
                <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {p.meta}
                </p>
              </div>
              <span className="flex items-center gap-2 justify-self-start sm:justify-self-end">
                <span
                  className={`rounded-full border px-3 py-1 ff-mono text-[0.62rem] uppercase tracking-[0.1em] ${
                    p.done
                      ? "border-[var(--line-2)] text-[var(--muted)]"
                      : "border-[var(--cyan-ink)]/40 text-[var(--cyan-ink)]"
                  }`}
                >
                  {p.done ? t("statusDone") : t("statusInProgress")}
                </span>
                <ArrowUpRight className="size-4 text-[var(--cyan-ink)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="py-10 text-[var(--muted)]">{t("areaEmpty")}</p>
      )}

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}

export function ProjectsList() {
  return (
    <React.Suspense fallback={null}>
      <ProjectsListInner />
    </React.Suspense>
  );
}
