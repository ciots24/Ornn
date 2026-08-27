#!/usr/bin/env node
/**
 * Convert screenshots and photos to WebP for the landing page.
 *
 *   node scripts/optimize-images.mjs <file-or-dir> [options]
 *
 *   --out <dir>       destination (default: public/proof)
 *   --max <px>        cap the longest edge (default: 1600, never upscales)
 *   --quality <1-100> WebP quality, ignored when --lossless is set (default: 82)
 *   --lossless        lossless WebP — use for flat-colour UI screenshots
 *   --name <slug>     output basename, single-file input only
 *
 * Pick the mode by what the image IS. Flat-colour captures (dashboards, chat
 * threads, spreadsheets) come out both smaller and pixel-perfect as lossless —
 * a spreadsheet screenshot measured 22KB as PNG, 41KB as lossy WebP, and 7KB
 * lossless. Photographs and textured artwork want lossy at 78–86.
 *
 * Images are served straight from /public — `next.config.ts` sets
 * `images.unoptimized` so Cloudflare needs no image-optimization binding.
 * That makes this script the only thing standing between a 3MB phone photo
 * and your visitors' mobile data, so run every new asset through it.
 *
 * It prints the width and height of each output: copy those into the
 * `width`/`height` fields in src/content/copy.ts so nothing shifts on load.
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { basename, extname, join, resolve } from "node:path";

// Resolved dynamically so a missing install explains itself rather than throwing
// ERR_MODULE_NOT_FOUND — sharp lives in the project, not next to this script.
let sharp;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  console.error(
    "sharp isn't available here.\n\n" +
      "Copy this script into your project as scripts/optimize-images.mjs, then:\n" +
      "  npm i -D sharp\n" +
      "and run it from the project root. Keep sharp a devDependency — it must not\n" +
      "ship to Cloudflare Workers.",
  );
  process.exit(1);
}

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"]);

function parseArgs(argv) {
  const [input, ...rest] = argv;
  const options = {
    out: "public/proof",
    max: 1600,
    quality: 82,
    name: null,
    lossless: false,
  };

  for (let i = 0; i < rest.length; ) {
    const key = rest[i]?.replace(/^--/, "");
    if (!(key in options)) throw new Error(`Unknown option: ${rest[i]}`);

    if (key === "lossless") {
      options.lossless = true;
      i += 1;
      continue;
    }

    const value = rest[i + 1];
    if (value === undefined) throw new Error(`Missing value for ${rest[i]}`);
    options[key] = key === "max" || key === "quality" ? Number(value) : value;
    i += 2;
  }

  if (!input) throw new Error("Pass a file or directory to convert.");
  return { input: resolve(input), options };
}

async function collectSources(inputPath) {
  const info = await stat(inputPath);
  if (info.isFile()) return [inputPath];

  const entries = await readdir(inputPath);
  return entries
    .filter((entry) => SOURCE_EXTENSIONS.has(extname(entry).toLowerCase()))
    .sort()
    .map((entry) => join(inputPath, entry));
}

async function convert(sourcePath, { out, max, quality, name, lossless }) {
  const slug = name ?? basename(sourcePath, extname(sourcePath));
  const destination = join(out, `${slug}.webp`);

  const buffer = await sharp(sourcePath)
    // `withoutEnlargement` keeps small screenshots at native size — upscaling
    // adds bytes and no detail.
    .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
    .webp(lossless ? { lossless: true, effort: 6 } : { quality, effort: 6 })
    .toBuffer();

  await writeFile(destination, buffer);

  const { width, height } = await sharp(buffer).metadata();
  const before = (await stat(sourcePath)).size;
  const saved = Math.round((1 - buffer.length / before) * 100);
  const delta = saved >= 0 ? `−${saved}%` : `+${-saved}%`;

  console.log(
    `${slug}.webp  ${width}×${height}  ` +
      `${(before / 1024).toFixed(0)}KB → ${(buffer.length / 1024).toFixed(0)}KB  (${delta})` +
      (lossless ? "  lossless" : ""),
  );

  if (saved < 0 && !lossless) {
    console.log(
      "  ↑ grew. Flat-colour UI screenshot? Retry with --lossless.",
    );
  }
}

try {
  const { input, options } = parseArgs(process.argv.slice(2));
  await mkdir(options.out, { recursive: true });

  const sources = await collectSources(input);
  if (sources.length === 0) throw new Error(`No images found in ${input}`);
  if (sources.length > 1 && options.name) {
    throw new Error("--name only works with a single input file.");
  }

  for (const source of sources) {
    await convert(source, options);
  }
} catch (error) {
  // A usage mistake should read as a sentence, not a stack trace.
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
