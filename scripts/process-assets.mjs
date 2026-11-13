import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const definitions = JSON.parse(await fs.readFile('docs/asset-definitions.json', 'utf8'));
await fs.mkdir('public/assets/images', { recursive: true });
const assets = [];
for (const def of definitions) {
  const original = path.join('.cache/press', def.originalFile);
  const meta = await sharp(original).metadata();
  const trimmed = def.trimTransparent
    ? await sharp(original).trim().toBuffer({ resolveWithObject: true })
    : null;
  const width = trimmed?.info.width ?? meta.autoOrient?.width ?? meta.width;
  const height = trimmed?.info.height ?? meta.autoOrient?.height ?? meta.height;
  const sizes = [
    ...new Set([480, 960, 1600, Math.min(width, 2000)].filter((w) => w <= width)),
  ].sort((a, b) => a - b);
  const variants = [];
  for (const size of sizes) {
    const file = def.id + (def.trimTransparent ? '-trim-' : '-') + size + '.webp';
    const result = await sharp(trimmed?.data ?? original)
      .rotate()
      .resize({ width: size, withoutEnlargement: true })
      .webp({ quality: 86, effort: 5 })
      .toFile('public/assets/images/' + file);
    variants.push({ width: result.width, height: result.height, file });
  }
  assets.push({
    ...def,
    filename: def.originalFile,
    width,
    height,
    ...(trimmed ? { originalWidth: meta.width, originalHeight: meta.height } : {}),
    variants,
    modifications:
      (def.trimTransparent ? 'Transparent padding trimmed; device pixels are not redrawn. ' : '') +
      'EXIF orientation, responsive resize and WebP compression. CSS crops may be used in editorial frames; no recoloring or hardware alteration.',
    webDisplayAllowed: null,
    attributionRequired: true,
  });
}
await fs.writeFile('src/data/media.json', JSON.stringify(assets, null, 2) + '\n');
console.log('Processed ' + assets.length + ' original press images.');
