/* Готовит облегчённые копии всех фотографий из public/.
   Для каждой картинки делает варианты шириной 640, 1080 и 1920 в AVIF и WebP.
   Оригинал остаётся на месте — он запасной вариант для старых браузеров.
   Рядом пишется список вариантов, из которого компонент <Img> строит srcset.

   Зачем: на Cloudflare Workers нет оптимизатора картинок, как на Vercel.
   Без этого телефон качает версию для большого экрана. */
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const PUBLIC = "public";
const OUT = path.join(PUBLIC, "opt");
const WIDTHS = [640, 1080, 1920];
const SKIP_DIRS = new Set(["opt", "draco", "models", "materials", "certificates-src"]);
const EXT = /\.(jpe?g|png)$/i;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      out.push(...(await walk(path.join(dir, e.name))));
    } else if (EXT.test(e.name)) {
      out.push(path.join(dir, e.name));
    }
  }
  return out;
}

/** свежий ли готовый вариант: не пересобираем то, что не менялось */
async function fresh(src, dest) {
  try {
    const [a, b] = await Promise.all([stat(src), stat(dest)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

const files = await walk(PUBLIC);
const manifest = {};
let made = 0;
let skipped = 0;

for (const file of files) {
  const rel = "/" + path.relative(PUBLIC, file).split(path.sep).join("/");
  const img = sharp(file);
  const meta = await img.metadata();
  const entry = { w: meta.width, h: meta.height, avif: [], webp: [] };

  for (const w of WIDTHS) {
    // не растягиваем: вариант шире оригинала бессмыслен
    if (w > meta.width) continue;
    for (const fmt of ["avif", "webp"]) {
      const name = rel.replace(EXT, "") + `-${w}.${fmt}`;
      const dest = path.join(OUT, name);
      await mkdir(path.dirname(dest), { recursive: true });
      if (await fresh(file, dest)) {
        skipped++;
      } else {
        const p = sharp(file).resize({ width: w, withoutEnlargement: true });
        await (fmt === "avif"
          ? p.avif({ quality: 50, effort: 4 })
          : p.webp({ quality: 74 })
        ).toFile(dest);
        made++;
      }
      entry[fmt].push({ w, url: "/opt" + name });
    }
  }

  // оригинал уже меньше самого узкого варианта — вариантов нет, берём как есть
  if (!entry.avif.length && !entry.webp.length) continue;
  manifest[rel] = entry;
}

await mkdir("src/generated", { recursive: true });
await writeFile(
  "src/generated/images.json",
  JSON.stringify(manifest, null, 0) + "\n"
);

console.log(
  `картинок: ${Object.keys(manifest).length}, создано файлов: ${made}, пропущено (уже свежие): ${skipped}`
);
