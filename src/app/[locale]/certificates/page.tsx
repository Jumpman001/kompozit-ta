import type { Metadata } from "next";
import Image from "next/image";
import { Download, ShieldCheck, ArrowUpRight } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "Certificates" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

/* Файлы одинаковы для всех языков, тексты — в messages/*.json (Certificates).
   Чтобы добавить сертификат: положите PDF и JPG-превью в public/certificates,
   добавьте запись сюда и ключи c3Title/c3Desc/... в три файла переводов. */
const CERTIFICATES = [
  { key: "c1", img: "/certificates/cert-iso.jpg", pdf: "/certificates/cert-iso.pdf" },
  { key: "c2", img: "/certificates/cert-lab.jpg", pdf: "/certificates/cert-lab.pdf" },
] as const;

/* Сертификаты соответствия на партии продукции.
   Срок у них короткий (полгода) — это норма: на каждую партию оформляется свой.
   Показываем как примеры практики, даты открыто указаны. */
const PRODUCT_CERTIFICATES = [
  { key: "p1", img: "/certificates/cert-pipes.jpg", pdf: "/certificates/cert-pipes.pdf" },
  { key: "p2", img: "/certificates/cert-grating.jpg", pdf: "/certificates/cert-grating.pdf" },
] as const;

export default function CertificatesPage() {
  const t = useTranslations("Certificates");

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — тёмная шапка без фото, как в контактах */}
        <section className="bg-[var(--ink)] pt-32 text-[var(--paper)] sm:pt-36">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--cyan)] sm:text-[0.72rem] sm:tracking-[0.24em]">
                {t("heroCaption")}
              </p>
              <h1 className="mt-4 max-w-3xl ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-6xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 max-w-2xl text-[var(--paper)]/70">{t("sectionDesc")}</p>
            </Reveal>
          </div>
        </section>

        {/* СПИСОК СЕРТИФИКАТОВ */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="08" title={t("sectionLabel")} />
            </Reveal>

            <div className="mt-12 space-y-6">
              {CERTIFICATES.map((c, i) => (
                <Reveal key={c.key} delay={i * 0.05}>
                  <article className="grid gap-8 rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)] p-6 sm:p-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
                    {/* превью документа */}
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-xl border border-[var(--line-2)] bg-white"
                    >
                      <Image
                        src={c.img}
                        alt={t(`${c.key}Alt`)}
                        width={1200}
                        height={1700}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-[var(--ink)]/80 py-3 ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)] opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                        {t("openPdf")}
                        <ArrowUpRight className="size-4" />
                      </span>
                    </a>

                    {/* описание */}
                    <div className="flex flex-col">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-1 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                        <h2 className="ff-head text-2xl font-bold leading-snug tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
                          {t(`${c.key}Title`)}
                        </h2>
                      </div>

                      <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">
                        {t(`${c.key}Desc`)}
                      </p>

                      <dl className="mt-7 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)]">
                        {[
                          [t("certNumber"), t(`${c.key}Number`)],
                          [t("standardLabel"), t(`${c.key}Standard`)],
                          [t("validUntil"), t(`${c.key}Valid`)],
                          [t("issuedBy"), t(`${c.key}Issuer`)],
                        ].map(([k, v]) => (
                          <div key={k} className="bg-[var(--paper)] px-4 py-3">
                            <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                              {k}
                            </dt>
                            <dd className="mt-1 text-sm font-medium leading-relaxed text-[var(--ink)]">
                              {v}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <a
                        href={c.pdf}
                        download
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      >
                        {t("download")}
                        <Download className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* примечание про лабораторию */}
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl border-l-2 border-[var(--cyan)] pl-5 leading-relaxed text-[var(--muted)]">
                {t("labNote")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* СЕРТИФИКАТЫ СООТВЕТСТВИЯ НА ПАРТИИ — отдельным блоком, чтобы не смешивать
            с системными сертификатами завода выше */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="—" title={t("productLabel")} />
              <h2 className="mt-6 max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                {t("productTitle")}
              </h2>
              <p className="mt-6 max-w-3xl leading-relaxed text-[var(--ink-soft)]">
                {t("productDesc")}
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {PRODUCT_CERTIFICATES.map((c, i) => (
                <Reveal key={c.key} delay={i * 0.05}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line-2)] bg-[var(--paper)]">
                    <a
                      href={c.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block aspect-[4/3] overflow-hidden border-b border-[var(--line-2)] bg-white"
                    >
                      <Image
                        src={c.img}
                        alt={t(`${c.key}Alt`)}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-[var(--ink)]/85 px-3 py-1.5 ff-mono text-[0.62rem] uppercase tracking-[0.1em] text-[var(--paper)] backdrop-blur">
                        {t("exampleBadge")}
                      </span>
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-[var(--ink)]/80 py-3 ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)] opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                        {t("openPdf")}
                        <ArrowUpRight className="size-4" />
                      </span>
                    </a>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                        <h3 className="ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)]">
                          {t(`${c.key}Title`)}
                        </h3>
                      </div>

                      <dl className="mt-6 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
                        <div className="bg-[var(--paper)] px-4 py-3 sm:col-span-2">
                          <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {t("productLine")}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-[var(--ink)]">
                            {t(`${c.key}Product`)}
                          </dd>
                        </div>
                        {[
                          [t("certNumber"), t(`${c.key}Number`)],
                          [t("validPeriod"), t(`${c.key}Period`)],
                        ].map(([k, v]) => (
                          <div key={k} className="bg-[var(--paper)] px-4 py-3">
                            <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                              {k}
                            </dt>
                            <dd className="mt-1 text-sm font-medium text-[var(--ink)]">{v}</dd>
                          </div>
                        ))}
                        <div className="bg-[var(--paper)] px-4 py-3 sm:col-span-2">
                          <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {t("standardLabel")}
                          </dt>
                          <dd className="mt-1 text-sm font-medium leading-relaxed text-[var(--ink)]">
                            {t(`${c.key}Standard`)}
                          </dd>
                        </div>
                        <div className="bg-[var(--paper)] px-4 py-3 sm:col-span-2">
                          <dt className="ff-mono text-[0.66rem] uppercase tracking-[0.1em] text-[var(--muted)]">
                            {t("issuedBy")}
                          </dt>
                          <dd className="mt-1 text-sm leading-relaxed text-[var(--ink)]">
                            {t("issuerShort")}
                          </dd>
                        </div>
                      </dl>

                      <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                        {t(`${c.key}Basis`)}
                      </p>

                      <a
                        href={c.pdf}
                        download
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
                      >
                        {t("download")}
                        <Download className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — запросить документы */}
        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <h2 className="max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {t("requestTitle")}
              </h2>
              <p className="mt-6 max-w-xl text-[var(--paper)]/70">{t("requestDesc")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper)]"
                >
                  {t("requestCta")}
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/documents"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--paper)]/40 px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--paper)]"
                >
                  {t("docsCta")}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
