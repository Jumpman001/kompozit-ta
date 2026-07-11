import Image from "next/image";
import { Download, FileText } from "lucide-react";
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero";
import { SiteHeader } from "@/components/site-header";
import { Reveal, RevealStagger, RevealItem, ImageReveal } from "@/components/reveal";
import { ProductRange } from "@/components/product-range";
import { ProjectsList } from "@/components/projects-list";
import { ProductionTech } from "@/components/production-tech";
import { NewsList } from "@/components/news-list";

const AERIAL = "/factory-aerial.jpg";

/* ----------------------------------------------------------------
   HERO
---------------------------------------------------------------- */
function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(72%_60%_at_50%_46%,color-mix(in_srgb,var(--paper)_82%,transparent),transparent_76%)]" />
      <p className="relative ff-mono text-[0.6rem] uppercase tracking-[0.18em] text-[var(--ink-soft)] sm:text-[0.72rem] sm:tracking-[0.28em]">
        Душанбе · Республика Таджикистан
      </p>
      <h1 className="relative mt-5 ff-head text-[clamp(2.15rem,8.2vw,7.4rem)] font-extrabold leading-[0.94] tracking-[-0.03em] text-[var(--ink)] sm:mt-6">
        Композитные
        <br />
        трубопроводы
      </h1>
      <p className="relative mt-6 max-w-xl text-[0.95rem] text-[var(--ink-soft)] sm:mt-7 sm:text-lg">
        Завод стеклопластиковых (ГРП) труб полного цикла диаметром от 400 до
        3000 мм. Коррозионная стойкость, малый вес и расчётный срок службы более
        50 лет.
      </p>
      <div className="pointer-events-auto relative mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#products"
          className="rounded-full bg-[var(--ink)] px-7 py-3.5 text-sm font-semibold text-[var(--paper)] transition-transform hover:-translate-y-0.5"
        >
          Изучить продукт
        </a>
        <a
          href="#contact"
          className="rounded-full border border-[var(--line-2)] bg-[var(--paper)]/60 px-7 py-3.5 text-sm font-semibold text-[var(--ink)] backdrop-blur transition-colors hover:border-[var(--ink)]"
        >
          Запросить расчёт
        </a>
      </div>
      <div className="absolute bottom-9 flex items-center gap-3 ff-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--muted)]">
        <span>Листайте</span>
        <span className="h-px w-10 bg-[var(--line-2)]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Section heading (numbered, editorial)
---------------------------------------------------------------- */
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="ff-mono text-sm text-[var(--cyan-ink)]">{index}</span>
      <span className="ff-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
        {title}
      </span>
    </div>
  );
}

/* ----------------------------------------------------------------
   Data
---------------------------------------------------------------- */
const stats = [
  { num: "50+", label: "лет срок службы" },
  { num: "3000", label: "мм макс. диаметр" },
  { num: "32", label: "атм давление" },
  { num: "12", label: "м длина плети" },
];

const milestones = [
  {
    date: "Сентябрь 2019",
    event:
      "Закладка первого камня завода при участии Президента Республики Таджикистан Эмомали Рахмона.",
  },
  {
    date: "28 августа 2021",
    event:
      "Торжественное открытие и запуск производства полного цикла на площади 4 гектара.",
  },
];

const advantages: { n: string; title: string; text: string; img?: string }[] = [
  { n: "01", title: "Не корродирует", text: "Полная стойкость к коррозии, агрессивным грунтам и блуждающим токам — без катодной защиты.", img: "/photos/corroded-metal.jpg" },
  { n: "02", title: "В четыре раза легче", text: "Малый вес снижает затраты на транспорт и монтаж. Укладка длинными плетями без тяжёлой техники.", img: "/pipe-lift.jpg" },
  { n: "03", title: "Гладкое сечение", text: "Низкая шероховатость: меньше гидропотери, выше пропускная способность, нет зарастания.", img: "/factory-pipe.jpg" },
];

const projectStats = [
  { num: "58 438", label: "м труб произведено" },
  { num: "15", label: "реализованных проектов" },
  { num: "DN 1800", label: "макс. диаметр на объекте" },
];

