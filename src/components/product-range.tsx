"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, ShieldCheck, X } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "./reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type Spec = [string, string];

type PoleDetails = {
  kind: "pole";
  intro: string;
  standard: string;
  specs: Spec[];
};

type PipeVariant = { title: string; tag: string; img: string; quick: string };

type PipeDetails = {
  kind: "pipe";
  intro: string;
  common: Spec[];
  variants: PipeVariant[];
  joint: { img: string; title: string; desc: string };
};

type FittingItem = { title: string; tag: string; img: string };

type FittingDetails = {
  kind: "fitting";
  intro: string;
  items: FittingItem[];
};

type GridDetails = {
  kind: "grid";
  intro: string;
  img: string;
  specs: Spec[];
  cert: { title: string; lines: string[] };
};

type TankDetails = {
  kind: "tank";
  intro: string;
  img: string;
  specs: Spec[];
};

type Details =
  | PoleDetails
  | PipeDetails
  | FittingDetails
  | GridDetails
  | TankDetails;

type Product = {
  n: string;
  title: string;
  spec: string;
  details?: Details;
};

const pipeDetails: PipeDetails = {
  kind: "pipe",
  intro:
    "Композитные трубы GRP диаметром DN 400–3000, изготовленные методом непрерывной намотки. Раструбное соединение с уплотнительными кольцами — монтаж без сварки. Секции длиной от 1,5 до 12 м.",
  common: [
    ["Материал", "GRP / стеклопластик"],
    ["Диаметр", "DN 400–3000"],
    ["Кольцевая жёсткость", "SN 2500 – 10 000 Н/м²"],
    ["Длина секции", "1,5 – 12 м"],
    ["Раструб", "350 мм"],
    ["Соединение", "раструбное, без сварки"],
  ],
  variants: [
    {
      title: "Водоснабжение",
      tag: "Напорная · PN 16",
      img: "/pipe-water.svg",
      quick: "PN 16 · 2 уплотнительных кольца",
    },
    {
      title: "Канализация",
      tag: "Безнапорная · PN 1",
      img: "/pipe-sewer.svg",
      quick: "PN 1 · 1 уплотнительное кольцо",
    },
  ],
  joint: {
    img: "/pipe-joint.svg",
    title: "Тип раструбного соединения",
    desc: "Соединение «раструб–ниппель»: гладкий конец одной трубы входит в раструб другой, герметичность обеспечивают резиновые уплотнительные кольца. Монтаж без сварки и фланцев, глубина захода стыка 235 мм. Соединение допускает осевые подвижки и компенсирует температурные деформации трубопровода.",
  },
};

const fittingDetails: FittingDetails = {
  kind: "fitting",
  intro:
    "Фасонные изделия GRP полностью ручного изготовления: крестовины, отводы, переходы, тройники. Раструбное и фланцевое соединение, диаметры DN 400–3000.",
  items: [
    {
      title: "Крестовина",
      tag: "DN 400 · PN 16",
      img: "/fitting-cross.svg",
    },
    {
      title: "Отвод 90°",
      tag: "DN 400 · PN 10",
      img: "/fitting-elbow90.svg",
    },
    {
      title: "Переход концентрический",
      tag: "Ø 800×600 · PN 6",
      img: "/fitting-reducer.svg",
    },
  ],
};

const tankDetails: TankDetails = {
  kind: "tank",
  intro:
    "Композитные ёмкости GRP для воды, стоков и технических жидкостей. Горизонтальное и вертикальное исполнение, люк и патрубки под проект. Объём от 100 до 37 000 л.",
  img: "/tank.svg",
  specs: [
    ["Материал", "GRP / стеклопластик"],
    ["Объём", "от 100 до 37 000 л"],
    ["Диаметр", "до Ø 2000 мм"],
    ["Длина", "до 12 000 мм"],
    ["Люк", "Ø 800 мм"],
    ["Патрубки", "вход/выход Ø100, обратка Ø50"],
  ],
};

