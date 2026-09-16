"use client";

import dynamic from "next/dynamic";

/* three.js и model-viewer весят вместе около 1,2 МБ и работают только в
   браузере: им нужны canvas и WebGL. При обычном импорте Next кладёт их ещё и
   в серверную сборку, где они бесполезны. На Cloudflare Workers это критично —
   там жёсткий лимит на размер воркера.

   `ssr: false` разрешён только внутри клиентского компонента, поэтому обёртки
   живут в отдельном файле с "use client", а страница продукции импортирует их. */

export const PipeViewer = dynamic(
  () => import("./pipe-viewer").then((m) => m.PipeViewer),
  { ssr: false }
);

export const JointViewer = dynamic(
  () => import("./joint-viewer").then((m) => m.JointViewer),
  { ssr: false }
);
