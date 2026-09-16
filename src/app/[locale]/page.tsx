import { Img } from "@/components/img";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionLabel } from "@/components/section-label";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";

const AERIAL = "/factory-aerial.jpg";

/* ----------------------------------------------------------------
   HERO
---------------------------------------------------------------- */
function HeroOverlay() {
  const t = useTranslations("Home");
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_46%,color-mix(in_srgb,var(--paper)_82%,transparent),transparent_76%)]" />
      <p className="relative ff-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--ink-soft)] sm:text-[0.72rem] sm:tracking-[0.28em]">
        {t("heroLocation")}
      </p>
      <h1 className="relative mt-5 ff-head text-[clamp(2.15rem,8.2vw,7.4rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-[var(--ink)] sm:mt-6">
        {t("heroTitleLine1")}
        <br />
        {t("heroTitleLine2")}
      </h1>
      <p className="relative mt-6 max-w-xl text-[0.95rem] text-[var(--ink-soft)] sm:mt-7 sm:text-lg">
        {t("heroDesc")}
      </p>
      <div className="pointer-events-auto relative mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/products"
          className="rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
        >
          {t("ctaExplore")}
        </Link>
        <Link
          href="/contact"
          className="liquid-glass backdrop-blur-xl backdrop-saturate-150 rounded-full px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          {t("ctaQuote")}
        </Link>
      </div>
      <div className="absolute bottom-9 flex items-center gap-3 ff-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)]">
        <span>{t("scrollHint")}</span>
        <span className="h-px w-10 bg-[var(--line-2)]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   PAGE
