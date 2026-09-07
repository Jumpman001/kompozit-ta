import type { Metadata } from "next";
import { YandexMap } from "@/components/yandex-map";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("sectionLabel"), description: t("metaDescription") };
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <>
      <SiteHeader dark />
      <main>
        <section className="bg-[var(--ink)] pt-32 text-[var(--paper)] sm:pt-36">
          <div className="mx-auto max-w-[var(--container)] px-5 py-16 sm:px-8 lg:py-24">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="ff-mono text-sm text-[var(--cyan)]">07</span>
                <span className="ff-mono text-xs uppercase tracking-[0.18em] text-[var(--paper)]/55">
                  {t("sectionLabel")}
                </span>
              </div>
              <h1 className="mt-6 max-w-4xl ff-head text-4xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-7xl">
                {t("title1")} <span className="text-[var(--cyan)]">{t("title2")}</span>
              </h1>
              <p className="mt-7 max-w-xl text-[var(--paper)]/70">
                {t("desc")}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
                <a href="tel:+992900841177" className="group bg-[var(--ink)] p-7 transition-colors hover:bg-white/[0.04]">
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    {t("phoneLabel")}
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold">(+992) 900 84 11 77</div>
                </a>
                <a href="mailto:info@composite.tj" className="group bg-[var(--ink)] p-7 transition-colors hover:bg-white/[0.04]">
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    {t("emailLabel")}
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold [overflow-wrap:anywhere]">info@composite.tj</div>
                </a>
                <a
                  href="https://yandex.tj/maps/-/CTXYbQ5t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[var(--ink)] p-7 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    {t("addressLabel")}
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold">{t("address")}</div>
                </a>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6">
                <a href="#" className="inline-flex min-h-11 items-center ff-mono text-[0.8rem] uppercase tracking-[0.12em] text-[var(--cyan)] transition-colors hover:text-[var(--paper)]">Facebook</a>
                <a href="#" className="inline-flex min-h-11 items-center ff-mono text-[0.8rem] uppercase tracking-[0.12em] text-[var(--cyan)] transition-colors hover:text-[var(--paper)]">Instagram</a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <YandexMap />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
