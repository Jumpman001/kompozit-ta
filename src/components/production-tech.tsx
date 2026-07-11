"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ImageIcon, Plus, X } from "lucide-react";

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

const techs: Tech[] = [
  {
    n: "01",
    title: "Непрерывная намотка",
    short: "Трубы DN 400–3000",
    body: [
      "Метод непрерывной намотки — послойное нанесение стекловолокна, пропитанного полиэфирной смолой, на вращающуюся форму (оправку). Так производятся трубы диаметром от 400 до 3000 мм.",
      "Процесс начинается в аппарате Liner: формируется внутренний барьерный слой из смолы и стекловолокна, затем труба проходит сушку у печи. На этапе армирования в аппарате Winder выполняется непрерывная намотка стеклоровинга, предварительно смоченного в смоле. Для повышения кольцевой жёсткости в стенку может добавляться кварцевый песок.",
    ],
    stages: [
      { n: "01", title: "Лайнер", text: "Формирование внутреннего барьерного слоя на полиэфирной смоле в аппарате Liner." },
      { n: "02", title: "Полимеризация", text: "Сушка и отверждение первого слоя у печи." },
      { n: "03", title: "Армирование", text: "Непрерывная намотка несущего слоя стеклоровинга в аппарате Winder." },
      { n: "04", title: "Жёсткость", text: "Нанесение кварцевого песка для повышения кольцевой жёсткости." },
      { n: "05", title: "Контроль ОТК", text: "Обработка концов на токарном станке и проверка каждой партии." },
      { n: "06", title: "Финиш", text: "Визуальный осмотр и финишная обработка перед отгрузкой." },
    ],
    photos: [],
    photoSlots: 3,
  },
  {
    n: "02",
    title: "Пултрузия",
    short: "Профили Ø 50–300 мм",
    body: [
      "Производство высокопрочных стеклопластиковых профилей, уголков и труб диаметром от 50 до 300 мм методом протяжки. Применяются в антикоррозийных конструкциях с постоянными по длине характеристиками.",
    ],
    photos: [],
    photoSlots: 3,
  },
  {
    n: "03",
    title: "Формованные решётки",
    short: "Настилы для агрессивных сред",
    body: [
      "Изготовление стеклопластиковых решётчатых настилов высокой прочности, стойких к агрессивным средам. Производственный цикл включает намотку, пропитку смолой, прессование и нагрев.",
    ],
    photos: [],
    photoSlots: 3,
  },
  {
    n: "04",
    title: "Листовая ламинация",
    short: "Кровля и фасады",
    body: [
      "Производство стеклопластиковых кровельных листов и фасадных панелей — для эстетичных и долговечных решений в строительстве.",
    ],
    photos: [],
    photoSlots: 3,
  },
  {
    n: "05",
    title: "SMC-прессование",
    short: "Под давлением 800 т",
    body: [
      "Создание прочных изделий — крышек люков и других компонентов из стеклопластика — методом горячего прессования под давлением до 800 тонн.",
    ],
    photos: [],
    photoSlots: 3,
  },
  {
    n: "06",
    title: "Ручная ламинация",
    short: "Фитинги под заказ",
    body: [
      "Изготовление сложных композитных изделий и трубопроводных фитингов по индивидуальным техническим заданиям. Производство полностью ручное, с применением полиэфирной смолы и стекловолокна для точного соответствия требованиям.",
    ],
    photos: [],
    photoSlots: 3,
  },
];

function PhotoArea({ tech }: { tech: Tech }) {
  return (
    <div className="mt-7">
      <div className="eyebrow mb-3">Фотографии с производства</div>
      {tech.photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tech.photos.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-2)] bg-[var(--paper-2)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${tech.title} — фото ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
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
                  Фото
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
        aria-label="Закрыть"
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
                Технология
              </span>
            </div>
            <h3 className="mt-2 ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
              {tech.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
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
              <div className="eyebrow mb-4">Этапы изготовления трубы</div>
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
  const [active, setActive] = React.useState<Tech | null>(null);

  return (
    <div className="mt-24">
      <div className="flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
        <h3 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
          Технологии производства
        </h3>
        <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
          6 направлений
        </span>
      </div>

      <div className="mt-px grid gap-px overflow-hidden border-x border-b border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {techs.map((t) => (
          <button
            key={t.n}
            type="button"
            onClick={() => setActive(t)}
            aria-haspopup="dialog"
            className="group flex h-full w-full flex-col items-start bg-[var(--paper-2)] p-7 text-left transition-colors hover:bg-[var(--paper)] focus-visible:bg-[var(--paper)]"
          >
            <div className="flex w-full items-center justify-between">
              <span className="ff-mono text-xs text-[var(--cyan-ink)]">{t.n}</span>
              <span className="grid size-7 place-items-center rounded-full border border-[var(--line-2)] text-[var(--cyan-ink)] transition-colors group-hover:border-[var(--cyan-ink)] group-hover:bg-[var(--cyan-ink)] group-hover:text-[var(--paper)]">
                <Plus className="size-4" />
              </span>
            </div>
            <h4 className="mt-5 ff-head text-lg font-semibold text-[var(--ink)]">{t.title}</h4>
            <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
              {t.short}
            </p>
            <span className="mt-4 ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
              Подробнее →
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
