import { readFile, mkdir, writeFile } from 'node:fs/promises';
const assets = JSON.parse(await readFile('docs/asset-definitions.json', 'utf8'));
await mkdir('.cache/originals', { recursive: true });
for (const a of assets) {
  const response = await fetch(a.originalUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (OBJECT product study; licensed source reproduction)' },
  });
  if (!response.ok)
    throw new Error(
      `${a.id}: HTTP ${response.status}. Honor Retry-After ${response.headers.get('Retry-After') ?? 'unspecified'}; no automatic retries.`,
    );
  await writeFile(`.cache/originals/${a.filename}`, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${a.id} — ${a.license}`);
}