const gridDetails: GridDetails = {
  kind: "grid",
  intro:
    "Композитный решётчатый настил GRP для площадок, мостков и настилов в агрессивных средах: коррозионная стойкость, малый вес и противоскользящая поверхность.",
  img: "/grid-deck.svg",
  specs: [
    ["Материал", "GRP / стеклопластик"],
    ["Размер ячейки", "50 × 50 мм"],
    ["Толщина", "7 мм"],
    ["Лист", "1220 × 3660 мм"],
  ],
  cert: {
    title: "Испытание на жёсткость в аккредитованной лаборатории",
    lines: [
      "Аккредитованная лаборатория ООО «Композит Т.А.» (аттестат №TJ 762.37100.02.037-2024).",
      "Методы: BS 4592-0, BS 4592-6, ГОСТ 33376-2015. Оборудование HGW-100.",
      "Образец 50×50×7 мм испытан на изгиб при линейной нагрузке на пролётах 400–1200 мм.",
      "Результат: фактические прогибы ниже нормативных; трещин, расслоений и разрушений не выявлено — соответствует техническим требованиям.",
    ],
  },
};

const poleDetails: PoleDetails = {
  kind: "pole",
  intro:
    "Опоры для линий электропередач 0,4 кВ с самонесущим изолированным проводом (СИП).",
  standard:
    "Производятся по требованиям Азербайджанской электросети (технология AZKOMPOZIT).",
  specs: [
    ["Общая длина", "7,8 м"],
    ["Глубина закапывания", "1,4 м"],
    ["Диаметр", "140 мм"],
    ["Толщина стенки", "4 мм"],
    ["Нагрузка на высоте 6,4 м", "60 кг"],
    ["Скорость ветра", "до 162 км/ч"],
    ["Натяжение на вершине", "1 kN"],
    ["Жёсткость", "≥ 15 000 N/m²"],
    ["Модуль Юнга", "18 GPa"],
    ["Огнестойкость", "V-0 (UL 94)"],
    ["УФ-защита", "Да"],
    ["Вес", "25 кг"],
  ],
};

const products: Product[] = [
  {
    n: "01",
    title: "Композитные трубы",
    spec: "DN 400–3000 · SN 5000 · 1,5–12 м",
    details: pipeDetails,
  },
  {
    n: "02",
    title: "Фитинги",
    spec: "DN 400–3000 · крестовины, отводы, переходы",
    details: fittingDetails,
  },
  {
    n: "03",
    title: "Решётки",
    spec: "Настил 50×50×7 · испытано на жёсткость",
    details: gridDetails,
  },
  { n: "04", title: "Канализационные люки", spec: "Стеклопластик" },
  {
    n: "05",
    title: "ЛЭП опоры 0,4 кВ",
    spec: "Длина 7,8 м · ⌀ 140 мм",
    details: poleDetails,
  },
  {
    n: "06",
    title: "Ёмкости",
    spec: "от 100 до 37 000 л · Ø до 2000 мм",
    details: tankDetails,
  },
];

/* Vertical GRP pole schematic — echoes the spec drawing. */
function PoleDiagram() {
  return (
    <svg viewBox="0 0 120 320" className="h-full w-auto" fill="none" aria-hidden="true">
      <line x1="6" y1="250" x2="114" y2="250" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="4 4" />
      <rect x="46" y="20" width="28" height="284" rx="3" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper)" />
      <ellipse cx="60" cy="20" rx="14" ry="4.5" stroke="var(--ink)" strokeWidth="1.5" fill="var(--paper-2)" />
      <circle cx="60" cy="44" r="1.6" fill="var(--ink)" />
      <rect x="47.2" y="250" width="25.6" height="53" fill="color-mix(in srgb, var(--cyan) 12%, transparent)" />
      <line x1="46" y1="9" x2="74" y2="9" stroke="var(--cyan-ink)" strokeWidth="1" />
      <text x="60" y="6" textAnchor="middle" className="ff-mono" fontSize="7" fill="var(--cyan-ink)">D 140</text>
      <line x1="92" y1="20" x2="92" y2="304" stroke="var(--cyan-ink)" strokeWidth="1" />
      <text x="100" y="165" textAnchor="middle" className="ff-mono" fontSize="7" fill="var(--cyan-ink)" transform="rotate(90 100 165)">7,8 м</text>
      <line x1="30" y1="250" x2="30" y2="304" stroke="var(--muted)" strokeWidth="1" />
      <text x="22" y="278" textAnchor="middle" className="ff-mono" fontSize="6.5" fill="var(--muted)" transform="rotate(-90 22 278)">1,4 м</text>
    </svg>
  );
}

