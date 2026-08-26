import sharp from "sharp";
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "fs";
import { join, extname, dirname, relative, parse } from "path";

const PUBLIC_DIR = "public/images";
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

function* walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

async function optimize(filePath) {
  const ext = extname(filePath).toLowerCase();
  const { name, dir } = parse(filePath);
  const webpPath = join(dir, `${name}.webp`);

  const stat = statSync(filePath);
  const sizeKB = stat.size / 1024;

  // Skip files already smaller than 50KB
  if (sizeKB < 50) {
    console.log(`SKIP  ${relative(PUBLIC_DIR, filePath)} (${sizeKB.toFixed(0)}KB)`);
    return;
  }

  const img = sharp(filePath);
  const metadata = await img.metadata();

  // Resize if wider than 2400px
  let pipeline = img;
  if (metadata.width > 2400) {
    pipeline = pipeline.resize(2400, undefined, { withoutEnlargement: true });
  }

  const quality = sizeKB > 1000 ? 75 : 80;

  await pipeline
    .webp({ quality, effort: 6 })
    .toFile(webpPath);

  const newSize = statSync(webpPath).size / 1024;
  const saved = ((1 - newSize / sizeKB) * 100).toFixed(0);
  console.log(
    `CONV  ${relative(PUBLIC_DIR, filePath)} (${sizeKB.toFixed(0)}KB → ${newSize.toFixed(0)}KB, -${saved}%)`
  );
}

async function main() {
  const files = [...walk(PUBLIC_DIR)];
  console.log(`Found ${files.length} images\n`);

  for (const file of files) {
    try {
      await optimize(file);
    } catch (err) {
      console.error(`FAIL  ${file}: ${err.message}`);
    }
  }

  console.log("\nDone!");
}

main();
