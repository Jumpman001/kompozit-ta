"use client";

import * as React from "react";
import { Box, RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";

/* Труба целиком в 3D. Раньше здесь стояла модель с вырезанным сектором:
   у неё насовсем не хватало куска стенки, и с любой стороны труба
   выглядела разломанной. Теперь показываем целую трубу — полный круг.

   Модель pipe-segment.glb та же, что и в разделе стыка: браузер скачивает
   её один раз на оба блока. Тяжёлую библиотеку и саму модель грузим
   только когда блок доскроллили — страница продукции от этого не толстеет.
   Модель сжата Draco, распаковщик лежит у нас в /public/draco. */

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        poster?: string;
        "camera-controls"?: boolean | string;
        "auto-rotate"?: boolean | string;
        "rotation-per-second"?: string;
        "camera-orbit"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "field-of-view"?: string;
        "interaction-prompt"?: string;
        "shadow-intensity"?: string;
        "environment-image"?: string;
        exposure?: string;
        "touch-action"?: string;
        loading?: string;
        reveal?: string;
      };
    }
  }
}

export function PipeViewer() {
  const t = useTranslations("Products");
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [near, setNear] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  // подгружаем библиотеку, когда блок близко к экрану
  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    // Если блок уже в поле зрения, грузим сразу: IntersectionObserver
    // в некоторых браузерах молчит для элемента, который виден с самого
    // начала, и модель тогда не появляется никогда.
    const visible = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight + 400 && r.bottom > -400;
    };
    if (visible()) {
      setNear(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!near) return;
    let alive = true;
    (async () => {
      const mod = await import("@google/model-viewer");
      // Распаковщик Draco берём со своего сайта, а не с чужого CDN.
      // Библиотека читает путь из глобальной self.ModelViewerElement,
      // поэтому статического сеттера мало — кладём класс ещё и в window.
      const MV = (mod as unknown as {
        ModelViewerElement: { dracoDecoderLocation: string };
      }).ModelViewerElement;
      if (MV) {
        MV.dracoDecoderLocation = "/draco/";
        (window as unknown as { ModelViewerElement?: unknown }).ModelViewerElement = MV;
      }
      if (alive) setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, [near]);

  return (
    <div
      ref={boxRef}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--line-2)] bg-[var(--paper-2)] sm:aspect-[16/10]"
    >
      {ready ? (
        <model-viewer
          src="/models/pipe-segment.glb"
          alt={t("viewerAlt")}
          camera-controls
          auto-rotate
          rotation-per-second="14deg"
          camera-orbit="30deg 72deg auto"
          min-camera-orbit="auto auto auto"
          max-camera-orbit="auto auto auto"
          shadow-intensity="1"
          exposure="1.05"
          touch-action="pan-y"
          style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        />
      ) : (
        <div className="grid h-full place-items-center gap-3 text-[var(--muted)]">
          <Box className="size-6 animate-pulse" aria-hidden="true" />
          <span className="ff-mono text-[0.68rem] uppercase tracking-[0.12em]">
            {t("viewerLoading")}
          </span>
        </div>
      )}

      {ready && (
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--ink)]/70 px-3 py-1.5 ff-mono text-[0.58rem] uppercase tracking-[0.1em] text-[var(--paper)] backdrop-blur sm:bottom-4 sm:right-4 sm:px-4 sm:py-2 sm:text-[0.62rem]">
          <RotateCw className="size-3.5" aria-hidden="true" />
          {t("viewerHint")}
        </span>
      )}
    </div>
  );
}
