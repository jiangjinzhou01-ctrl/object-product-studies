import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const defs = JSON.parse(await readFile('docs/asset-definitions.json', 'utf8'));
await mkdir('public/assets/images', { recursive: true });
const manifest = [];
for (const a of defs) {
  const file = `.cache/originals/${a.filename}`;
  const meta = await sharp(file).rotate().metadata();
  for (const width of [480, 960, 1600])
    await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(`public/assets/images/${a.id}-${width}.webp`);
  manifest.push({ ...a, width: meta.autoOrient.width, height: meta.autoOrient.height });
}
await writeFile('src/data/media.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Processed ${manifest.length} verified photographs into three WebP sizes.`);
