import type { Metadata } from "next";
import { PipeViewer } from "@/components/pipe-viewer";
import { JointViewer } from "@/components/joint-viewer";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight, Download, FileText, FolderOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { ProductRange } from "@/components/product-range";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

export default function ProductsPage() {
  const t = useTranslations("Products");

  const materials = [
    {
      title: t("m1Title"),
      text: t("m1Text"),
      href: "/materials/katalog-kompozit-ta.pdf",
      meta: t("m1Meta"),
    },
    {
      title: t("m2Title"),
      text: t("m2Text"),
      href: "/materials/proekty-kompozit-ta.pdf",
      meta: t("m2Meta"),
    },
  ];

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — pipe yard photo greets the page */}
        <section className="relative h-[62svh] min-h-[400px] w-full overflow-hidden bg-[var(--ink)] sm:h-[74svh]">
          <Image
            src="/pipes-yard.jpg"
            alt={t("heroAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--ink)_75%,transparent)_0%,transparent_32%,transparent_60%,color-mix(in_srgb,var(--ink)_88%,transparent)_100%)]"
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8 sm:pb-10">
            <div className="mx-auto max-w-[var(--container)]">
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--paper)] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)] sm:text-[0.72rem] sm:tracking-[0.24em]">
                {t("heroCaption")}
              </p>
              <h1 className="mt-3 max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--paper)] sm:text-5xl">
                {t("heroTitle")}
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="02" title={t("sectionLabel")} />
              <p className="mt-6 max-w-xl text-[var(--muted)]">
                {t("sectionDesc")}
              </p>
            </Reveal>

            <ProductRange />
          </div>
        </section>

        {/* КОНСТРУКЦИЯ ТРУБЫ — труба целиком в 3D. Модель и библиотека
            грузятся только когда до блока доскроллили, см. pipe-viewer.tsx */}
        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="—" title={t("viewerLabel")} />
              <h2 className="mt-6 max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                {t("viewerTitle")}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
              <Reveal>
                <PipeViewer />
              </Reveal>

              <Reveal delay={0.1}>
                <p className="leading-relaxed text-[var(--ink-soft)]">{t("viewerDesc")}</p>

                <ol className="mt-8 space-y-5">
                  {(["1", "2", "3", "4"] as const).map((n) => (
                    <li key={n} className="flex gap-4">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-[var(--line-2)] ff-mono text-[0.66rem] text-[var(--cyan-ink)]">
                        {n}
                      </span>
                      <span>
                        <span className="block ff-head text-base font-semibold text-[var(--ink)]">
                          {t(`viewerL${n}`)}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-[var(--muted)]">
                          {t(`viewerL${n}Desc`)}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </section>

        {/* СОЕДИНЕНИЕ ТРУБ — 3D-анимация стыка. Модель и библиотека
            грузятся только когда до блока доскроллили, см. joint-viewer.tsx */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="—" title={t("jointLabel")} />
              <h2 className="mt-6 max-w-3xl ff-head text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                {t("jointTitle")}
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:items-center lg:gap-14">
              <Reveal>
                <JointViewer />
              </Reveal>

              <Reveal delay={0.1}>
                <p className="ff-head text-xl font-bold leading-snug tracking-[-0.01em] text-[var(--ink)] sm:text-2xl">
                  {t("jointLead")}
                </p>
                <p className="mt-5 leading-relaxed text-[var(--ink-soft)]">{t("jointDesc")}</p>

              </Reveal>
            </div>
          </div>
        </section>

        {/* MATERIALS */}
        <section className="bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-28">
            <Reveal>
              <SectionLabel index="03" title={t("materialsSectionLabel")} />
              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-end">
                <div>
                  <h2 className="ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
                    {t("materialsTitle")}
                  </h2>
                  <p className="mt-5 max-w-md text-[var(--muted)]">
                    {t("materialsDesc")}
                  </p>
                </div>
                <div className="grid gap-3">
                  {materials.map((m) => (
                    <a
                      key={m.title}
                      href={m.href}
                      download
                      className="group grid gap-4 border border-[var(--line-2)] bg-[var(--paper)] p-5 transition-colors hover:border-[var(--cyan-ink)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
                    >
                      <span className="grid size-11 place-items-center rounded-full border border-[var(--line-2)] text-[var(--cyan-ink)]">
                        <FileText className="size-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block ff-head text-lg font-semibold text-[var(--ink)]">
                          {m.title}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-[var(--muted)]">
                          {m.text}
                        </span>
                        <span className="mt-2 block ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                          {m.meta}
                        </span>
                      </span>
                      <span className="inline-flex items-center gap-2 ff-mono text-xs uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
                        {t("downloadLabel")}
                        <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                      </span>
                    </a>
                  ))}

                  {/* вход в общий раздел документов — там ещё пособие и сертификаты */}
                  <Link
                    href="/documents"
                    className="group grid gap-4 rounded-none border border-[var(--ink)] bg-[var(--ink)] p-5 text-[var(--paper)] transition-colors duration-300 hover:bg-[var(--cyan)] hover:text-[var(--ink)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
                  >
                    <span className="grid size-11 place-items-center rounded-full border border-current">
                      <FolderOpen className="size-5" aria-hidden="true" />
                    </span>
                    <span className="block ff-head text-lg font-semibold">{t("allDocsCta")}</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
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