const services = [
  { n: "01", title: "Проектирование", text: "Проектная и рабочая документация трубопроводов и сооружений из стеклопластика." },
  { n: "02", title: "Инженерные расчёты", text: "Гидравлика и прочность: давление, кольцевая жёсткость, грунтовые и ветровые нагрузки." },
  { n: "03", title: "Обучение", text: "Подготовка персонала заказчика по монтажу, стыковке и эксплуатации ГРП-изделий." },
  { n: "04", title: "Строительный контроль", text: "Технический надзор за укладкой и монтажом, контроль соответствия проекту." },
  { n: "05", title: "Производство под заказ", text: "Трубы, фитинги и ёмкости по индивидуальным размерам и техническому заданию." },
  { n: "06", title: "Моделирование", text: "3D-модели узлов и трасс, визуализация и проверка компоновки до изготовления." },
  { n: "07", title: "Восстановление повреждённых сооружений", text: "Ремонт и санация трубопроводов и резервуаров композитными материалами." },
  { n: "08", title: "Шефмонтаж", text: "Авторский надзор и сопровождение монтажа силами специалистов завода." },
];

const materials = [
  {
    title: "Каталог продукции",
    text: "Полный каталог изделий КОМПОЗИТ Т.А.: трубы, фитинги, решётки, ёмкости и опоры.",
    href: "/materials/katalog-kompozit-ta.pdf",
    meta: "PDF · 24 стр.",
  },
  {
    title: "Реализованные проекты",
    text: "Презентация выполненных проектов: инвесторы, заказчики, объёмы и фотографии с объектов.",
    href: "/materials/proekty-kompozit-ta.pdf",
    meta: "PDF · презентация",
  },
];

/* Логотипы кладите в public/partners (PNG с прозрачным фоном или SVG)
   и указывайте путь в поле logo — карточка сама покажет картинку
   вместо текста. */
const partners: { name: string; logo?: string; url?: string }[] = [
  { name: "Правительство Республики Таджикистан", logo: "/partners/president.png", url: "https://www.president.tj/" },
  { name: "Авесто Групп", logo: "/partners/avesto.png", url: "https://avesto.tj/" },
  { name: "Таджик СГЭМ", logo: "/partners/tajiksgem.png", url: "https://tajiksgem.tj/" },
  { name: "ТГЭМ", logo: "/partners/tgem.png", url: "https://tgem.tj/" },
  { name: "Строй Центр", logo: "/partners/stroycenter.png", url: "https://stroycenter.tj/" },
  { name: "Net Solutions", logo: "/partners/nets.png", url: "https://nets.tj/" },
  { name: "ТАЛКО", logo: "/partners/talco.png", url: "https://talco.com.tj/ru" },
];

