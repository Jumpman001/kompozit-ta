/* Считает, сколько картинок реально скачает браузер с экраном шириной W.
   Разбирает srcset и sizes так же, как это делает браузер, и спрашивает у
   сервера размер каждого выбранного файла.
   Запуск: node scripts/measure-page.mjs <url> <ширина> */
const [url, widthArg] = process.argv.slice(2);
const W = Number(widthArg || 640);

const html = await fetch(url).then((r) => r.text());

/** "(min-width: 1024px) 33vw, 100vw" -> ширина в пикселях для экрана W */
function resolveSizes(sizes) {
  if (!sizes) return W;
  for (const part of sizes.split(",").map((s) => s.trim())) {
    const m = part.match(/^(\((.+?)\)\s+)?(.+)$/);
    const cond = m[2];
    const val = m[3].trim();
    let ok = true;
    if (cond) {
      const mn = cond.match(/min-width:\s*(\d+)px/);
      const mx = cond.match(/max-width:\s*(\d+)px/);
      if (mn && W < +mn[1]) ok = false;
      if (mx && W > +mx[1]) ok = false;
    }
    if (!ok) continue;
    const vw = val.match(/([\d.]+)vw/);
    if (vw) return (W * parseFloat(vw[1])) / 100;
    const px = val.match(/([\d.]+)px/);
    if (px) return parseFloat(px[1]);
  }
  return W;
}

/** из srcset выбираем самый узкий вариант, который не меньше нужной ширины */
function pick(srcset, need) {
  const cands = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/))
    .map(([u, d]) => ({ u, w: d && d.endsWith("w") ? parseInt(d) : null }))
    .filter((c) => c.u);
  if (!cands.length) return null;
  if (cands.some((c) => c.w === null)) return cands[0].u;
  const fit = cands.filter((c) => c.w >= need).sort((a, b) => a.w - b.w)[0];
  return (fit || cands.sort((a, b) => b.w - a.w)[0]).u;
}

const base = new URL(url).origin;
const chosen = [];

// <picture>: берём первый <source>, браузер выберет его, если формат поддержан
for (const pic of html.match(/<picture[\s\S]*?<\/picture>/g) || []) {
  const src = pic.match(/<source[^>]*>/);
  const img = pic.match(/<img[^>]*>/);
  const tag = src ? src[0] : img && img[0];
  if (!tag) continue;
  const ss = tag.match(/srcset="([^"]+)"/i)?.[1];
  const sz = tag.match(/sizes="([^"]+)"/i)?.[1];
  const need = resolveSizes(sz);
  const u = ss ? pick(ss, need) : img?.[0].match(/src="([^"]+)"/i)?.[1];
  if (u) chosen.push(u);
}

// одиночные <img> вне <picture>
// вырезаем блоки <picture> целиком, иначе их <img> посчитается второй раз
let rest = html;
for (const pic of html.match(/<picture[\s\S]*?<\/picture>/g) || []) {
  rest = rest.replace(pic, "");
}
for (const tag of rest.match(/<img[^>]*>/g) || []) {
  const ss = tag.match(/srcset="([^"]+)"/i)?.[1];
  const sz = tag.match(/sizes="([^"]+)"/i)?.[1];
  const src = tag.match(/src="([^"]+)"/i)?.[1];
  const u = ss ? pick(ss, resolveSizes(sz)) : src;
  if (u) chosen.push(u);
}

const uniq = [...new Set(chosen.map((u) => u.replace(/&amp;/g, "&")))];
let total = 0;
const rows = [];
for (const u of uniq) {
  const full = u.startsWith("http") ? u : base + u;
  const r = await fetch(full);
  const buf = await r.arrayBuffer();
  total += buf.byteLength;
  rows.push([decodeURIComponent(u).replace(/^.*\//, "").slice(0, 46), buf.byteLength]);
}

rows.sort((a, b) => b[1] - a[1]);
console.log(`экран ${W}px · ${url}`);
console.log(`картинок: ${rows.length}, вес: ${(total / 1024).toFixed(0)} КБ\n`);
for (const [f, b] of rows.slice(0, 12)) {
  console.log(`${(b / 1024).toFixed(0).padStart(7)} КБ  ${f}`);
}
