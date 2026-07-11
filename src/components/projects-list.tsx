"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Spec = [string, string];

type Project = {
  n: string;
  title: string;
  done: boolean;
  spec: Spec[];
  imgs: string[];
};

const imgs = (proj: number, count: number) =>
  Array.from({ length: count }, (_, i) => `/projects/p${String(proj).padStart(2, "0")}_${i + 1}.jpg`);

const projects: Project[] = [
  {
    n: "01",
    title: "Водопровод от ГСС до водохранилища Туткавул, г. Нурек",
    done: true,
    spec: [
      ["Инвестор", "Европейский банк реконструкции и развития"],
      ["Заказчик", "ОАО «Точик СГЭМ»"],
      ["Продукция", "Стеклопластиковая труба DN 400"],
      ["Давление", "PN 25"],
      ["Жёсткость", "SN 7000 Н/м²"],
      ["Объём", "7 551 м"],
    ],
    imgs: imgs(1, 4),
  },
  {
    n: "02",
    title: "Водопровод от ГСС до водохранилища Дехи Сабур, г. Нурек",
    done: true,
    spec: [
      ["Инвестор", "Европейский банк реконструкции и развития"],
      ["Заказчик", "ОАО «Точик СГЭМ»"],
      ["Продукция", "Стеклопластиковая труба DN 400"],
      ["Давление", "PN 25"],
      ["Жёсткость", "SN 7000 Н/м²"],
      ["Объём", "3 904 м"],
    ],
    imgs: imgs(2, 4),
  },
  {
    n: "03",
    title: "Восстановление насосной станции КАФ 1, г. Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Композитные трубы DN 400–700"],
      ["Давление", "PN 6–16"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "2 411 м"],
    ],
    imgs: imgs(3, 4),
  },
  {
    n: "04",
    title: "Реконструкция водоснабжения станции Кофарнихан (КАФ 1), г. Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Композитные трубы DN 400–700"],
      ["Давление", "PN 16"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "14 165 м"],
    ],
    imgs: imgs(4, 4),
  },
  {
    n: "05",
    title: "Восстановление канализации посёлков «Каратегин» и «Зебунисо», Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Стеклопластиковые трубы DN 400–600"],
      ["Давление", "PN 6"],
      ["Жёсткость", "SN 5000–10000 Н/м²"],
      ["Объём", "1 536 м"],
    ],
    imgs: imgs(5, 4),
  },
  {
    n: "06",
    title: "Замена сетей орошения районов А-1…А-4, Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ООО «Строй-Центр»"],
      ["Продукция", "Композитные трубы DN 400–600"],
      ["Давление", "PN 10"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "3 049 м"],
    ],
    imgs: imgs(6, 4),
  },
  {
    n: "07",
    title: "Реконструкция улицы «Каххоров», г. Душанбе",
    done: false,
    spec: [
      ["Инвестор", "Исполнительный орган гос. власти г. Душанбе"],
      ["Заказчик", "ООО «Авесто Групп»"],
      ["Продукция", "Композитные трубы DN 400–1200"],
      ["Давление", "PN 6–16"],
      ["Жёсткость", "SN 5000–10000 Н/м²"],
      ["Объём", "8 629 м"],
    ],
    imgs: imgs(7, 4),
  },
  {
    n: "08",
    title: "Восстановление канализационного коллектора Южной зоны, Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Композитные трубы DN 1400"],
      ["Давление", "PN 1"],
      ["Жёсткость", "SN 5000–10000 Н/м²"],
      ["Объём", "2 991 м"],
    ],
    imgs: imgs(8, 4),
  },
  {
    n: "09",
    title: "Реконструкция трассы «Рассвет-6», Хуросонский район",
    done: false,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ООО «Кудрат-2010»"],
      ["Продукция", "Стеклопластиковые трубы DN 1000–1800"],
      ["Давление", "PN 10–16"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "2 854 м"],
    ],
    imgs: imgs(9, 4),
  },
  {
    n: "10",
    title: "Новая дорога от Западных ворот до Чортут, Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Исполнительный орган гос. власти г. Душанбе"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Композитная труба DN 600"],
      ["Давление", "PN 16"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "3 280 м"],
    ],
    imgs: imgs(10, 4),
  },
  {
    n: "11",
    title: "Кооператив «Шахроми Худжанд», Зафарабадский район",
    done: true,
    spec: [
      ["Инвестор", "Кооператив «Шахроми Худжанд»"],
      ["Заказчик", "Кооператив «Шахроми Худжанд»"],
      ["Продукция", "Композитные трубы DN 500"],
      ["Давление", "PN 6–10"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "1 398 м"],
    ],
    imgs: [
      "/projects/p11_1.jpg",
      "/projects/p11_5.jpg",
      "/projects/p11_6.jpg",
      "/projects/p11_7.jpg",
    ],
  },
  {
    n: "12",
    title: "Обновление ирригационных систем Кумсангирского района",
    done: true,
    spec: [
      ["Инвестор", "Международная ассоциация развития · грантовый фонд ЕС"],
      ["Заказчик", "ОАО «Таджикгидроэлектромонтаж»"],
      ["Продукция", "Композитные трубы DN 600–1400"],
      ["Давление", "PN 10"],
      ["Жёсткость", "SN 5000 Н/м²"],
      ["Объём", "1 375 м"],
    ],
    imgs: imgs(12, 4),
  },
  {
    n: "13",
    title: "Центр развития ремёсел, Дангаринский район",
    done: true,
    spec: [
      ["Инвестор", "Исполнительный орган гос. власти г. Дангара"],
      ["Заказчик", "ООО «Строй-Центр»"],
      ["Продукция", "Композитная труба DN 400–1000"],
      ["Давление", "PN 1–6"],
      ["Жёсткость", "SN 5000–10000 Н/м²"],
      ["Объём", "1 498 м"],
    ],
    imgs: imgs(13, 4),
  },
  {
    n: "14",
    title: "Восстановление Южного коллектора (CW-03), Душанбе",
    done: true,
    spec: [
      ["Инвестор", "Азиатский банк развития"],
      ["Заказчик", "ОАО «Таджик СГЭМ»"],
      ["Продукция", "Композитные трубы DN 1000–1200"],
      ["Давление", "PN 1"],
      ["Жёсткость", "SN 5000–10000 Н/м²"],
      ["Объём", "2 865 м"],
    ],
    imgs: imgs(14, 4),
  },
  {
    n: "15",
    title: "Композитные решётки для парковок, г. Душанбе",
    done: false,
    spec: [
      ["Инвестор", "ООО «Нет Солюшенс»"],
      ["Заказчик", "ООО «Нет Солюшенс»"],
      ["Продукция", "Композитные решётки"],
      ["Площадь", "3 514 м²"],
    ],
    imgs: imgs(15, 4),
  },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
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
                {project.done ? "Завершён" : "В работе"}
              </span>
            </div>
            <h3 className="mt-3 ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)] sm:text-2xl">
              {project.title}
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

          <div className="mt-7">
            <div className="eyebrow mb-3">Фотографии с объекта</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {project.imgs.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--line-2)] bg-[var(--paper-2)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} — фото ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsList() {
  const [active, setActive] = React.useState<Project | null>(null);

  return (
    <>
      <ul>
        {projects.map((p) => (
          <li key={p.n}>
            <button
              type="button"
              onClick={() => setActive(p)}
              aria-haspopup="dialog"
              className="group grid w-full gap-2 border-b border-[var(--line)] py-6 text-left transition-colors hover:bg-[var(--paper-2)] focus-visible:bg-[var(--paper-2)] sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="ff-mono text-sm text-[var(--cyan-ink)]">{p.n}</span>
              <div>
                <h4 className="ff-head text-lg font-semibold leading-snug text-[var(--ink)] group-hover:text-[var(--cyan-ink)]">
                  {p.title}
                </h4>
                <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--muted)]">
                  {p.spec[0][1]} · {p.spec[2]?.[1] ?? ""} · {p.spec[p.spec.length - 1][1]}
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
                  {p.done ? "Завершён" : "В работе"}
                </span>
                <ArrowUpRight className="size-4 text-[var(--cyan-ink)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
