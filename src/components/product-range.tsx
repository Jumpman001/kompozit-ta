"use client";

import * as React from "react";
import { Img } from "@/components/img";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal, RevealStagger, RevealItem } from "./reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

type Spec = [string, string];

type PoleDetails = {
  kind: "pole";
  intro: string;
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
  photo?: string;
  details?: Details;
};

/* Переведённая часть (тексты) приходит из messages/*.json (Products.items,
   тот же порядок, что и здесь). Фото и SVG-чертежи — одни файлы для всех
   языков, поэтому остаются здесь как статика. */
type RawItem = {
  title: string;
  spec: string;
  intro?: string;
  common?: Spec[];
  specs?: Spec[];
  variants?: { title: string; tag: string; quick: string }[];
  items?: { title: string; tag: string }[];
  jointTitle?: string;
  jointDesc?: string;
  certTitle?: string;
  certLines?: string[];
};

function useProducts(): Product[] {
  const t = useTranslations("Products");
  const items = t.raw("items") as RawItem[];

  const [pipe, fitting, grid, hatch, pole, tank] = items;

  return [
    {
      n: "01",
      title: pipe.title,
      spec: pipe.spec,
      photo: "/product-pipes.jpg",
      details: {
        kind: "pipe",
        intro: pipe.intro!,
        common: pipe.common!,
        variants: [
          { ...pipe.variants![0], img: "/pipe-water.svg" },
          { ...pipe.variants![1], img: "/pipe-sewer.svg" },
        ],
        joint: { img: "/pipe-joint.svg", title: pipe.jointTitle!, desc: pipe.jointDesc! },
      },
    },
    {
      n: "02",
      title: fitting.title,
      spec: fitting.spec,
      photo: "/product-fittings-v2.jpg",
      details: {
        kind: "fitting",
        intro: fitting.intro!,
        items: [
          { ...fitting.items![0], img: "/fitting-cross.svg" },
          { ...fitting.items![1], img: "/fitting-elbow90.svg" },
          { ...fitting.items![2], img: "/fitting-reducer.svg" },
        ],
      },
    },
    {
      n: "03",
      title: grid.title,
      spec: grid.spec,
      photo: "/product-grid.jpg",
      details: {
        kind: "grid",
        intro: grid.intro!,
        img: "/grid-deck.svg",
        specs: grid.specs!,
        cert: { title: grid.certTitle!, lines: grid.certLines! },
      },
    },
    {
      n: "04",
      title: hatch.title,
      spec: hatch.spec,
      photo: "/product-hatch.jpg",
    },
    {
      n: "05",
      title: pole.title,
      spec: pole.spec,
      photo: "/product-pole-v2.jpg",
      details: {
        kind: "pole",
        intro: pole.intro!,
        specs: pole.specs!,
      },
    },
    {
      n: "06",
      title: tank.title,
      spec: tank.spec,
      photo: "/product-tank-v3.jpg",
      details: {
        kind: "tank",
        intro: tank.intro!,
        img: "/tank.svg",
        specs: tank.specs!,
      },
    },
  ];
}

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
  const t = useTranslations("Products");
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
                alt={v.title}
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
        <div className="eyebrow mb-3">{t("commonSpecsLabel")}</div>
        <SpecTable specs={d.common} />
      </div>

      {/* joint type */}
      <div className="mt-8">
        <div className="eyebrow mb-3">{t("jointSectionLabel")}</div>
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
                alt={it.title}
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
            alt=""
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
            alt=""
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
  const t = useTranslations("Products");
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
        aria-label={t("close")}
        onClick={onClose}
        className="absolute inset-0 bg-[var(--ink)]/55 backdrop-blur-sm"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${t("technicalParams")} — ${product.title}`}
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
            <div className="eyebrow">{t("technicalParams")}</div>
            <h3 className="mt-2 ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
              {product.title}
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
  const t = useTranslations("Products");
  const products = useProducts();
  const [active, setActive] = React.useState<Product | null>(null);

  return (
    <div id="products" className="mt-24 scroll-mt-24">
      <Reveal>
        <div className="flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
          <h3 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
            {t("rangeTitle")}
          </h3>
          <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
            {t("rangeCount")}
          </span>
        </div>
      </Reveal>

      <RevealStagger className="mt-px grid gap-px overflow-hidden border-x border-b border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const interactive = Boolean(p.details);
          const card = (
            <>
              {p.photo && (
                <Img
                  src={p.photo}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={`-z-10 object-cover transition-transform duration-700 ease-out ${
                    interactive ? "group-hover:scale-105" : ""
                  }`}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--ink)_35%,transparent)_0%,color-mix(in_srgb,var(--ink)_20%,transparent)_45%,color-mix(in_srgb,var(--ink)_88%,transparent)_100%)]"
              />
              <h4 className="ff-head text-lg font-semibold text-[var(--paper)] [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
                {p.title}
              </h4>
              <p className="mt-1.5 ff-mono text-[0.72rem] uppercase tracking-[0.1em] text-[var(--paper)]/80 [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
                {p.spec}
              </p>
            </>
          );
          return (
            <RevealItem key={p.n} className="bg-[var(--ink)]">
              {interactive ? (
                <button
                  type="button"
                  onClick={() => setActive(p)}
                  className="group relative isolate flex aspect-[4/3] w-full flex-col justify-end overflow-hidden p-7 text-left"
                  aria-haspopup="dialog"
                >
                  {card}
                </button>
              ) : (
                <div className="relative isolate flex aspect-[4/3] w-full flex-col justify-end overflow-hidden p-7">
                  {card}
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