function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
      {specs.map(([k, v]) => (
        <div
          key={k}
          className="flex items-baseline justify-between gap-3 bg-[var(--paper)] px-4 py-3"
        >
          <dt className="text-sm text-[var(--muted)]">{k}</dt>
          <dd className="ff-mono text-sm font-medium text-[var(--ink)]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function PoleBody({ d }: { d: PoleDetails }) {
  return (
    <div className="grid gap-8 px-6 py-7 sm:grid-cols-[1fr_auto] sm:px-8 sm:py-8">
      <div>
        <p className="text-[var(--ink-soft)]">{d.intro}</p>
        <p className="mt-2 text-sm text-[var(--muted)]">{d.standard}</p>
        <div className="mt-7">
          <SpecTable specs={d.specs} />
        </div>
      </div>
      <div className="hidden h-72 justify-center sm:flex">
        <PoleDiagram />
      </div>
    </div>
  );
}

function PipeBody({ d }: { d: PipeDetails }) {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8">
      <p className="max-w-2xl text-[var(--ink-soft)]">{d.intro}</p>

      {/* original factory drawings, one per execution */}
      <div className="mt-7 space-y-5">
        {d.variants.map((v) => (
          <figure
            key={v.title}
            className="overflow-hidden rounded-xl border border-[var(--line-2)] bg-white"
          >
            <figcaption className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
              <span className="ff-head text-base font-semibold text-[var(--ink)]">
                {v.title}
              </span>
              <span className="ff-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--cyan-ink)]">
                {v.tag}
              </span>
            </figcaption>
            <div className="px-4 py-4 sm:px-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={v.img}
                alt={`Чертёж стеклопластиковой трубы — ${v.title}`}
                className="mx-auto block h-auto w-full max-w-[640px]"
                loading="lazy"
              />
            </div>
            <p className="border-t border-[var(--line)] px-5 py-3 ff-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--muted)]">
              {v.quick}
            </p>
          </figure>
        ))}
      </div>

      {/* common spec */}
      <div className="mt-8">
        <div className="eyebrow mb-3">Общие характеристики</div>
        <SpecTable specs={d.common} />
      </div>

      {/* joint type */}
      <div className="mt-8">
        <div className="eyebrow mb-3">Соединение</div>
        <figure className="overflow-hidden rounded-xl border border-[var(--line-2)] bg-white">
          <figcaption className="border-b border-[var(--line)] px-5 py-3">
            <span className="ff-head text-base font-semibold text-[var(--ink)]">
              {d.joint.title}
            </span>
          </figcaption>
          <div className="px-4 py-4 sm:px-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.joint.img}
              alt={d.joint.title}
              className="mx-auto block h-auto w-full max-w-[460px]"
              loading="lazy"
            />
          </div>
          <p className="border-t border-[var(--line)] px-5 py-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            {d.joint.desc}
          </p>
        </figure>
      </div>
    </div>
  );
}

function FittingBody({ d }: { d: FittingDetails }) {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8">
      <p className="max-w-2xl text-[var(--ink-soft)]">{d.intro}</p>

      {/* original factory drawings, one per fitting */}
      <div className="mt-7 space-y-5">
        {d.items.map((it) => (
          <figure
            key={it.title}
            className="overflow-hidden rounded-xl border border-[var(--line-2)] bg-white"
          >
            <figcaption className="flex items-center justify-between border-b border-[var(--line)] px-5 py-3">
              <span className="ff-head text-base font-semibold text-[var(--ink)]">
                {it.title}
              </span>
              <span className="ff-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--cyan-ink)]">
                {it.tag}
              </span>
            </figcaption>
            <div className="px-4 py-4 sm:px-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.img}
                alt={`Чертёж фитинга — ${it.title}`}
                className="mx-auto block h-auto w-full max-w-[560px]"
                loading="lazy"
              />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

function TankBody({ d }: { d: TankDetails }) {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8">
      <p className="max-w-2xl text-[var(--ink-soft)]">{d.intro}</p>

      <figure className="mt-7 overflow-hidden rounded-xl border border-[var(--line-2)] bg-white">
        <div className="px-4 py-4 sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={d.img}
            alt="Чертёж композитной ёмкости"
            className="mx-auto block h-auto w-full max-w-[640px]"
            loading="lazy"
          />
        </div>
      </figure>

      <div className="mt-7">
        <SpecTable specs={d.specs} />
      </div>
    </div>
  );
}

function GridBody({ d }: { d: GridDetails }) {
  return (
    <div className="px-6 py-7 sm:px-8 sm:py-8">
      <p className="max-w-2xl text-[var(--ink-soft)]">{d.intro}</p>

      <figure className="mt-7 overflow-hidden rounded-xl border border-[var(--line-2)] bg-white">
        <div className="px-4 py-4 sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={d.img}
            alt="Чертёж композитного решётчатого настила"
            className="mx-auto block h-auto w-full max-w-[640px]"
            loading="lazy"
          />
        </div>
      </figure>

      <div className="mt-7">
        <SpecTable specs={d.specs} />
      </div>

      {/* certification / test protocol callout */}
      <div className="mt-7 rounded-xl border border-[var(--cyan-ink)]/30 bg-[color-mix(in_srgb,var(--cyan)_8%,transparent)] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
          <div>
            <div className="ff-head text-base font-semibold text-[var(--ink)]">
              {d.cert.title}
            </div>
            <ul className="mt-3 space-y-2">
              {d.cert.lines.map((l) => (
                <li key={l} className="flex gap-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--cyan-ink)]" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
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

  const d = product.details!;
  const wide =
    d.kind === "pipe" ||
    d.kind === "fitting" ||
    d.kind === "grid" ||
    d.kind === "tank";

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
        aria-label={`Технические параметры — ${product.title}`}
        className={`relative z-10 max-h-[92svh] w-full overflow-y-auto border border-[var(--line-2)] bg-[var(--paper)] sm:rounded-2xl ${
          wide ? "max-w-3xl" : "max-w-2xl"
        }`}
        initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper)]/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <div className="eyebrow">Технические параметры</div>
            <h3 className="mt-2 ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
              {product.title}
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

        {d.kind === "pole" ? (
          <PoleBody d={d} />
        ) : d.kind === "pipe" ? (
          <PipeBody d={d} />
        ) : d.kind === "fitting" ? (
          <FittingBody d={d} />
        ) : d.kind === "grid" ? (
          <GridBody d={d} />
        ) : (
          <TankBody d={d} />
        )}
      </motion.div>
    </motion.div>
  );
}

export function ProductRange() {
  const [active, setActive] = React.useState<Product | null>(null);

  return (
    <div id="products" className="mt-24 scroll-mt-24">
      <Reveal>
        <div className="flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
          <h3 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
            Линейка продукции
          </h3>
          <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            6 категорий
          </span>
        </div>
      </Reveal>

      <RevealStagger className="mt-px grid gap-px overflow-hidden border-x border-b border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const interactive = Boolean(p.details);
          return (
            <RevealItem key={p.n} className="bg-[var(--paper)]">
              {interactive ? (
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="group flex h-full w-full flex-col items-start p-7 text-left transition-colors hover:bg-[var(--paper-2)] focus-visible:bg-[var(--paper-2)]"
                  aria-haspopup="dialog"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="ff-mono text-xs text-[var(--cyan-ink)]">{p.n}</span>
                    <span className="grid size-7 place-items-center rounded-full border border-[var(--line-2)] text-[var(--cyan-ink)] transition-colors group-hover:border-[var(--cyan-ink)] group-hover:bg-[var(--cyan-ink)] group-hover:text-[var(--paper)]">
                      <Plus className="size-4" />
                    </span>
                  </div>
                  <h4 className="mt-5 ff-head text-lg font-semibold text-[var(--ink)]">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {p.spec}
                  </p>
                  <span className="mt-4 ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
                    Подробнее →
                  </span>
                </button>
              ) : (
                <div className="p-7">
                  <span className="ff-mono text-xs text-[var(--cyan-ink)]">{p.n}</span>
                  <h4 className="mt-5 ff-head text-lg font-semibold text-[var(--ink)]">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {p.spec}
                  </p>
                </div>
              )}
            </RevealItem>
          );
        })}
      </RevealStagger>

      <AnimatePresence>
        {active && <ProductModal product={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
