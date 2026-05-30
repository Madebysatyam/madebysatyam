/**
 * Build display-sized WebP variants from public/{about,notes,playground}/hero.webp.
 * Run: npm run heroes:variants
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PAGES = ["about", "notes", "playground"];
const WIDTHS = [1280, 1920, 3840];

for (const page of PAGES) {
  const source = path.join(ROOT, "public", page, "hero.webp");

  try {
    await stat(source);
  } catch {
    console.warn(`skip ${page}: missing ${source}`);
    continue;
  }

  for (const width of WIDTHS) {
    const target = path.join(ROOT, "public", page, `hero-${width}.webp`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 4 })
      .toFile(target);

    const { size } = await stat(target);
    console.log(`${page}/hero-${width}.webp  ${Math.round(size / 1024)} KB`);
  }
}

const publicDir = path.join(ROOT, "public");
for (const page of PAGES) {
  const dir = path.join(publicDir, page);
  const files = await readdir(dir);
  console.log(
    `\n${page}:`,
    files.filter((name) => name.startsWith("hero")).join(", ")
  );
}
