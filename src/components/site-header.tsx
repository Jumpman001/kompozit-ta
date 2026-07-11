"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const NAV = [
  { href: "#about", label: "О компании", index: "01" },
  { href: "#products", label: "Продукция", index: "02" },
  { href: "#production", label: "Производство", index: "03" },
  { href: "#applications", label: "Проекты", index: "04" },
  { href: "#services", label: "Услуги", index: "05" },
  { href: "#news", label: "Новости", index: "06" },
  { href: "#contact", label: "Контакты", index: "09" },
];

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[var(--container)] items-center justify-between px-5 py-3 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            aria-label="КОМПОЗИТ Т.А. — на главную"
            className="justify-self-start shrink-0"
          >
            <img
              src="/logo.svg"
              alt="КОМПОЗИТ Т.А. — стеклопластиковые трубы"
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-7 md:flex lg:gap-9">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="link-underline text-[0.9rem] font-medium tracking-tight text-[var(--ink-soft)] hover:text-[var(--ink)]"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-3">
            <a
              href="#contact"
              className="hidden rounded-full bg-[var(--ink)] px-5 py-2.5 text-[0.9rem] font-semibold text-[var(--paper)] transition-transform hover:-translate-y-0.5 sm:inline-block"
            >
              Запросить КП
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] text-[var(--ink)] md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile editorial overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--paper)] px-6 pb-10 pt-5 md:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <img src="/logo.svg" alt="КОМПОЗИТ Т.А." className="h-[72px] w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line-2)] text-[var(--ink)]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-12 flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-[var(--line)] py-5"
                >
                  <span className="ff-head text-3xl font-bold tracking-tight text-[var(--ink)]">
                    {n.label}
                  </span>
                  <span className="ff-mono text-xs text-[var(--muted)]">{n.index}</span>
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-2 ff-mono text-sm text-[var(--muted)]">
              <a href="tel:+992446007080" className="block text-[var(--ink)]">
                +992 44 600-70-80
              </a>
              <a href="mailto:sales@kompozit-ta.tj" className="block">
                sales@kompozit-ta.tj
              </a>
              <p>г. Душанбе, Республика Таджикистан</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
