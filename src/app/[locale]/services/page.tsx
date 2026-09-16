import type { Metadata } from "next";
import { Img } from "@/components/img";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
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
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

export default function ServicesPage() {
  const t = useTranslations("Services");

  const services = [
    { n: "01", title: t("s1Title"), text: t("s1Text") },
    { n: "02", title: t("s2Title"), text: t("s2Text") },
    { n: "03", title: t("s3Title"), text: t("s3Text") },
    { n: "04", title: t("s4Title"), text: t("s4Text") },
    { n: "05", title: t("s5Title"), text: t("s5Text") },
    { n: "06", title: t("s6Title"), text: t("s6Text") },
    { n: "07", title: t("s7Title"), text: t("s7Text") },
    { n: "08", title: t("s8Title"), text: t("s8Text") },
  ];

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — engineering drawing photo greets the page */}
        <section className="relative h-[62svh] min-h-[400px] w-full overflow-hidden bg-[var(--ink)] sm:h-[74svh]">
          <Img
            src="/services-hero-v2.jpg"
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
              <SectionLabel index="05" title={t("sectionLabel")} />
              <p className="mt-6 max-w-xl text-[var(--muted)]">
                {t("sectionDesc")}
              </p>
            </Reveal>

            <RevealStagger className="mt-16 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s) => (
                <RevealItem
                  key={s.n}
                  className="bg-[var(--paper-2)] p-7 transition-colors hover:bg-[var(--paper)]"
                >
                  <div className="ff-mono text-xs text-[var(--cyan-ink)]">{s.n}</div>
                  <h3 className="mt-5 ff-head text-lg font-semibold leading-snug text-[var(--ink)]">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{s.text}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
