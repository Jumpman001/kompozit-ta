import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal } from "@/components/reveal";
import { ProjectsList } from "@/components/projects-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  const projectStats = [
    { num: t("stat1Value"), label: t("stat1Label") },
    { num: t("stat2Value"), label: t("stat2Label") },
    { num: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — pipe-laying trench photo greets the page */}
        <section className="relative h-[62svh] min-h-[400px] w-full overflow-hidden bg-[var(--ink)] sm:h-[74svh]">
          <Image
            src="/pipe-trench.jpg"
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
              <SectionLabel index="04" title={t("sectionLabel")} />
            </Reveal>

            <Reveal>
              <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
                {projectStats.map((s) => (
                  <div key={s.label} className="bg-[var(--paper)] px-6 py-8">
                    <div className="ff-head text-4xl font-bold tracking-tight text-[var(--ink)]">
                      {s.num}
                    </div>
                    <div className="mt-2 ff-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Шапка списка живёт внутри ProjectsList: счётчик должен
                меняться вместе с фильтром направлений. */}
            <ProjectsList />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