/* ----------------------------------------------------------------
   PAGE
---------------------------------------------------------------- */
export default function Home() {
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

        {/* ABOUT — company story */}
        <section id="about" className="scroll-mt-24 bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="01" title="О компании" />
            </Reveal>

            {/* Lead statement */}
            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <Reveal>
                <h2 className="ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                  Единственный завод{" "}
                  <span className="text-[var(--cyan-ink)]">композитных труб</span>{" "}
                  в Таджикистане
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-5 lg:pt-3">
                  <p className="text-lg leading-relaxed text-[var(--ink-soft)]">
                    «Композит&nbsp;Т.А.» — единственный производитель стеклопластиковых труб
                    и изделий в Республике Таджикистан. Продукция соответствует международным
                    стандартам и перед эксплуатацией проходит испытания на жёсткость и давление.
                  </p>
                  <p className="leading-relaxed text-[var(--muted)]">
                    Завод основан как совместное предприятие компании «Авесто&nbsp;Групп»
                    (Таджикистан) и азербайджанской «Азкомпозит». Производство построено
                    по технологии непрерывной спиральной намотки.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Founders + timeline */}
            <div className="mt-20 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              {/* founders card */}
              <Reveal>
                <div className="border border-[var(--line-2)] bg-[var(--paper-2)] p-8">
                  <div className="eyebrow">Учредители</div>
                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="ff-head text-xl font-semibold text-[var(--ink)]">
                        Авесто Групп
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        Республика Таджикистан
                      </div>
                    </div>
                    <div className="hairline" />
                    <div>
                      <div className="ff-head text-xl font-semibold text-[var(--ink)]">
                        Азкомпозит
                      </div>
                      <div className="mt-1 text-sm text-[var(--muted)]">
                        Азербайджанская Республика · технология намотки
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--line-2)] pt-6">
                    <div>
                      <div className="ff-head text-3xl font-bold text-[var(--ink)]">4 га</div>
                      <div className="mt-1 ff-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                        площадь завода
                      </div>
                    </div>
                    <div>
                      <div className="ff-head text-3xl font-bold text-[var(--ink)]">2021</div>
                      <div className="mt-1 ff-mono text-[0.66rem] uppercase tracking-[0.12em] text-[var(--muted)]">
                        год запуска
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* timeline */}
              <Reveal delay={0.1}>
                <div>
                  <div className="eyebrow">Хронология</div>
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

            {/* Product range */}
            <ProductRange />
          </div>
        </section>

        {/* ADVANTAGES */}
        <section className="bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="02" title="Почему стеклопластик" />
              <h2 className="mt-6 max-w-3xl ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                Материал, который<br className="hidden sm:block" /> переживёт металл
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
                      {/* фото-фон */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-55 transition-transform duration-700 ease-out group-hover:scale-105"
                        style={{ backgroundImage: `url(${a.img})` }}
                      />
                      {/* затемнение под цвет сайта — читаемость текста */}
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

        {/* PRODUCTION — full-bleed editorial image + caption */}
        <section id="production" className="scroll-mt-24 bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <SectionLabel index="03" title="Производство" />
                <h2 className="mt-6 ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
                  Трубы большого диаметра — с завода в Душанбе
                </h2>
                <p className="mt-6 max-w-md text-[var(--muted)]">
                  Производим трубопроводы диаметром от 400 до 3000 мм длинными
                  плетями: меньше стыков на трассе, быстрый монтаж и стабильное
                  качество каждой партии.
                </p>
                <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-[var(--line-2)] pt-6">
                  {[
                    ["DN", "400–3000 мм"],
                    ["Плеть", "до 12 м"],
                    ["Контроль", "100% партий"],
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

              <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--line-2)]">
                <Image
                  src="/pipes-product.jpg"
                  alt="Стеклопластиковые трубы КОМПОЗИТ Т.А. большого диаметра"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-[var(--ink)]/80 px-3 py-1 ff-mono text-[0.65rem] uppercase tracking-wide text-[var(--paper)] backdrop-blur">
                  Душанбе · производство
                </span>
              </ImageReveal>
            </div>

            {/* Production technologies — clickable cards */}
            <ProductionTech />
          </div>
        </section>

        {/* APPLICATIONS */}
        <section id="applications" className="scroll-mt-24 bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="04" title="Проекты" />
              <h2 className="mt-6 ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                Реализованные проекты
              </h2>
            </Reveal>

            {/* project stats */}
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

            {/* realized objects list */}
            <Reveal>
              <div className="mt-16 flex items-baseline justify-between border-b border-[var(--line-2)] pb-5">
                <h3 className="ff-head text-2xl font-bold tracking-[-0.02em] text-[var(--ink)] sm:text-3xl">
                  Объекты
                </h3>
                <span className="ff-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                  15 проектов
                </span>
              </div>
            </Reveal>

            <ProjectsList />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-24 bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="05" title="Услуги" />
              <h2 className="mt-6 max-w-3xl ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                Полный цикл — от расчёта до монтажа
              </h2>
              <p className="mt-5 max-w-xl text-[var(--muted)]">
                Инженерное сопровождение проектов на всех этапах: проектирование,
                производство, контроль качества и монтаж на объекте.
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

        {/* NEWS */}
        <section id="news" className="scroll-mt-24 bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-32">
            <Reveal>
              <SectionLabel index="06" title="Новости" />
              <h2 className="mt-6 ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                Новости и события
              </h2>
              <p className="mt-5 max-w-xl text-[var(--muted)]">
                Запуск проектов, производственные достижения и жизнь завода —
                с фотографиями и видео с объектов.
              </p>
            </Reveal>

            <NewsList />
          </div>
        </section>

        {/* MATERIALS */}
        <section id="materials" className="scroll-mt-24 bg-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-28">
            <Reveal>
              <SectionLabel index="07" title="Материалы" />
              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-end">
                <div>
                  <h2 className="ff-head text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl">
                    Материалы для скачивания
                  </h2>
                  <p className="mt-5 max-w-md text-[var(--muted)]">
                    Краткие документы для проектировщиков, подрядчиков и служб
                    снабжения: каталог, техническая спецификация и рекомендации
                    по монтажу.
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
                        Скачать
                        <Download className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PARTNERS */}
        <section id="partners" className="scroll-mt-24 bg-[var(--paper-2)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-28">
            <Reveal>
              <SectionLabel index="08" title="Сотрудничество" />
              <h2 className="mt-6 ff-head text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl">
                Наши партнёры
              </h2>
              <p className="mt-5 max-w-xl text-[var(--muted)]">
                С нами работают государственные институты, международные финансовые
                организации и ведущие компании Таджикистана.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {partners.map((p) => {
                  const inner = p.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-[88%] max-w-[230px] h-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-center ff-head text-sm font-semibold leading-tight text-[var(--muted)] transition-colors duration-300 group-hover:text-[var(--ink)]">
                      {p.name}
                    </span>
                  );
                  const cardClass =
                    "group grid aspect-[3/2] place-items-center rounded-2xl border border-[var(--line-2)] bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--cyan-ink)]/40 hover:shadow-[0_8px_30px_-12px_rgba(17,20,15,0.18)]";
                  return (
                    <li key={p.name}>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${p.name} — открыть сайт`}
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

        {/* CTA — inverted ink section */}
        <section id="contact" className="scroll-mt-24 bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-[var(--container)] px-5 py-24 sm:px-8 lg:py-36">
            <Reveal>
              <div className="flex items-baseline gap-4">
                <span className="ff-mono text-sm text-[var(--cyan)]">09</span>
                <span className="ff-mono text-xs uppercase tracking-[0.18em] text-[var(--paper)]/55">
                  Контакты
                </span>
              </div>
              <h2 className="mt-6 max-w-4xl ff-head text-4xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-7xl">
                Рассчитаем трубопровод <span className="text-[var(--cyan)]">под ваш объект</span>
              </h2>
              <p className="mt-7 max-w-xl text-[var(--paper)]/70">
                Пришлите параметры проекта — диаметр, давление, длину и среду. Подготовим
                техническое предложение и стоимость в течение двух рабочих дней.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                <a href="tel:+992900481177" className="group bg-[var(--ink)] p-7 transition-colors hover:bg-white/[0.04]">
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    Телефон
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold">(+992) 900 48 11 77</div>
                </a>
                <a href="mailto:info@composite.tj" className="group bg-[var(--ink)] p-7 transition-colors hover:bg-white/[0.04]">
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    Email
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold">info@composite.tj</div>
                </a>
                <div className="bg-[var(--ink)] p-7">
                  <div className="ff-mono text-[0.7rem] uppercase tracking-[0.12em] text-[var(--paper)]/50">
                    Адрес
                  </div>
                  <div className="mt-2 ff-head text-lg font-semibold">Душанбе, Таджикистан</div>
                </div>
              </div>
              <div className="mt-8 flex gap-6">
                <a href="#" className="ff-mono text-[0.8rem] uppercase tracking-[0.12em] text-[var(--cyan)] transition-colors hover:text-[var(--paper)]">Facebook</a>
                <a href="#" className="ff-mono text-[0.8rem] uppercase tracking-[0.12em] text-[var(--cyan)] transition-colors hover:text-[var(--paper)]">Instagram</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[var(--paper)]">
          <div className="mx-auto flex max-w-[var(--container)] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <img src="/logo.svg" alt="КОМПОЗИТ Т.А." className="h-[81px] w-auto" />
            <div className="flex flex-col gap-1 ff-mono text-xs text-[var(--muted)] sm:items-end">
              <span>© {new Date().getFullYear()} КОМПОЗИТ Т.А. · г. Душанбе</span>
              <span>ГОСТ Р 54560 · ISO 10639 · ISO 9001:2015</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
