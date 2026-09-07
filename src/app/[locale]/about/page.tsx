import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Leaf, ShieldCheck } from "lucide-react";
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
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("sectionLabel"),
    description: t("leadPara1"),
  };
}

/* Логотипы кладите в public/partners (PNG с прозрачным фоном или SVG)
   и указывайте путь в поле logo — карточка сама покажет картинку
   вместо текста. */
const partners: { key: "partner1" | "partner2" | "partner3" | "partner4" | "partner5" | "partner6" | "partner7"; logo?: string; url?: string }[] = [
  { key: "partner1", logo: "/partners/president.png", url: "https://www.president.tj/" },
  { key: "partner2", logo: "/partners/avesto.png", url: "https://avesto.tj/" },
  { key: "partner3", logo: "/partners/tajiksgem.png", url: "https://tajiksgem.tj/" },
  { key: "partner4", logo: "/partners/tgem.png", url: "https://tgem.tj/" },
  { key: "partner5", logo: "/partners/stroycenter.png", url: "https://stroycenter.tj/" },
  { key: "partner6", logo: "/partners/nets.png", url: "https://nets.tj/" },
  { key: "partner7", logo: "/partners/talco.png", url: "https://talco.com.tj/ru" },
];

export default function AboutPage() {
  const t = useTranslations("About");

  const milestones = [
    { date: t("milestone1Date"), event: t("milestone1Event") },
    { date: t("milestone2Date"), event: t("milestone2Event") },
  ];

  return (
    <>
      <SiteHeader dark />
      <main>
        {/* HERO — opening ceremony photo greets the page, like the aerial
            shot does on the homepage */}
        <section className="relative h-[62svh] min-h-[400px] w-full overflow-hidden bg-[var(--ink)] sm:h-[74svh]">
          <Image
            src="/opening-ceremony.jpg"
            alt={t("heroAlt")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
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

        {/* ABOUT — company story */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <SectionLabel index="01" title={t("sectionLabel")} />
            </Reveal>

            {/* Lead statement */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal>
                <h2 className="ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                  {t("leadTitle1")}{" "}
                  <span className="text-[var(--cyan-ink)]">{t("leadTitleHighlight")}</span>{" "}
                  {t("leadTitle2")}
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-5 lg:pt-3">
                  <p className="text-lg leading-relaxed text-[var(--ink-soft)]">
                    {t("leadPara1")}
                  </p>
                  <p className="leading-relaxed text-[var(--muted)]">
                    {t("leadPara2")}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Founders + timeline */}
            <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal>
                <div className="border border-[var(--line-2)] bg-[var(--paper-2)] p-8">
                  <div className="eyebrow">{t("foundersEyebrow")}</div>
                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="ff-head text-xl font-semibold text-[var(--ink)]">
                        {t("founder1Name")}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {t("founder1Location")}
                      </div>
                    </div>
                    <div className="hairline" />
                    <div>
                      <div className="ff-head text-xl font-semibold text-[var(--ink)]">
                        {t("founder2Name")}
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        {t("founder2Location")}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--line-2)] pt-6">
                    <div>
                      <div className="ff-head text-3xl font-bold text-[var(--ink)]">{t("statAreaValue")}</div>
                      <div className="mt-1 ff-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                        {t("statAreaLabel")}
                      </div>
                    </div>
                    <div>
                      <div className="ff-head text-3xl font-bold text-[var(--ink)]">{t("statYearValue")}</div>
                      <div className="mt-1 ff-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                        {t("statYearLabel")}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <div className="eyebrow">{t("timelineEyebrow")}</div>
                  <ol className="mt-7">
                    {milestones.map((m, i) => (
                      <li
                        key={m.date}
                        className={`relative border-l border-[var(--line-2)] pl-8 ${
                          i === milestones.length - 1 ? "pb-0" : "pb-10"
                        }`}
                      >
                        <span className="absolute -left-[5.5px] top-1.5 size-2.5 rounded-full bg-[var(--cyan)] ring-4 ring-[var(--paper)]" />
                        <div className="ff-mono text-sm text-[var(--cyan-ink)]">{m.date}</div>
                        <p className="mt-2 max-w-md leading-relaxed text-[var(--ink-soft)]">
                          {m.event}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* УСТОЙЧИВОЕ РАЗВИТИЕ — короткий блок со ссылкой на отдельную страницу */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 pb-16 sm:px-8 lg:pb-20">
            <Reveal>
              <div className="grid gap-8 rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)] p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
                <div>
                  <div className="flex items-center gap-3">
                    <Leaf className="size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                    <span className="eyebrow">{t("esgEyebrow")}</span>
                  </div>
                  <h2 className="mt-5 max-w-2xl ff-head text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                    {t("esgTitle")}
                  </h2>
                  <p className="mt-5 max-w-2xl leading-relaxed text-[var(--muted)]">
                    {t("esgDesc")}
                  </p>
                </div>
                <Link
                  href="/sustainability"
                  className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
                >
                  {t("esgCta")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* СЕРТИФИКАТЫ — короткий блок со ссылкой на отдельную страницу */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 pb-16 sm:px-8 lg:pb-24">
            <Reveal>
              <div className="grid gap-8 rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)] p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
                <div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-5 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                    <span className="eyebrow">{t("certsEyebrow")}</span>
                  </div>
                  <h2 className="mt-5 max-w-2xl ff-head text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-[var(--ink)] sm:text-4xl">
                    {t("certsTitle")}
                  </h2>
                  <p className="mt-5 max-w-2xl leading-relaxed text-[var(--muted)]">
                    {t("certsDesc")}
                  </p>
                </div>
                <Link
                  href="/certificates"
                  className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
                >
                  {t("certsCta")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-28">
            <Reveal>
              <SectionLabel index="02" title={t("partnersEyebrow")} />
              <h2 className="mt-6 ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                {t("partnersTitle")}
              </h2>
              <p className="mt-5 max-w-xl text-[var(--muted)]">
                {t("partnersDesc")}
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {partners.map((p) => {
                  const name = t(p.key);
                  const inner = p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={name}
                      className="w-[88%] max-w-[230px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-center ff-head text-sm font-semibold leading-tight text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                      {name}
                    </span>
                  );
                  const cardClass =
                    "group grid aspect-[3/2] place-items-center rounded-2xl border border-[var(--line-2)] bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--cyan-ink)]/40 hover:shadow-[0_8px_30px_-12px_rgba(17,20,15,0.18)]";
                  return (
                    <li key={p.key}>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("partnerLinkAria", { name })}
                          className={cardClass}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={cardClass}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