---------------------------------------------------------------- */
export default function Home() {
  const t = useTranslations("Home");
  const tc = useTranslations("Certificates");

  const stats = [
    { num: "50+", label: t("stat1Label") },
    { num: "3000", label: t("stat2Label") },
    { num: "32", label: t("stat3Label") },
    { num: "12", label: t("stat4Label") },
  ];

  const advantages: { n: string; title: string; text: string; img?: string }[] = [
    { n: "01", title: t("advantage1Title"), text: t("advantage1Text"), img: "/photos/corroded-metal.jpg" },
    { n: "02", title: t("advantage2Title"), text: t("advantage2Text"), img: "/pipe-lift.jpg" },
    { n: "03", title: t("advantage3Title"), text: t("advantage3Text"), img: "/factory-pipe.jpg" },
  ];

  const sections = [
    { n: "01", href: "/about", title: t("sectionAboutTitle"), img: "/opening-ceremony.jpg" },
    { n: "02", href: "/products", title: t("sectionProductsTitle"), img: "/pipes-yard.jpg" },
    { n: "03", href: "/production", title: t("sectionProductionTitle"), img: "/winding-shop.jpg" },
    { n: "04", href: "/projects", title: t("sectionProjectsTitle"), img: "/pipe-trench.jpg" },
    { n: "05", href: "/services", title: t("sectionServicesTitle"), img: "/services-hero-v2.jpg" },
    { n: "06", href: "/news", title: t("sectionNewsTitle"), img: "/news-hero-v2.jpg" },
  ];

  return (
    <>
      <SiteHeader />
      <main id="top">
        {/* HERO */}
        <section className="relative">
          <SmoothScrollHero
            scrollHeight={1900}
            desktopImage={AERIAL}
            mobileImage={AERIAL}
            initialClipPercentage={25}
            finalClipPercentage={75}
            imageAlt={t("heroImageAlt")}
          />
          <HeroOverlay />
        </section>

        {/* STATS */}
        <section className="border-y border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto grid max-w-[var(--container)] grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-6 py-10 sm:px-8 ${
                  i !== stats.length - 1 ? "lg:border-r border-[var(--line)]" : ""
                } ${i % 2 === 0 ? "border-r border-[var(--line)] lg:border-r" : ""} ${
                  i < 2 ? "border-b border-[var(--line)] lg:border-b-0" : ""
                }`}
              >
                <div className="ff-head text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
                  {s.num}
                </div>
                <div className="mt-2 ff-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="—" title={t("advantagesLabel")} />
              <h2 className="mt-6 max-w-3xl ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                {t("advantagesTitle")}
              </h2>
            </Reveal>

            <RevealStagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--ink)] bg-[var(--ink)] md:grid-cols-3">
              {advantages.map((a) => (
                <RevealItem
                  key={a.n}
                  className="group relative isolate overflow-hidden bg-[var(--ink)] p-8 sm:p-10"
                >
                  {a.img && (
                    <>
                      <Img
                        src={a.img}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="pointer-events-none -z-10 object-cover opacity-55 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--ink)_55%,transparent)_0%,color-mix(in_srgb,var(--ink)_88%,transparent)_100%)]"
                      />
                    </>
                  )}
                  <div className="ff-mono text-xs text-[var(--cyan)]">{a.n}</div>
                  <h3 className="mt-6 ff-head text-2xl font-semibold text-[var(--paper)]">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--paper)]/75">{a.text}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* SECTION TEASERS — links to the dedicated pages */}
        <section className="bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="—" title={t("sectionsLabel")} />
              <h2 className="mt-6 max-w-3xl ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                {t("sectionsTitle")}
              </h2>
            </Reveal>

            <RevealStagger className="mt-16 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s) => (
                <RevealItem key={s.href} className="bg-[var(--ink)]">
                  <Link
                    href={s.href}
                    className="group relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden p-7"
                  >
                    <Img
                      src={s.img}
                      alt=""
                      aria-hidden
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--ink)_35%,transparent)_0%,color-mix(in_srgb,var(--ink)_20%,transparent)_45%,color-mix(in_srgb,var(--ink)_88%,transparent)_100%)]"
                    />
                    <div className="flex items-center justify-end">
                      <ArrowUpRight className="size-4 text-[var(--paper)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--cyan)] [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.85))]" />
                    </div>
                    <h3 className="ff-head text-xl font-semibold leading-snug text-[var(--paper)] [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
                      {s.title}
                    </h3>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* ЗАВОД В ЦИФРАХ — то, по чему доноры оценивают поставщика */}
        <section className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-20 sm:px-8 lg:py-24">
            <Reveal>
              <p className="ff-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--cyan)]">
                {t("esgLabel")}
              </p>
              <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="max-w-xl ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] sm:text-5xl">
                    {t("esgTitle")}
                  </h2>
                  <p className="mt-5 max-w-xl leading-relaxed text-[var(--paper)]/70">
                    {t("esgDesc")}
                  </p>
                </div>
                <Link
                  href="/sustainability"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[var(--paper)]/40 px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--paper)]"
                >
                  {t("esgCta")}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <RevealStagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--paper)]/15 bg-[var(--paper)]/15 sm:grid-cols-2 lg:grid-cols-4">
              {(["1", "2", "3", "4"] as const).map((n) => (
                <RevealItem key={n} className="bg-[var(--ink)] px-6 py-8">
                  <div className="ff-head text-3xl font-bold tracking-[-0.02em] sm:text-4xl">
                    {t(`esgS${n}`)}
                  </div>
                  <div className="mt-3 ff-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.1em] text-[var(--paper)]/55">
                    {t(`esgS${n}L`)}
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* СЕРТИФИКАТЫ — отдельным блоком, чтобы не ломать сетку разделов */}
        <section className="border-t border-[var(--line)] bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-20">
              <Reveal>
                <SectionLabel index="—" title={t("certsLabel2")} />
                <h2 className="mt-6 max-w-xl ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
                  {t("certsTitle")}
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-[var(--muted)]">
                  {t("certsDesc")}
                </p>

                <ul className="mt-8 space-y-3">
                  {[t("certsBadge1"), t("certsBadge2"), t("certsBadge3")].map((badge) => (
                    <li key={badge} className="flex items-start gap-3 text-sm text-[var(--ink-soft)]">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--cyan-ink)]" aria-hidden="true" />
                      {badge}
                    </li>
                  ))}
                </ul>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/certificates"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--cyan)]"
                  >
                    {t("certsCta")}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/documents"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--ink)]"
                  >
                    {t("certsDocsCta")}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { src: "/certificates/cert-iso.jpg", alt: tc("c1Alt") },
                    { src: "/certificates/cert-lab.jpg", alt: tc("c2Alt") },
                  ].map((doc) => (
                    <Link
                      key={doc.src}
                      href="/certificates"
                      className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-[var(--line-2)] bg-white shadow-[0_10px_40px_-20px_rgba(17,20,15,0.35)]"
                    >
                      <Img
                        src={doc.src}
                        alt={doc.alt}
                        fill
                        sizes="(min-width: 1024px) 20vw, 45vw"
                        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA — inverted ink section */}
        <section className="bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-36">
            <Reveal>
              <h2 className="max-w-4xl ff-head text-4xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-7xl">
                {t("ctaTitle1")} <span className="text-[var(--cyan)]">{t("ctaTitle2")}</span>
              </h2>
              <p className="mt-7 max-w-xl text-[var(--paper)]/70">{t("ctaDesc")}</p>
              <Link
                href="/contact"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--cyan)] px-7 py-3.5 text-sm font-semibold text-[var(--ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper)]"
              >
                {t("ctaButton")}
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
