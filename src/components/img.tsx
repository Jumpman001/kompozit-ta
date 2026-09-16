import * as React from "react";
import manifest from "@/generated/images.json";

/* Замена next/image для Cloudflare Workers.

   На Vercel картинки сжимал сам Next: `/_next/image?url=...&w=640`. На Workers
   такого сервиса нет — оттуда всегда приходил оригинал, и телефон качал
   версию для большого экрана.

   Здесь варианты готовит `scripts/gen-images.mjs` заранее, при сборке, а
   компонент отдаёт их браузеру через <picture>: сначала AVIF, потом WebP,
   в конце — исходный JPEG для старых браузеров. Браузер сам берёт первый
   формат, который понимает, и самый узкий размер, которого хватает экрану.

   <picture> стоит `display: contents` — он не создаёт своей коробки и на
   вёрстку не влияет. Все классы и позиционирование достаются <img>. */

type Entry = { w: number; h: number; avif: V[]; webp: V[] };
type V = { w: number; url: string };

const MANIFEST = manifest as Record<string, Entry>;

const srcset = (list: V[]) => list.map((v) => `${v.url} ${v.w}w`).join(", ");

export type ImgProps = {
  src: string;
  alt: string;
  /** растянуть по родителю — как `fill` у next/image. Родителю нужен `relative` */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
  /** был нужен next/image; варианты уже сжаты заранее, поэтому не используется */
  quality?: number;
  /** для картинки в первом экране: грузить сразу и в первую очередь */
  priority?: boolean;
  "aria-hidden"?: boolean | "true" | "false";
};

export function Img({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  style,
  priority,
  quality: _quality,
  ...rest
}: ImgProps) {
  const entry = MANIFEST[src];

  const imgStyle: React.CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style ?? {};

  const img = (
    <img
      src={src}
      alt={alt}
      className={className}
      style={imgStyle}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      sizes={sizes}
      width={fill ? undefined : width ?? entry?.w}
      height={fill ? undefined : height ?? entry?.h}
      {...rest}
    />
  );

  // нет заготовленных вариантов (svg, логотипы партнёров) — отдаём как есть
  if (!entry) return img;

  return (
    <picture style={{ display: "contents" }}>
      {entry.avif.length > 0 && (
        <source type="image/avif" srcSet={srcset(entry.avif)} sizes={sizes} />
      )}
      {entry.webp.length > 0 && (
        <source type="image/webp" srcSet={srcset(entry.webp)} sizes={sizes} />
      )}
      {img}
    </picture>
  );
}

export default Img;
