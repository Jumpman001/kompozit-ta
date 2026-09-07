import type { Metadata } from "next";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Sustainability" });
  return { title: t("heroTitle"), description: t("metaDescription") };
}

/* Три блока перенесены из тендерной презентации завода: ESG, экономика
   жизненного цикла и местное содержание. Английские подзаголовки оставлены
   намеренно — это термины, по которым ЕБРР, АБР и Всемирный банк оценивают
   поставщика. Солнечная станция — данные завода: 292 кВт, май 2026. */
type Block = {
  key: "esg" | "tco" | "local";
  items: string[];
  stats: string[];
  dark?: boolean;
};

const BLOCKS: Block[] = [
  { key: "esg", items: ["esg1", "esg2", "esg3", "esg4"], stats: ["1", "2", "3"], dark: true },
  { key: "tco", items: ["tco1", "tco2", "tco3"], stats: ["1", "2", "3"] },
  { key: "local", items: ["local1", "local2", "local3", "local4"], stats: ["1", "2", "3"] },
];

function StatRow({ blockKey, stats }: { blockKey: Block["key"]; stats: string[] }) {
  const t = useTranslations("Sustainability");
  return (
    <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
      {stats.map((n) => (
        <div key={n} className="bg-[var(--paper)] px-6 py-7">
          <dt className="ff-head text-3xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
            {t(`${blockKey}Stat${n}`)}
          </dt>
          <dd className="mt-2 ff-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.1em] text-[var(--muted)]">
            {t(`${blockKey}Stat${n}Label`)}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Points({ items }: { items: string[] }) {
  const t = useTranslations("Sustainability");
  return (
    <RevealStagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
      {items.map((k) => (
        <RevealItem key={k} className="h-full bg-[var(--paper)] p-7 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--cyan)]/15 text-[var(--cyan-ink)]">
              <Check className="size-3" aria-hidden="true" />
            </span>
            <div>
              <p className="ff-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
                {t(`${k}Tag`)}
              </p>
              <h3 className="mt-2 ff-head text-lg font-bold leading-snug text-[var(--ink)]">
                {t(`${k}Title`)}
              </h3>
              <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{t(`${k}Body`)}</p>
            </div>
          </div>
        </RevealItem>
      ))}
    </RevealStagger>
  );
}

export default function SustainabilityPage() {
  const t = useTranslations("Sustainability");

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO */}
        <section className="bg-[var(--ink)] pt-32 text-[var(--paper)] sm:pt-36">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--cyan)] sm:text-[0.72rem] sm:tracking-[0.24em]">
                {t("heroCaption")}
              </p>
              <h1 className="mt-4 max-w-3xl ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-[var(--paper)]/70">{t("heroDesc")}</p>
            </Reveal>
          </div>
        </section>

        {BLOCKS.map((b, i) => (
          <section
            key={b.key}
            className={`border-t border-[var(--line)] ${
              i % 2 === 0 ? "bg-[var(--paper)]" : "bg-[var(--paper-2)]"
            }`}
          >
            <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
              <Reveal>
                <SectionLabel index="—" title={t(`${b.key}Label`)} />
                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h2 className="max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                    {t(`${b.key}Title`)}
                  </h2>
                  <span className="rounded-full border border-[var(--line-2)] px-3 py-1 ff-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {t(`${b.key}Tag`)}
                  </span>
                </div>
              </Reveal>

              <StatRow blockKey={b.key} stats={b.stats} />
              <Points items={b.items} />
            </div>
          </section>
        ))}

        {/* ДОВЕРИЕ МФИ */}
        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--cyan)]">
                {t("mdbTag")} · {t("mdbLabel")}
              </p>
              <h2 className="mt-5 max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {t("mdbTitle")}
              </h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-[var(--paper)]/70">
                {t("mdbBody")}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper)]"
                >
                  {t("mdbCta")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/documents"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--paper)]/40 px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--paper)]"
                >
                  {t("mdbCta2")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ОТКУДА ЦИФРЫ — доноры это спрашивают первым делом */}
        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-14 sm:px-8">
            <Reveal>
              <div className="flex max-w-3xl gap-4 border-l-2 border-[var(--cyan)] pl-6">
                <Info className="mt-1 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                <div>
                  <h2 className="ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                    {t("noteTitle")}
                  </h2>
                  <p className="mt-3 leading-relaxed text-[var(--muted)]">{t("noteBody")}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
