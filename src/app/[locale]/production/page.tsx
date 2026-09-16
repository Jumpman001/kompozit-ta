import type { Metadata } from "next";
import { Img } from "@/components/img";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { ProductionTech } from "@/components/production-tech";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Production" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

export default function ProductionPage() {
  const t = useTranslations("Production");

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — winding-shop photo greets the page */}
        <section className="relative h-[62svh] min-h-[400px] w-full overflow-hidden bg-[var(--ink)] sm:h-[74svh]">
          <Img
            src="/winding-shop.jpg"
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

        <section className="bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="03" title={t("sectionLabel")} />
              <p className="mt-6 max-w-md text-[var(--muted)]">
                {t("sectionDesc")}
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--line-2)] pt-6 sm:max-w-lg">
                {[
                  [t("statDnLabel"), t("statDnValue")],
                  [t("statLengthLabel"), t("statLengthValue")],
                  [t("statControlLabel"), t("statControlValue")],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {k}
                    </dt>
                    <dd className="mt-1.5 ff-head text-base font-semibold text-[var(--ink)]">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <ProductionTech />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
