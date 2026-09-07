import type { Metadata } from "next";
import { Download, FileText, ShieldCheck, ArrowUpRight, Info } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Documents" });
  return { title: t("heroTitle"), description: t("metaDescription") };
}

/* Файлы одни для всех языков. Размер и число страниц держим здесь —
   при замене PDF не забудьте обновить sizeMb и pages. */
const CATALOGUES = [
  { key: "d1", file: "/materials/katalog-kompozit-ta.pdf", pages: 19, sizeMb: "2,2", lang: "langRuEn" },
  { key: "d2", file: "/materials/proekty-kompozit-ta.pdf", pages: 22, sizeMb: "3,5", lang: "langRuEn" },
] as const;

const NORMS = [
  { key: "d3", file: "/materials/posobie-montazh-grp.pdf", pages: 52, sizeMb: "2,3", lang: "langRu", note: true },
] as const;

type Doc = (typeof CATALOGUES)[number] | (typeof NORMS)[number];

function DocCard({ doc, note }: { doc: Doc; note?: string }) {
  const t = useTranslations("Documents");
  return (
    <article className="flex h-full flex-col justify-between gap-6 bg-[var(--paper)] p-7">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
            <h3 className="ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)]">
              {t(`${doc.key}Title`)}
            </h3>
          </div>
        </div>
        <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t(`${doc.key}Desc`)}</p>

        {note && (
          <p className="mt-4 flex gap-2.5 border-l-2 border-[var(--cyan)] pl-4 text-sm leading-relaxed text-[var(--muted)]">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {note}
          </p>
        )}
      </div>

      <div>
        <p className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
          PDF · {t("pages", { count: doc.pages })} · {doc.sizeMb} MB · {t(doc.lang)}
        </p>
        <a
          href={doc.file}
          download
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          {t("download")}
          <Download className="size-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function DocumentsPage() {
  const t = useTranslations("Documents");

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

        {/* КАТАЛОГИ */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="—" title={t("catalogueLabel")} />
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
              {CATALOGUES.map((d, i) => (
                <Reveal key={d.key} delay={i * 0.05}>
                  <DocCard doc={d} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЕКТИРОВАНИЕ И МОНТАЖ */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="—" title={t("normsLabel")} />
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)]">
              {NORMS.map((d) => (
                <Reveal key={d.key}>
                  <DocCard doc={d} note={t("d3Note")} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* СЕРТИФИКАТЫ — ссылка в свой раздел */}
        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <SectionLabel index="—" title={t("certsLabel")} />
              <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)] p-7 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                  <div>
                    <h3 className="ff-head text-xl font-bold leading-snug text-[var(--ink)]">
                      {t("certsTitle")}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-[var(--ink-soft)]">
                      {t("certsDesc")}
                    </p>
                  </div>
                </div>
                <Link
                  href="/certificates"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                >
                  {t("certsCta")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <h2 className="max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {t("requestTitle")}
              </h2>
              <p className="mt-6 max-w-xl text-[var(--paper)]/70">{t("requestDesc")}</p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper)]"
              >
                {t("requestCta")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
