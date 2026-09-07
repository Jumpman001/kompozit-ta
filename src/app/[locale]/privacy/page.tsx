import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return { title: t("heroTitle"), description: t("metaDescription") };
}

export default function PrivacyPage() {
  const t = useTranslations("Privacy");

  return (
    <>
      <SiteHeader dark />
      <main>
        <section className="bg-[var(--ink)] pt-32 text-[var(--paper)] sm:pt-36">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--cyan)] sm:text-[0.72rem] sm:tracking-[0.24em]">
                {t("heroCaption")}
              </p>
              <h1 className="mt-4 max-w-3xl ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-5xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-6 ff-mono text-xs uppercase tracking-[0.12em] text-[var(--paper)]/60">
                {t("updated")}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl space-y-12">
              {(["s1", "s3", "s5", "s7", "s8"] as const).map((k, i) => (
                <Reveal key={k} delay={i * 0.03}>
                  <h2 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
                    {t(`${k}Title`)}
                  </h2>
                  <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t(`${k}Body`)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ЧТО СОБИРАЕМ — со списком полей формы */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
                  {t("s2Title")}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t("s2Body")}</p>
                <ul className="mt-5 space-y-2.5">
                  {(["s2i1", "s2i2", "s2i3", "s2i4"] as const).map((k) => (
                    <li key={k} className="flex gap-3 leading-relaxed text-[var(--ink-soft)]">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--cyan)]" aria-hidden="true" />
                      {t(k)}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-l-2 border-[var(--cyan)] pl-5 leading-relaxed text-[var(--muted)]">
                  {t("s2Note")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* КОМУ ПЕРЕДАЁТСЯ */}
        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-20">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
                  {t("s4Title")}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t("s4Body")}</p>
                <p className="mt-6 border-l-2 border-[var(--cyan)] pl-5 leading-relaxed text-[var(--muted)]">
                  {t("s4Note")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COOKIE */}
        <section className="border-t border-[var(--line)] bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <div className="max-w-2xl">
                <h2 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">
                  {t("s6Title")}
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--ink-soft)]">{t("s6Body")}</p>
              </div>
            </Reveal>

            <div className="mt-8 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
              {(["s6i1", "s6i2"] as const).map((k, i) => (
                <Reveal key={k} delay={i * 0.05}>
                  <div className="h-full bg-[var(--paper)] p-7">
                    <h3 className="ff-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--cyan-ink)]">
                      {t(`${k}Title`)}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{t(`${k}Body`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl border-l-2 border-[var(--cyan)] pl-5 leading-relaxed text-[var(--muted)]">
                {t("s6Note")}
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
